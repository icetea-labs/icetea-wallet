import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ecc, codec } from 'icetea-common';

import { Wrapper, Error, MaxValue, FeeAva, Fee, Ava, ButtonWrapper } from './StyledSTOne';
import { Button } from '../../elements/Button';
import SelectUnlockType from '../Unlock/SelectUnlockType';
import STOInput from './STOInput';
import errorIc from '../../../assets/img/error-icon.png';
import * as actions from '../../../store/actions/account';
import tweb3 from '../../../service/tweb3';
import { toTEA } from '../../../utils/utils';

const itemsMenu = [
  {
    text: 'ITEA',
    selected: true,
  },
  {
    text: 'BTC',
    selected: false,
  },
  {
    text: 'ETH',
    selected: false,
  },
  {
    text: 'VNI',
    selected: false,
  },
];

const Item = styled.div`
  font-size: 16px;
  color: #212833;
  font-weight: bold;
`;
const Text = styled.div`
  font-size: 12px;
  color: #848e9c;
`;

class SendTransactionOne extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      asset: props.defaultAsset || props.assets[0] || {},
      to: '',
      amount: '',
      addressErr: '',
      memoErr: '',
      memo: props.memo,
      types: itemsMenu,
      availableBalance: '',
    };
  }

  componentWillMount = async () => {
    const { address } = this.props;
    const { balance } = await tweb3.getBalance(address);
    // console.log('I want to see BL:', balanceofVip);
    this.setState({
      availableBalance: toTEA(balance),
    });
  };

  _toChange = e => {
    this.setState({
      to: e,
      addressErr: '',
    });
    // console.log('toAdd Change CK', e);
  };

  _amountChange = e => {
    if (e !== '') {
      this.setState({
        amount: e,
        amountErr: '',
      });
    } else {
      this.setState({ amount: '' });
    }
    // console.log('amount Change CK', e);
  };

  _setMaxValue = () => {
    const { availableBalance } = this.state;
    this.setState({ amount: availableBalance });
  };

  _memoChange = e => {
    const { value } = e.currentTarget;
    this.setState({
      memo: value,
      memoErr: '',
    });
    // console.log('memo Change CK', value);
  };

  _submit = () => {
    const { props } = this;
    const { to, amount, availableBalance } = this.state;

    if (!to) {
      this.setState({ addressErr: 'To address should not be null' });
      return;
    }

    try {
      ecc.validateAddress(to);
    } catch {
      this.setState({ addressErr: 'Invalid address! Please Try Again' });
      return;
    }

    if (codec.isRegularAddress(to)) {
      this.setState({ addressErr: 'Cannot transfer to regular account.' });
      return;
    }

    if (!amount) {
      this.setState({ amountErr: 'Amount should not be null' });
      return;
    }

    if (amount > availableBalance) {
      this.setState({ amountErr: 'Amount should smaller than balance' });
      return;
    }

    this.setState(
      {
        amountErr: '',
        addressErr: '',
        memoErr: '',
      },
      () => {
        props.next && props.next(this.state);
      }
    );

    // console.log('sendT1 props CK', this.props)
  };

  _genAssetsOptions = () => {
    const { props } = this;
    return props.assets.map(e => {
      return {
        value: e.asset,
        text: e.name,
        render: () => {
          return (
            <React.Fragment>
              <Item>{e.displayName}</Item>
              <Text>{e.name}</Text>
            </React.Fragment>
          );
        },
      };
    });
  };

  _getSelectTypes = () => {
    const { types } = this.state;
    const items = [];
    return (
      types.forEach(el => {
        el.hide || items.push({ text: el.text, value: el.text });
      }),
      items
    );
  };

  _assetChange = e => {
    const { props } = this;
    const asset = props.assets.find(item => {
      return item.asset === e;
    });
    this.setState({ asset });
  };

  render() {
    const { to, amount, asset, memo, amountErr, addressErr, memoErr, availableBalance } = this.state;
    const genAsset = this._genAssetsOptions();
    const u =
      genAsset.find(e => {
        return e.value === asset.asset;
      }) || {};

    // console.log('Render amount CK', amount);

    return (
      <div>
        <Wrapper
          style={{
            borderBottom: 'none',
            marginTop: '20px',
            paddingBottom: '0',
          }}
        >
          <p className="title">Select Asset</p>

          <SelectUnlockType
            defaultValue={u.render && u.render()}
            options={this._getSelectTypes()}
            width="100%"
            onChange={this._assetChange}
            withSearchBox
          />
        </Wrapper>
        <Wrapper>
          <STOInput title="To Address" defaultValue={to} onChange={this._toChange} autoFocus />
          {addressErr && (
            <Error>
              <img src={errorIc} alt="" />
              <span>{addressErr}</span>
            </Error>
          )}
        </Wrapper>
        <Wrapper>
          <STOInput
            title="Amount to send"
            defaultValue={amount}
            type="number"
            onChange={this._amountChange}
            onFocus={this._amountChange}
          />
          <MaxValue onClick={this._setMaxValue}>Max</MaxValue>
          {amountErr && (
            <Error>
              <img src={errorIc} alt="" />
              <span>{amountErr}</span>
            </Error>
          )}
        </Wrapper>
        <Wrapper style={{ borderBottom: 'none' }}>
          <p className="title">Memo</p>
          <textarea className="textarea" value={memo} onChange={this._memoChange} />
          {memoErr && (
            <Error>
              <img src={errorIc} alt="" />
              <span>{memoErr}</span>
            </Error>
          )}
        </Wrapper>
        <Wrapper style={{ border: 'none', marginTop: '20px' }}>
          <FeeAva>
            <Fee>
              <span className="fee-title">Fee:</span>
              <span className="fee-value">0.1 </span>
              <span>ITEA</span>
            </Fee>
            <Ava>
              <span className="Available-title">Available:</span>
              <span className="Available-value">{availableBalance}</span>
            </Ava>
          </FeeAva>
        </Wrapper>
        <ButtonWrapper style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button onClick={this._submit}>
            <span>Next</span>
          </Button>
        </ButtonWrapper>
      </div>
    );
  }
}

SendTransactionOne.defaultProps = {
  assets: [],
  to: '',
  amount: '',
  memo: '',
  defaultAsset: {},
  next() {},
};

const mapStateToProps = state => {
  const { account } = state;
  return {
    userInfo: account.userInfo,
    privateKey: account.privateKey,
    address: account.address,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAccount: data => {
      dispatch(actions.setAccount(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SendTransactionOne));
