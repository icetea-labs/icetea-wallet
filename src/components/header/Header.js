import React, { Component } from 'react';
import './Header.css'
import * as actions from '../../actions'
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    var address ='';
    if(this.props.wallet) address = this.props.wallet.address;
    return (
      <div className="sc-jqCOkK gWEMEs">
        <div className="sc-uJMKN jNhSkT">
          <div className="sc-bbmXgH gZQuSA">
            <img src="/static/images/logo/testnet.svg" alt="" />
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
              <li><a href="/unlock">Change Wallet</a></li>
              <li><a href="/create">Create New Wallet</a></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);