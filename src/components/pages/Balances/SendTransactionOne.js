import React, { PureComponent } from 'react'
import {
  Wrapper,
  Error,
  MaxValue,
  FeeAva,
  Fee,
  Ava,
  ButtonWrapper
} from './StyledSTOne'
import { Button } from '../../elements/Button'
import SelectUnlockType from '../Unlock/SelectUnlockType'

import STOInput from './STOInput'
import errorIc from '../../../assets/img/error-icon.png'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../store/actions/account'
import tweb3 from '../../../service/tweb3'
import { toTEA } from './../../../utils/utils'

var itemsMenu = [{
  text: 'ICETEA',
  selected: true,
}, {
  text: 'BTC',
  selected: false,
}, {
  text: 'ETH',
  selected: false
},{
  text: 'VNI',
  selected: false
}]

class SendTransactionOne extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      asset: [],
      to: '',
      amount: '',
      addressErr: '',
      amountErr: '',
      memoErr: '',
      memo: '',
      availableBalance: '100',
      types: itemsMenu,
      selectedType: itemsMenu.filter(item => {
        return !!item.selected
      })[0].text
    }
  }

  componentWillMount = async () => {
    var balanceofVip = ''
    balanceofVip = await tweb3.getBalance('tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx')
    console.log('I want to see BL:', balanceofVip)
    this.setState({
      availableBalance: toTEA(balanceofVip.balance)
    })
  }

  _toChange = (e) => {
    this.setState({
      to: e,
      addressErr: ''
    })
    console.log('toAdd Change CK', e)
  }

  _amountChange = (e) => {
    if (e !== '') {
      this.setState({
        amount: e,
        amountErr: ''
      })
    } else {
      this.setState({
        amount: ''
      })
    }
    console.log('amount Change CK', e)
  }
  
  _setMaxValue = () => {
    this.setState({
      amount: this.state.availableBalance
    })
  }

  _memoChange = (e) => {
    var value = e.currentTarget.value
    this.setState({
      memo: value,
      memoErr: ''
    })
    console.log('memo Change CK', value)
  }

  _submit = () => {
    if (this.state.to === '') {
      this.setState({
        addressErr: 'To address should not be null'
      })
      return
    }
    if (this.state.amount === '') {
      this.setState({
        amountErr: 'Amount should not be null'
      })
      return
    }

    // save to store
    var fromAdd = 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx'
    var to = this.state.to
    var amount = this.state.amount
    var memo = this.state.memo

    var data = { fromAdd: fromAdd, to: to, amount: amount, memo: memo }

    this.props.setAccount(data)

    this.setState({
      amountErr: '',
      addressErr: '',
      memoErr: ''
    }, () => {
      this.props.next && this.props.next(this.state)
    })

    // console.log('sendT1 props CK', this.props)
  }

  _getSelectTypes = () => {
    var types = this.state.types
    var items = []
    return types.forEach(el => {
      el.hide || items.push({ text: el.text, value: el.text })
    }),
    items
  };

  _unlockWayChange = (item) => {
    this._selectType({ text: item })
  };

  _selectType = (items) => {
    var value
    this.state.types.forEach(el => {
      if (el.text === items.text) {
        el.selected = true
        value = items.text
      } else {
        el.selected = false
      }
    })
    this.setState({
      selectedType: value
    })
  };

  render () {
    var { to, amount, asset, memo,
      amountErr, addressErr, memoErr } = this.state
    return (
      <div>
        <Wrapper
          style={{
            borderBottom: 'none',
            marginTop: '20px',
            paddingBottom: '0'
          }}>
          <p className='title'>Select Asset</p>

          <SelectUnlockType
            options={this._getSelectTypes()}
            width='100%'
            onChange={this._unlockWayChange}
          />

        </Wrapper>
        <Wrapper>
          <STOInput
            title='To Address'
            defaultValue={to}
            onChange={this._toChange}
            autoFocus
          />
          {
            addressErr &&
            <Error>
              <img src={errorIc} alt='' />
              <span>{addressErr}</span>I
            </Error>
          }
        </Wrapper>
        <Wrapper>
          <STOInput
            title='Amount to send'
            defaultValue={amount}
            type='number'
            onChange={this._amountChange}
            onFocus={this._amountChange}
          />
          <MaxValue onClick={this._setMaxValue}>Max</MaxValue>
          {
            amountErr &&
            <Error>
              <img src={errorIc} alt='' />
              <span>{amountErr}</span>I
            </Error>
          }
        </Wrapper>
        <Wrapper style={{ borderBottom: 'none' }}>
          <p className='title'>Memo</p>
          <textarea
            className='textarea'
            value={memo}
            onChange={this._memoChange} />
          {
            memoErr &&
            <Error>
              <img src={errorIc} alt='' />
              <span>{memoErr}</span>
            </Error>
          }
        </Wrapper>
        <Wrapper style={{ border: 'none', marginTop: '20px' }} >
          <FeeAva>
            <Fee>
              <span className='fee-title'>Fee:</span>
              <span className='fee-value'>10 </span>
              <span>ICETEA</span>
            </Fee>
            <Ava>
              <span className='Available-title'>Available:</span>
              <span className='Available-value'>{this.state.availableBalance} </span>
            </Ava>
          </FeeAva>
        </Wrapper>
        <ButtonWrapper style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
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
  to: '',
  amount: '',
  memo: '',
  defaultAsset: {},
  next: function () { }
}

const mapStateToProps = state => {
  return {
    fromAdd: state.account.fromAdd,
    to: state.account.to,
    amount: state.account.amount,
    memo: state.account.memo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccount: (data) => {
      dispatch(actions.setAccount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SendTransactionOne))
