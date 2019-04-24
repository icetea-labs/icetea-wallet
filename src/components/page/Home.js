import React, { Component } from 'react';
import './Home.css'
import * as actions from '../../actions'
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    var address ='';
    if(this.props.wallet) address = this.props.wallet.address;
    return (
      <div className="sc-jqCOkK gWEMEs">
        <div className="sc-uJMKN jNhSkT">
          <div className="sc-bbmXgH gZQuSA">
            <img src="/static/images/logo/testnet.svg" alt="" />
          </div>
          <div className="sc-gGBfsJ ksQZeF">
            <div className="sc-csuQGl iLOzDx"></div>
            <div className="sc-Rmtcm ioeILa">
              <div className="sc-bRBYWo FnAxk">
              </div><span></span>&nbsp;&nbsp;<span>▾</span>
              <ul className="sc-hzDkRC jrhGN">
                <li className="on">
                  <div className="cycle  sc-bRBYWo FnAxk"></div>
                  <div>
                    <div className="name"></div>
                    <div className="url">testnet-dex.binance.org</div>
                  </div>
                </li>
                <li className="">
                  <div className="cycle  sc-bRBYWo FnAxk"></div>
                  <div>
                    <div className="name">Accelerated 2</div>
                    <div className="url">testnet-dex-asiapacific.binance.org</div>
                  </div>
                </li>
                <li className="">
                  <div className="cycle  sc-bRBYWo FnAxk"></div>
                  <div>
                    <div className="name">Accelerated 3</div>
                    <div className="url">testnet-dex-atlantic.binance.org</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="sc-cmTdod dUvHel">
            <div className="trade-pair"><div className="more-trade-pair">
              <i className="iconfont icon-sanjiaojiantouxia-B sc-dnqmqq cCVZOs" size="16" color="#f0b90b"></i>
            </div>
            </div>
          </div>
        </div>
        <div className="sc-jnlKLf gTInge">
          <ul className="sc-fYxtnH cOXWZm">
            <li className="withSubMenus">
              <a href="/sentTransaction">Transaction</a>
              <ul className="subMenus sc-iELTvK wCTXT">
                <li>< a href="/sentTransaction">Sent Transaction</a></li>
                <li><a href="/transactionHistory">Transaction History</a></li>
              </ul>
            </li>
            <li>
              <a href="/botStore">BotStore</a></li>
              <li><a href="/balances">Balances</a></li>
          </ul>
          <div className="sc-ktHwxA izmNVh">
            {/* <i className="iconfont icon-account sc-dnqmqq iiYHFz" size="16" color=""></i> */}
            <i className="iconfont fa fa-user-circle iiYHFz" aria-hidden="true"></i>
            <ul className="sc-hEsumM cnUGfj">
              <li className="wallet-address">
                <div>
                  <div className="title1">Wallet</div>
                  <div className="address">{address}</div>
                </div>
                <div className="op"><span title="copy address">
                  {/* <i className="iconfont icon-copy sc-dnqmqq iiYHFz" size="16" color=""></i> */}
                  <i className="iconfont fa fa-clone iiYHFz" aria-hidden="true"></i>
                </span>
                  <span title="go to explorer">
                    {/* <i className="iconfont icon-link sc-dnqmqq iiYHFz" size="16" color=""></i> */}
                    <i className="iconfont fa fa-external-link iiYHFz" aria-hidden="true"></i>
                  </span>
                </div>
              </li>
              {/* <li><a href="/unlock">Change Wallet</a></li> */}
              {/* <li><a href="/create">Create New Wallet</a></li> */}
              <li>Change Wallet</li>
              <li>Create New Wallet</li>
              <li>Export Keystore File</li>
              <li>Close Wallet</li>
            </ul>
          </div>
          <div className="sc-tilXH Sxoxk"><i className="iconfont icon-menu sc-dnqmqq eAXZfv" size="20" color=""></i></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.wallet
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveWallet: (data) => {
      dispatch(actions.saveWallet(data))
    },
    onChangeForm: (formNo) => {
      dispatch(actions.setStep(formNo))
    },
    onChangePopup: (puNo) => {
      dispatch(actions.changePopup(puNo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);