import React, { Component } from 'react';
import './Balances.css';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import Layout from '../../layout';
import SendTransaction from './SendTransaction';
import tweb3 from '../../../service/tweb3';
import TransactionHistory from '../Transaction';
import { Icon } from '../../elements/utils';
import { toTEA } from '../../../utils/utils';
import PuInputPassword from './PuInputPassword';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import notifi from '../../elements/Notification';

let user = sessionStorage.getItem('user');
user = (user && JSON.parse(user)) || {};

class Balances extends Component {
  constructor() {
    super();
    this.state = {
      showSend: false,
      showCFForm: false,
      showTbl: [],
    };
  }

  componentWillMount() {
    this.renderTbl();
    console.log('WillMount', this.props.address);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) {
      this.renderTbl();
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.sendTimeOut);
  };

  viewSendForm = () => {
    this.setState({ showSend: true, showCFForm: false });
  };

  viewCFForm = () => {
    this.setState({ showSend: false, showCFForm: true });
  };

  _closeSendModal = () => {
    this.setState({
      showSend: !this.state.showSend,
    });
  };

  closeCFForm = () => {
    this.setState({
      showCFForm: !this.state.showCFForm,
    });
  };

  onCFSuccess = () => {
    this.sendTimeOut = setTimeout(() => {
      this.setState({ showSend: !this.state.showSend });
    }, 1e3);
  };

  _buildBalances = () => {};

  _copyAddress = function() {
    notifi.info('Copy successful!');
  };

  renderTbl = async () => {
    try {
      const address = this.props.address;
      const result = await tweb3.getBalance(address);
      console.log('I want to see balance:', result.balance);
      const tblTmp = [
        {
          name: 'IceTea Chain Native Token',
          symbo: 'ITEA',
          totalBalance: toTEA(result.balance),
          availableBalance: toTEA(result.balance),
        },
      ];
      this.setState({
        showTbl: tblTmp.map((data, index) => (
          <tr key={index}>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">{data.symbo}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">{data.name}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">
                <span className="sc-tilXH yKCJu">{data.totalBalance}</span>
              </div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">
                <span className="sc-tilXH yKCJu">{data.availableBalance}</span>
              </div>
            </td>
            <td style={{ width: '10%' }}>
              <div className="sc-hkaZBZ sc-hqGPoI feIRPa">
                <button
                  className="sc-bZQynM sc-MYvYT sc-jbWsrJ ircCEl"
                  onClick={address ? this.viewSendForm : this.viewCFForm}
                >
                  Send
                </button>
              </div>
            </td>
          </tr>
        )),
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { filterAssets, showSend, sendingAsset, showMobileCode, hideZeroBalance, page, showCFForm } = this.state;
    const { privateKey } = this.props;
    const address = user.address;
    console.log('CHECK render', this.props.address);
    return (
      <Layout>
        <div className="sc-lnrBVv kvEeOF">
          <div className="sc-kIWQTW jfuazO">
            <div className="sc-hMjcWo jvYfux">
              <div className="sc-gCwZxT iWYAnd">
                <div>
                  <span>Balances</span>
                  <span className="text-address">
                    <i id="copyText">{address}</i>
                  </span>
                </div>
                <div className="sc-jDwBTQ cPxcHa">
                  <div className="sc-fATqzn cNStFF">
                    <Icon type="qrcode" size={18} />
                    <div className="qrCode">
                      <div size="174" className="qrcode-box sc-iSDuPN iulYhq">
                        <QRCode size={174} className="qrForm" value={address} />
                      </div>
                    </div>
                  </div>
                  <div className="sc-fATqzn cNStFF">
                    <CopyToClipboard text={address} onCopy={this._copyAddress}>
                      <span title="copy address">
                        <Icon type="copy" size={18} />
                      </span>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <div>
                <div className="sc-hvvHee cOshIS">
                  <table className="sc-fQejPQ sc-cPuPxo dcZana">
                    <thead className="sc-eSePXt byspTh">
                      <tr>
                        <th>Asset</th>
                        <th>Name</th>
                        <th>Total Balance</th>
                        <th>Available Balance</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody className="sc-fvLVrH gjcHsq">{this.state.showTbl}</tbody>
                  </table>
                </div>
              </div>
            </div>
            {showSend && (
              <SendTransaction
                onSendSuccess={this.renderTbl}
                bncClient=""
                assets={this.props._buildBalances}
                privateKey={privateKey}
                sendingAsset={sendingAsset}
                // address={user.address}
                address={address}
                // account_number={user.account_number}
                // sequence={parseInt(user.sequence, 10)}
                close={this._closeSendModal}
              />
            )}
          </div>
          <div>{showCFForm && <PuInputPassword onCFSuccess={this.onCFSuccess} close={this.closeCFForm} />}</div>
          <div>
            <TransactionHistory />
          </div>
        </div>
      </Layout>
    );
  }
}

Balances.defaultProps = {
  tokens: [],
  symbolTickers: [],
  pairs: [],
  userInfo: {},
  privateKey: '',
  dispatch() {},
  cryptoCurrencyRate: {},
  history: {},
};

const mapStateToProps = state => {
  // var exchange = state.exchange
  // var tokens = exchange.tokens
  // var cryptoCurrencyRate = exchange.cryptoCurrencyRate
  // var pairs = exchange.pairs
  // var symbolTickers = state.tickers.symbolTickers
  const { account } = state;
  return {
    userInfo: account.userInfo,
    // tokens: tokens,
    privateKey: account.privateKey,
    // cryptoCurrencyRate: cryptoCurrencyRate,
    // symbolTickers: symbolTickers,
    // pairs: pairs,
    address: account.address,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Balances);
