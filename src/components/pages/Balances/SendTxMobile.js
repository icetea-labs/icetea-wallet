import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ecc } from '@iceteachain/common';
import tweb3 from '../../../service/tweb3';
import { toTEA, toUNIT } from '../../../utils';

import Layout from '../../layout';
import STOInput from './STOInput';
import { DivSelectWordBase } from '../../elements/utils';
import { Button } from '../../elements';
import notifi from '../../elements/Notification';
import PuSendTxMobiTwo from './PuSendTxMobiTwo';
import { zIndex } from '../../../constants/styles';

const Wrapper = styled.div`
  background: #000;
  position: relative;
  border-color: #15b5dd;
  padding-top: 45px;
`;

const Title = styled.div`
  display: flex;
  background: #12161c;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
`;

const SendTxOne = styled.div`
  padding: 30px 15px;
  background: #12161c;
`;

const InputWrapper = styled.div`
  width: 450px;
  margin-top: 30px;
  position: relative;
  .title {
    color: #848e9c;
    font-size: 14px;
    line-height: 30px;
  }
  input {
    width: 90%;
    height: 30px;
    outline: none;
    font-size: 16px;
    font-family: 'DIN';
    color: rgb(255, 255, 255);
  }
  #spin {
    opacity: 0;
  }
  input::-webkit-inner-spin-button {
    opacity: 0;
  }
  .textarea {
    width: 100%;
    outline: none;
    height: 50px;
    border: 1px solid #dfe2e7;
    font-size: 14px;
  }
  .amount-input {
    padding-right: 150px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputBox = styled(InputWrapper)`
  width: 100%;
  margin-top: 0;
  padding: 20px 0;
  font-size: 16px;
  .textarea {
    background: inherit;
    height: 80px;
    border-color: #212833;
    color: #fff;
  }
  .border-bottom {
    background: #212833;
  }
  .fee {
    font-size: 14px;
    color: #848e9c;
    line-height: 18px;
    margin: 10px 0;
    span {
      color: #fff;
      margin-left: 8px;
    }
  }
`;

const MaxValue = styled.div`
  position: absolute;
  right: 20px;
  bottom: 30px;
  color: #15b5dd;
`;

const SendTxTwoWrapper = styled.div`
  width: 100%;
  color: #fff;
  .header {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .title {
    .name {
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      margin-right: 10px;
    }
    .fullName {
      font-size: 13px;
      color: #848e9c;
    }
  }
  .row {
    display: flex;
    border: none;
    font-size: 14px;
    padding-bottom: 0;
    margin-top: 5px;
    .title {
      width: 50px;
      color: #848e9c;
      margin-right: 20px;
      line-height: 33px;
    }
    .value {
      color: #fff;
      line-height: 30px;
      width: 250px;
      word-break: break-all;
    }
  }
  .span {
    font-family: 'DIN';
  }
`;

const TabFixed = styled.div`
  margin-top: 10px;
  font-size: 16px;
  background: #12161c;
  padding: 0 12px;
  z-index: ${zIndex.modal};
  min-width: 320px;
  position: relative;
  border-bottom: 1px solid #000;
  height: 35px;
  line-height: 35px;
  display: none;
  .tab {
    color: #fff;
    width: 50px;
    text-align: left;
    transition: all 0.2s ease-in;
    margin-right: 30px;
    user-select: none;
  }
  .tab.on {
    color: #15b5dd;
    font-weight: 600;
  }
  .tab-scrollbar {
    position: absolute;
    bottom: 1px;
    left: 10px;
    background: #15b5dd;
    height: 2px;
    width: 50px;
    transition: all 200ms ease-in-out;
  }
  .tab:nth-of-type(1).on ~ .tab-scrollbar {
    transform: translate3d(0, 0, 0);
  }
  .tab:nth-of-type(2).on ~ .tab-scrollbar {
    transform: translate3d(75px, 0, 0);
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

class SendTxMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      amount: '',
      memo: '',
      isSending: false,
      showSend: false,
      availableBalance: '',
    };
  }

  componentWillMount = async () => {
    const { props } = this;
    let balanceofVip = '';
    balanceofVip = await tweb3.getBalance(props.address);
    this.setState({
      availableBalance: toTEA(balanceofVip.balance),
    });
  };

  _toChange = e => {
    this.setState({
      to: e,
    });
  };

  _setMaxValue = () => {
    const { state } = this;
    const t = state.availableBalance;
    this.setState({
      amount: t,
    });
  };

  _amountChange = e => {
    // const { props } = this;
    if (e !== '') {
      e = parseFloat(e);
      // const a = props.transferFee;
      // e -= a;
      this.setState({
        amount: e,
      });
    } else {
      this.setState({
        amount: '',
      });
    }
  };

  _memoChange = e => {
    const memo = e.currentTarget.value;
    this.setState({ memo });
  };

  _showSend = () => {
    const { to, amount, availableBalance } = this.state;
    if (!to) {
      notifi.warn('To address should not be null');
      return;
    }

    try {
      ecc.validateAddress(to);
    } catch {
      notifi.warn('invalid address');
      return;
    }

    if (!amount) {
      notifi.warn('transfer amount should not be null');
      return;
    }

    if (parseFloat(amount, 10) > parseFloat(availableBalance, 10)) {
      notifi.warn('Amount should be less than the max value');
      return;
    }

    this.setState({ showSend: true });
  };

  _hide = () => {
    this.setState({
      showSend: false,
    });
  };

  _transfer = async () => {
    const { amount, to } = this.state;
    const { privateKey } = this.props;

    tweb3.wallet.importAccount(privateKey);
    // console.log('privateKey', privateKey);
    // const balanceofVip = await tweb3.getBalance(address);
    // console.log('CK login balance:', balanceofVip);
    const amountToUnit = toUNIT(parseFloat(amount));
    // console.log('CK amount:', amountToUnit);
    await tweb3.transfer(to, amountToUnit);
    notifi.info('Send successful!');

    // this.props.onSendSuccess();
    this._hide();
  };

  render() {
    const { address, transferFee } = this.props;
    const { to, amount, isSending, showSend, memo, availableBalance } = this.state;

    return (
      <Layout>
        <React.Fragment>
          <Wrapper>
            <Title>
              <div>TEA</div>
            </Title>
            <SendTxOne>
              <InputBox>
                <STOInput title="To Address" defaultValue={to} onChange={this._toChange} autoFocus />
              </InputBox>
              <InputBox>
                <STOInput
                  title="Amount to send"
                  defaultValue={amount}
                  type="number"
                  onChange={this._amountChange}
                  onFocus={this._amountChange}
                />
                <MaxValue onClick={this._setMaxValue}>Max</MaxValue>
              </InputBox>
              <InputBox style={{ borderBottom: 'none' }}>
                <p className="title">Memo</p>
                <textarea className="textarea" onChange={this._memoChange} />
                <DivSelectWordBase align="center" justify="space-between">
                  <p className="fee">
                    Gas Limit
                    <span>{`${transferFee} TEA`}</span>
                  </p>
                  <p className="fee">
                    Available
                    <span>{` ${availableBalance}`}</span>
                  </p>
                </DivSelectWordBase>
                <Button onClick={this._showSend} loading={isSending} width="100%">
                  <span>Next</span>
                </Button>
              </InputBox>
            </SendTxOne>
            {showSend && (
              <PuSendTxMobiTwo okText="Confirm" cancelText="Cancel" confirm={this._transfer} cancel={this._hide}>
                <SendTxTwoWrapper>
                  <div className="header">Confirm Transaction</div>
                  <div className="title">
                    <span className="name">TEA</span>
                    <span className="fullName">Icetea Native Token</span>
                  </div>
                  <div className="row">
                    <div className="title">To:</div>
                    <div className="value">{to}</div>
                  </div>
                  <div className="row">
                    <div className="title">From:</div>
                    <div className="value">{address}</div>
                  </div>
                  <div className="row">
                    <div className="title">Amount:</div>
                    <div className="value">
                      <span>{amount}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="title">Memo:</div>
                    <div className="value">{memo}</div>
                  </div>
                  <div className="row">
                    <div className="title">Gas Limit:</div>
                    <div className="value">
                      <span>{`${transferFee}  TEA`}</span>
                    </div>
                  </div>
                </SendTxTwoWrapper>
              </PuSendTxMobiTwo>
            )}
            <TabFixed />
          </Wrapper>
        </React.Fragment>
      </Layout>
    );
  }
}

SendTxMobile.defaultProps = {
  balance: {},
  history: {},
  send() {},
  address: '',
  privateKey: '',
  tokens: [],
  balances: [],
  transferFee: 0.1,
};

const mapStateToProps = state => {
  const { account } = state;
  return {
    userInfo: account.userInfo,
    privateKey: account.privateKey,
    address: account.address,
  };
};
export default connect(
  mapStateToProps,
  null
)(SendTxMobile);
