import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import '../../../assets/styles/rcSelect.css';
import { utils } from '@iceteachain/common';
import notifi from '../../elements/Notification';

import { PuConfirm } from '../../elements/PuConfirm';
import { toTEA } from '../../../utils';
import * as actions from '../../../store/actions/account';

const Wapper = styled.div`
  button:first-child {
    margin-right: 50px;
  }
  button:last-child {
    animation-duration: 30s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    /* background: linear-gradient(to right, #15b5dd 8%, #dddddd 18%, #15b5dd 33%); */
  }
  @keyframes placeHolderShimmer {
    0% {
      background-position: -30vw 0;
    }
    100% {
      background-position: 70vw 0;
    }
  }

  div > div > div > div {
    max-width: 600px;
  }
`;

const PUContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  padding-top: 10px;
  img {
    width: 100px;
    margin-bottom: 20px;
  }
  .row {
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .tableHeader {
    font-weight: bold;
    margin-right: 3px;
    margin-left: 15px;
    min-width: 80px;
    width: 20%;
  }
  .signerHeader {
    font-weight: bold;
    font-size: 15px;
    margin-right: 3px;
    min-width: 80px;
    width: 20%;
  }
  .tableContent {
    width: 80%;
    min-width: 350px;
  }
  .custom-select {
    width: 100%;
  }
`;
const H1 = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const H2 = styled.div`
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  padding-top: 20px;
`;

class SignTransaction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowSign: true,
      isLoading: false,
      signer: '',
      method: '',
      tx: '',
      callbackURL: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let { callbackURL, tx } = match.params;
    tx = JSON.parse(decodeURIComponent(tx)) || {};
    callbackURL = decodeURIComponent(callbackURL) || '';
    let method = 'transfer';
    if (tx.data.op === 0) {
      method = 'deploy';
    } else if (tx.data.op === 1) {
      method = 'call';
    }
    this.setState({ method, tx, callbackURL });
  }

  approveSignTransaction = () => {
    const { childKey, setNeedAuth } = this.props;
    const { tx, signer, callbackURL } = this.state;
    // console.log('signer', signer);
    const accountSelected = childKey.filter(el => {
      return signer === el.address;
    })[0];

    if (!accountSelected) {
      notifi.warn(`Please select signer`);
      return;
    }

    const { privateKey } = accountSelected || '';

    if (!privateKey) {
      setNeedAuth(true);
      // this.setState({ isShowSign: false });
    } else {
      this.setState({ isLoading: true });
      const txSigned = utils.signTransaction(tx, privateKey);
      console.log('txSigned', txSigned);
      notifi.info('Success');
      setTimeout(() => {
        window.location = callbackURL + encodeURIComponent(JSON.stringify(txSigned));
      }, 300);
    }
  };

  rejectSignTransaction = () => {
    // window.close();
    setTimeout(() => {
      window.history.back();
    }, 300);
  };

  selectOnChange = value => {
    const { privateKey, setNeedAuth } = this.props;
    if (!privateKey) setNeedAuth(true);
    this.setState({ signer: value });
  };

  render() {
    const { isShowSign, isLoading, method, tx } = this.state;
    const { childKey } = this.props;

    const Options = childKey.map(el => {
      return (
        <Option key={el.index} value={el.address} desc={el.address}>
          {el.address}
        </Option>
      );
    });

    return (
      <Wapper>
        {isShowSign && (
          <PuConfirm
            cancelText="Cancel"
            okText="Approve"
            confirm={this.approveSignTransaction}
            cancel={this.rejectSignTransaction}
            loading={isLoading}
          >
            <div>
              <H1>Signature Request</H1>
              <PUContents>
                <div className="row">
                  <p className="signerHeader">Signer</p>{' '}
                  <div className="tableContent">
                    <Select
                      className="custom-select"
                      optionFilterProp="desc"
                      onChange={this.selectOnChange}
                      animation="slide-up"
                      placeholder="Please select signer"
                    >
                      {Options}
                    </Select>
                  </div>
                </div>
                <H2>Transaction Info:</H2>
                <div className="row">
                  <p className="tableHeader">method</p> <p className="tableContent">{method}</p>
                </div>
                {tx.from && (
                  <div className="row">
                    <p className="tableHeader">from</p> <p className="tableContent">{tx.from}</p>
                  </div>
                )}
                {tx.to && (
                  <div className="row">
                    <p className="tableHeader">to</p> <p className="tableContent">{tx.to}</p>
                  </div>
                )}
                {tx.payer && (
                  <div className="row">
                    <p className="tableHeader">payer</p> <p className="tableContent">{tx.payer}</p>
                  </div>
                )}
                <div className="row">
                  <p className="tableHeader">value</p> <p className="tableContent">{toTEA(tx.value) || 0} TEA</p>
                </div>
                <div className="row">
                  <p className="tableHeader">fee</p> <p className="tableContent">{toTEA(tx.fee) || 0} TEA</p>
                </div>
              </PUContents>
            </div>
          </PuConfirm>
        )}
      </Wapper>
    );
  }
}
const mapStateToProps = state => {
  const { account } = state;
  return {
    address: account.address,
    privateKey: account.privateKey,
    childKey: account.childKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNeedAuth: data => {
      dispatch(actions.setNeedAuth(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignTransaction);
