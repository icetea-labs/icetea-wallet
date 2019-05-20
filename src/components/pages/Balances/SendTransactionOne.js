import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Wrapper, Error, MaxValue, FeeAva, Fee, Ava, ButtonWrapper } from './StyledSTOne';
import { FontDin } from '../../elements/utils';
import { Button } from '../../elements/Button';
import SelectUnlockType from '../Unlock/SelectUnlockType';
import STOInput from './STOInput';
import errorIc from '../../../assets/img/error-icon.png';
import * as actions from '../../../store/actions/account';
import tweb3 from '../../../service/tweb3';
import { toTEA } from '../../../utils/utils';
import { ecc, codec, bech32 } from 'icetea-common';

const itemsMenu = [
  {
    text: 'ITEA',
    selected: true
  },
  {
    text: 'BTC',
    selected: false
  },
  {
    text: 'ETH',
    selected: false
  },
  {
    text: 'VNI',
    selected: false
  }
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
      to: props.to,
      amount: props.amount,
      addressErr: '',
      memoErr: '',
      memo: props.memo
    };
  }

  componentWillMount = async () => {
    let balanceofVip = '';
    balanceofVip = await tweb3.getBalance(this.props.address);
    console.log('I want to see BL:', balanceofVip);
    this.setState({
      availableBalance: toTEA(balanceofVip.balance)
    });
  };

  _toChange = e => {
    this.setState({
      to: e,
      addressErr: ''
    });
    console.log('toAdd Change CK', e);
  };

  _amountChange = e => {
    if (e !== '') {
      this.setState({
        amount: e,
        amountErr: ''
      });
    } else {
      this.setState({
        amount: ''
      });
    }
    console.log('amount Change CK', e);
  };

  _setMaxValue = () => {
    this.setState({
      amount: this.state.availableBalance
    });
  };

  _memoChange = e => {
    const { value } = e.currentTarget;
    this.setState({
      memo: value,
      memoErr: ''
    });
    console.log('memo Change CK', value);
  };

  _submit = () => {
    if (this.state.to === '') {
      this.setState({
        addressErr: 'To address should not be null'
      });
      return;
    }

    try {
      let rs = ecc.validateAddress(this.state.to);
      console.log('acc CK', rs);
    } catch {
      this.setState({
        addressErr: 'Invalid address! Please Try Again'
      });
      return;
    }

    if (this.state.amount === '') {
      this.setState({
        amountErr: 'Amount should not be null'
      });
      return;
    }

    this.setState(
      {
        amountErr: '',
        addressErr: '',
        memoErr: ''
      },
      () => {
        this.props.next && this.props.next(this.state);
      }
    );

    // console.log('sendT1 props CK', this.props)
  };

  _genAssetsOptions = () => {
    return this.props.assets.map(e => {
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
        }
      };
    });
  };

  _assetChange = item => {
    this._selectType({ text: item });
  };

  _selectType = items => {
    let value;
    this.state.types.forEach(el => {
      if (el.text === items.text) {
        el.selected = true;
        value = items.text;
      } else {
        el.selected = false;
      }
    });
    this.setState({
      selectedType: value
    });
  };

  render() {
    const {
      to,
      amount,
      asset,
      memo,
      amountErr,
      addressErr,
      memoErr,
      availableBalance
    } = this.state;
    const e = this._genAssetsOptions();
    const u =
      e.find(e => {
        return e.value === asset.asset;
      }) || {};

    // console.log('State ST1 CK', this.state);

    return (
      <div>
        <Wrapper
          style={{
            borderBottom: 'none',
            marginTop: '20px',
            paddingBottom: '0'
          }}
        >
          <p className="title">Select Asset</p>

          <SelectUnlockType
            defaultValue={u.render && u.render()}
            options={this._genAssetsOptions()}
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
              <span>{addressErr}</span>I
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
              <span>{amountErr}</span>I
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
  next() {}
};

const mapStateToProps = state => {
  const { account } = state;
  return {
    userInfo: account.userInfo,
    privateKey: account.privateKey,
    address: account.address
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAccount: data => {
      dispatch(actions.setAccount(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SendTransactionOne));
