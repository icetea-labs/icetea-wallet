import React, { PureComponent } from 'react'
import {
  Wrapper,
  Error,
  MaxValue,
  FeeAva,
  Fee,
  Ava,
  ButtonWrapper,
} from './StyledSTOne';

import { Button } from './../elements/Button';

import STOInput from './STOInput';
import errorIc from '../../assets/img/error-icon.png';

export default class SendTransactionOne extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      asset: [],
      to: '',
      amount: '',
      addressErr: "",
      amountErr: '',
      memoErr: "",
      memo: '',
      availableBalance: "10",
    }
  }
  

  _toChange = (e) => {
    this.setState({
        to: e,
        addressErr: ""
    })
  }

  _amountChange = (e) => {
    if ("" !== e) {
        this.setState({
            amount: e,
            amountErr: ""
        })
    } else
        this.setState({
            amount: ""
        })
  }
  _setMaxValue = () => {
    this.setState({
        amount: this.state.availableBalance,
    })
    
  }
  
  _memoChange = (e) => {
    this.setState({
        memo: e.currentTarget.value,
        memoErr: ""
    })
  }

  _submit = () => {

  }

  render() {
    var { to, amount, asset, memo,
      amountErr, addressErr, memoErr } = this.state;
    return (
      <div>
        <Wrapper
          style={{
            borderBottom: "none",
            marginTop: "20px",
            paddingBottom: "0"
          }}>
          <p className="title">Select Asset</p>
          <p>Bo sung bang AssetSelecte Componen</p>
        </Wrapper>
        <Wrapper>
          <STOInput
            title="To Address"
            defaultValue={to}
            onChange={this._toChange}
            autoFocus={true}
          >
          </STOInput>
          {
            addressErr && 
            <Error>
              <img src={errorIc} alt={true} />
              <span>{addressErr}</span>I
            </Error>
          }
        </Wrapper>
        <Wrapper>
          <STOInput
            title= "Amount to send"
            defaultValue={amount}
            type="number"
            onChange={this._amountChange}
            onFocus={this._amountChange}

            // max = {this.state.is_max}
          >
          </STOInput>
          <MaxValue onClick={this._setMaxValue}>Max</MaxValue>
          {
            amountErr && 
            <Error>
              <img src={errorIc} alt={true} />
              <span>{amountErr}</span>I
            </Error>
          }
        </Wrapper>
        <Wrapper style= {{ borderBottom: "none"}}>
          <p className="title">Memo</p>
          <textArea 
            className="textarea"
            value={memo}
            onChange={this._memoChange}>
          </textArea>
          {
            memoErr && 
            <Error>
              <img src={errorIc} alt={true} />
              <span>{memoErr}</span>
            </Error>
          }
        </Wrapper>
        <Wrapper  style= {{ border: "none", marginTop: "20px"}} >
          <FeeAva>
            <Fee>
              <span className="fee-title">Fee:</span>
              <span className="fee-value">10 </span>
              <span>ICETEA</span>
            </Fee>
            <Ava>
              <span className="Available-title">Available:</span>
              <span className="Available-value">10 </span>
            </Ava>
          </FeeAva>
        </Wrapper>
        <ButtonWrapper style= {{justifyContent: "flex-end", marginTop: "16px" }}>
          <Button onClick={this._submit}>
            <span>Next</span>
          </Button>
        </ButtonWrapper>
      </div>
    )
  }
}

SendTransactionOne.defaultProps = {
  assets: [],
  to: "",
  amount: "",
  memo: "",
  defaultAsset: {},
  next: function () { }
}
