import React, { Component } from 'react';
import './Header.css'
import * as actions from '../../actions'
import { connect } from 'react-redux';
import CopyText from  '../page/CopyText'
import styled from 'styled-components'

const DivWapper = styled.div`
  height: 50px;
  line-height: 50px;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1100;
  background: rgb(18, 22, 28);
  padding: 0px 15px;
  @media (max-width: 768px) {
    height: 44px;
    line-height: 44px;
  }
`;
const DivMenuLink = styled.div`
  -webkit-box-pack: end;
  justify-content: flex-end;
  display: flex;
  position: absolute;
  right: 15px;
  @media (max-width: 768px){
      display: none;
  }
`;
const UlLink = styled.ul`
  display: flex;
  flex-direction: row;
  & li {
    height: 50px;
    line-height: 50px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    position: relative;
    padding: 0px 15px;
  }
  & li a {
    height: 100%;
    display: block;
    color: rgb(255, 255, 255);
    font-size: 13px;
  }
  & li:hover {
    color: rgb(240, 185, 11);
    background: rgb(37, 45, 56);
  }
  & li:hover ul {
    display: block;
  }
`;
class Header extends Component {
  render() {
    var address = this.props.address;
    console.log('CheckA', address)
    return (
      <DivWapper>
        <div className="sc-uJMKN jNhSkT">
          <div className="sc-bbmXgH gZQuSA">
            <img src="/static/images/logo/testnet.svg" alt="" />
          </div>
        </div>
        <DivMenuLink>
          <UlLink>
            <li><a href="/transactionHistory">Transaction</a></li>
            <li><a href="/botStore">IceteaStore</a></li>
            <li><a href="/balances">Balances</a></li>
          </UlLink>
          <div className="sc-ktHwxA izmNVh">
            <i className="iconfont icon-account sc-dnqmqq iiYHFz" size="16" color=""></i>
            <ul className="sc-hEsumM cnUGfj">
              <li className="wallet-address">
                <div>
                  <div className="title1">Wallet</div>
                  <div className="address">{address}</div>
                </div>
                <div className="op"><span title="copy address">
                  {/* <i className="iconfont icon-copy sc-dnqmqq iiYHFz" size="16" color=""></i> */}
                  {/* <i className="iconfont fa fa-clone iiYHFz" aria-hidden="true"></i> */}
                  <CopyText text={address} ></CopyText>
                </span>
                  <span title="go to explorer">
                    <i className="iconfont icon-link sc-dnqmqq iiYHFz" size="16" color=""></i>
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
        </DivMenuLink>
      </DivWapper>

    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.account.address
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