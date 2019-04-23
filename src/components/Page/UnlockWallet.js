
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
}

export default UnlockWallet;