import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import keythereum from 'keythereum';

class CreateWallet extends React.Component {
  constructor (props) {
    super(props);
    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.downloadKeyClick = this.downloadKeyClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  downloadKeyClick() {
    var mnemonic = bip39.generateMnemonic()
    // var seed = bip39.mnemonicToSeedHex(mnemonic)
    var seed = bip39.mnemonicToSeed(mnemonic)
    console.log(mnemonic)
    var hdkey = HDKey.fromMasterSeed(seed)
    console.log(hdkey)
  }

  render() {
    return (
         <div className="wallet" >
           <div className="logo" >
            <img src="https://trada.tech/assets/img/logo.svg"/>  
           </div>
          <div className="box1" >
          <div className="box2" >
            <div>
              <div className="header">Create New Wallet</div>
            </div>
            <div>
              <div className='header2' >
                <span className="page" >1</span>
                <span className="page totalPage">/2</span>
                <span className="title" >Create Keystore File + Password</span>
              </div>
              <div className="pass" >
                <p>Set a New Password</p>
                <div className="inputWrap">
                  <input type="password"/>
                  <div className="sc-brqgnP bgqVWa">
                    <i className="iconfont icon-blind-eye sc-dnqmqq caBmDY" size="14" color=""></i>
                  </div>
                </div>
              </div>
              <div className="pass" >
                <p>Re-enter Password</p>
                <div className="inputWrap">
                  <input type="password"/>
                  <div className="sc-brqgnP bgqVWa">
                    <i className="iconfont icon-blind-eye sc-dnqmqq caBmDY" size="14" color=""></i>
                  </div>
                </div>
              </div>
              <div className="downloadkey">
                <div className="unlock">Unlock an Existing Wallet</div>
                <button width="200px" className="btUnlock" onClick={() => this.downloadKeyClick()}>
                <span>Download Keystore File</span>
                <i className="iconfont icon-continue icon" size="20" color="inherit"></i>
                </button>
              </div>
              <div className="footer">
                <div>
                  <label htmlFor="cbx" className="lbFooter">
                    <span>
                      <input id="cbx" type="checkbox"/>
                    </span>
                    <span className="textFooter">I understand that Binance cannot recover or reset my password or the keystore file. I will make a backup of the keystore file/password, keep them secret, complete all wallet creation steps and agree to all the terms.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
export default CreateWallet;

// CreateWallet