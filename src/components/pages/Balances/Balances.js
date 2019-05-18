import React, { Component } from 'react'
import './Balances.css'
import SendTransaction from './SendTransaction'
import tweb3 from '../../../service/tweb3'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'
import TransactionHistory from './../Transaction'
import CopyText from './../../elements/CopyText'
import { toTEA } from './../../../utils/utils'

class Balances extends Component {
  constructor() {
    super()
    this.state = {
      showSend: false,
      showCFForm: false,
      showTbl: [],
      value: ''
    }
  }
  componentDidMount() {
    this.renderTbl()
    console.log('state', this.state)
    this.setState({ value: this.props.address })
  }

  viewSendForm = () => {
    this.setState({ showSend: true, showCFForm: false })
  }

  _closeSendModal = () => {
    this.setState({
      showSend: !this.state.showSend
    })
  }

  closeCFForm = () => {
    this.setState({
      showCFForm: !this.state.showCFForm
    })
  }

  onCallCFForm = () => {
    this.setState({ showSend: false, showCFForm: true })
  }
  _buildBalances = () => {

  }
  renderTbl = async () => {
    try {
      var result = await tweb3.getBalance(this.props.address)
      console.log('I want to see balance:', result.balance)
      var tblTmp = [{
        name: 'IceTea Chain Native Token',
        symbo: 'ITEA',
        totalBalance: toTEA(result.balance),
        availableBalance: toTEA(result.balance)
      }]
      this.setState({
        showTbl: tblTmp.map((data, index) => (
          <tr key={index}>
            <td style={{ width: '15%' }}>
              <div className='sc-hkaZBZ jvVxXM'>{data.symbo}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className='sc-hkaZBZ jvVxXM'>{data.name}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className='sc-hkaZBZ jvVxXM'><span className='sc-tilXH yKCJu'>{data.totalBalance}</span></div>
            </td>
            <td style={{ width: '15%' }}>
              <div className='sc-hkaZBZ jvVxXM'><span className='sc-tilXH yKCJu'>{data.availableBalance}</span></div>
            </td>
            <td style={{ width: '10%' }}>
              <div className='sc-hkaZBZ sc-hqGPoI feIRPa'><button
                className='sc-bZQynM sc-MYvYT sc-jbWsrJ ircCEl' onClick={this.viewSendForm}>Send</button></div>
            </td>
          </tr>
        ))
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    var { value, filterAssets, showSend, sendingAsset, showMobileCode, hideZeroBalance, page } = this.state
    var { privateKey, address } = this.props
    var user = sessionStorage.getItem("user");
    return (
      <div className='sc-lnrBVv kvEeOF'>
        <div className='sc-kIWQTW jfuazO'>
          <div className='sc-hMjcWo jvYfux'>
            <div className='sc-gCwZxT iWYAnd'>
              <div><span>Balances</span>
                <span className='text-address'>
                  <i id='copyText'>{value}</i>
                </span>
              </div>
              <div className='sc-jDwBTQ cPxcHa'>
                <div className='sc-fATqzn cNStFF'>
                  <i className='fa fa-qrcode sc-dnqmqq dJRkzW' aria-hidden='true' size='18' />
                  <div className='qrCode'>
                    <div size='174' className='qrcode-box sc-iSDuPN iulYhq'>
                      <QRCode size={174} className='qrForm' value={value} />
                    </div>
                  </div>
                </div>
                <CopyText text={this.state.value} />
              </div>
            </div>
            <div>
              <div className='sc-hvvHee cOshIS'>
                <table className='sc-fQejPQ sc-cPuPxo dcZana'>
                  <thead className='sc-eSePXt byspTh'>
                    <tr>
                      <th>Asset</th>
                      <th>Name</th>
                      <th>Total Balance</th>
                      <th>Available Balance</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody className='sc-fvLVrH gjcHsq'>
                    {this.state.showTbl}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {showSend &&
            <SendTransaction
              onSendSuccess={this.renderTbl}
              bncClient=''
              assets={this.props._buildBalances}
              privateKey={privateKey}
              sendingAsset={sendingAsset}
              address={user.address}
              account_number={user.account_number}
              sequence={parseInt(user.sequence, 10)}
              close={this._closeSendModal}
            />
          }
        </div>
        <div><TransactionHistory /></div>
      </div>
    )
  }
}

Balances.defaultProps = {
  tokens: [],
  symbolTickers: [],
  pairs: [],
  userInfo: {},
  privateKey: "",
  dispatch: function () { },
  cryptoCurrencyRate: {},
  history: {},
};

const mapStateToProps = state => {
  // var exchange = state.exchange
  // var tokens = exchange.tokens
  // var cryptoCurrencyRate = exchange.cryptoCurrencyRate
  // var pairs = exchange.pairs
  // var symbolTickers = state.tickers.symbolTickers
  var account = state.account
  return {
      userInfo: account.userInfo,
      // tokens: tokens,
      privateKey: account.privateKey,
      // cryptoCurrencyRate: cryptoCurrencyRate,
      // symbolTickers: symbolTickers,
      // pairs: pairs,
      address: account.address
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Balances)
