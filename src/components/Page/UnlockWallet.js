
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { codec } from 'icetea-common';
import * as actions from '../../actions'
import { connect } from 'react-redux';
import logo from '../Page/logo.png';
import { decode } from '../../utils';
import './UnlockWallet.css';
import * as ct from './../../constants';
import UnlockByJson from './UnlockByJson.js';
import UnlockByMnemonic from './UnlockByMnemonic.js';
import UnlockByPrivateKey from './UnlockByPrivateKey.js';
import styled from 'styled-components';

class UnlockWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: ct.UNLOCK_BY_KEYSTORE
            // selectedItem: ct.UNLOCK_BY_MNEMONIC
        };

        // this.cntReader = this.cntReader.bind(this);
        // this.unlockWalletClick = this.unlockWalletClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    onItemClick = (event) => {
        console.log(event);
        this.setState({
            selectedItem: event
        });
    }
    render() {
        return (
            <div className="unlockWallet" >
                <div className="logo" >
                    <Link to="/"><img width={100} height={100} src={logo} alt="" /> </Link>
                </div>
                <div className="container">
                    <div>
                        <div className="title">Unlock Your Wallet</div>
                        <p>{this.props.name}</p>
                        <p className="ship-text">Please check that you are visiting
                        https://trada.tech/
                            </p>
                    </div>
                    <div className="unlockTable">
                        <div className="leftTable">
                            <p className="leftTitle">Select how you would like to unlock</p>
                            <ul className="unlockType">
                                <li onClick={() => this.onItemClick(ct.UNLOCK_BY_KEYSTORE)} data-id="1"
                                    className={this.state.selectedItem === ct.UNLOCK_BY_KEYSTORE ? "on" : "off"} data-cy="menu-KeyStore File">
                                    <span>1. KeyStore File</span>
                                    <div className="selected"></div>
                                </li>
                                <li onClick={() => this.onItemClick(ct.UNLOCK_BY_MNEMONIC)} data-id="2"
                                    className={this.state.selectedItem === ct.UNLOCK_BY_MNEMONIC ? "on" : "off"} data-cy="-Mnemonic Phrase">
                                    <span>2. Mnemonic Phrase</span>
                                    <div className="selected"></div>
                                </li>
                                <li onClick={() => this.onItemClick(ct.UNLOCK_BY_PRIVATEKEY)} data-id="3"
                                    className={this.state.selectedItem === ct.UNLOCK_BY_PRIVATEKEY ? "on" : "off"} data-cy="menu-Private Key">
                                    <span>3. Private Key</span>
                                    <div className="selected"></div>
                                </li>
                            </ul>
                        </div>
                        <div className="rightTable">
                            {this.state.selectedItem === ct.UNLOCK_BY_KEYSTORE ? <UnlockByJson /> : ''}
                            {this.state.selectedItem === ct.UNLOCK_BY_MNEMONIC ? <UnlockByMnemonic /> : ''}
                            {this.state.selectedItem === ct.UNLOCK_BY_PRIVATEKEY ? <UnlockByPrivateKey /> : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
=======
import './UnlockWallet.css'

class UnlockWallet extends Component {

  constructor(props){
    super(props)
    this.state={}
  }
  
  render() {
      return (
          <div className="unlockWallet">
              <div className="unlockPack">
                  <div className="container">
                      <div>
                          <div className="title">Unlock Your Wallet</div>
                          <p className="ship-text">Please check that you are visiting
                          https://trada.tech/
                          </p>
                      </div>
                      <div className="unlockTable">
                          <div className="leftTable">
                              <p className="leftTitle">Select how you would like to unlock</p>
                              <ul className="unlockType">
                                  <li className="on" role="presentation" data-cy="menu-KeyStore File">
                                      <span>1. KeyStore FIle</span>
                                      <div className="selected"></div>
                                  </li>
                                  <li className role="presentation" data-cy="menu-Mnemonic Phrase">
                                      <span>2. Mnemonic Phrase</span>
                                      <div className="selected"></div>
                                  </li>
                                  <li className role="presentation" data-cy="menu-Private Key">
                                      <span>3. Private Key</span>
                                      <div className="selected"></div>
                                  </li>
                              </ul>
                          </div>
                          <form className="rightTable">
                              <div className="opt1">
                                  <span className="show">Select your keystore file</span>
                              </div>
                              <div className="upload">
                                  <span>Upload keystore file</span>
                                  <input type="file" title=" "></input>
                              </div>
                              <div className="opt2">
                                  <span className>Or paste the contents of your keystore file</span>
                              </div>
                              <textarea autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" data-gramm="false" className="keyText"></textarea>
                              <div className="passBox">
                                  <div className="passInput">
                                      <p className="label">Enter your wallet password</p>
                                      <div className="inputWrap">
                                          <input type="password"></input>
                                      </div>
                                  </div>
                              </div>
                              <div className="formFooter">
                                  <Link className="createNew" to="/create">Create a New Wallet</Link>
                                  <button className="unlockBtn">
                                      <span>Unlock Wallet Now</span>
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
>>>>>>> master
}

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeULType: (ulType) => {
            dispatch(actions.changeULType(ulType))
        },
        onSaveWallet: (data) => {
            dispatch(actions.saveWallet(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockWallet);