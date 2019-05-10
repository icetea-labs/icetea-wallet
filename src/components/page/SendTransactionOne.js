import React, { PureComponent } from 'react'
import {
  Wrapper,
  Error
} from './StyledSTOne';

import STOInput from './STOInput';

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
      memo: ''
    }
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
        </Wrapper>

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