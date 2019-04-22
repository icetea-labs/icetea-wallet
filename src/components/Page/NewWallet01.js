import React from "react";
// import { Button, ButtonGroup } from 'reactstrap';
import { codec } from 'icetea-common';
import { Link } from 'react-router-dom';
import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import keythereum from 'keythereum';
import { encode, decode } from '../../utils';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class NewWallet01 extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      password:'',
      rePassword:'',
      cbConfirmRecover:false,
    };//{ cSelected: [] };

    // this.downloadKeyClick = this.downloadKeyClick.bind(this);
    this.unlockKeyClick = this.unlockKeyClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  downloadKeyClick= async() => {
    console.log(this.state)
    if(!this.state.cbConfirmRecover) {
      window.alert("Confirm check box")
    } else if(this.state.password && this.state.rePassword && this.state.password !== this.state.rePassword) {
      window.alert("Re-Passwork don't match")
    } else {
      var mnemonic = bip39.generateMnemonic();
      var seed = await bip39.mnemonicToSeed(mnemonic);
      var hdkey = HDKey.fromMasterSeed(seed);
      var keyObject = encode(hdkey.privateKey, this.state.password);
      this.download(JSON.stringify(keyObject), keyObject.address + '_keystore.txt', 'text/plain');
      // save to state
      var wallet = {
        mnemonic: mnemonic,
        privateKey: codec.toString(hdkey.privateKey),
        password: this.state.password,
        keyObject: keyObject
      }
      this.props.onSaveWallet(wallet);
      // Change form no
      this.props.onChangeForm('02');
    }
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value; 
    let name = target.name;
    this.setState({
      [name]: value
    })
    // console.log(this.state)
  }
  
  unlockKeyClick() {
    console.log(this.state)
    if(this.state.password && this.state.rePassword && this.state.password !== this.state.rePassword) {
      window.alert("Re-Passwork don't match")
    } else {
      var mnemonic = bip39.generateMnemonic();
      var seed = bip39.mnemonicToSeed(mnemonic);
      var hdkey = HDKey.fromMasterSeed(seed);
      var keyObject = encode(hdkey.privateKey,'123');
      // console.log(keyObject)
      // var string = keythereum.exportToFile(keyObject,'keystore');
      var address = keyObject.address;
      var fileName = address + '_keystore.txt';
      this.download(JSON.stringify(keyObject), fileName, 'text/plain');
    }
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  render() {
    return (
          <div className="box2" >
            <div>
              <h3 className='text-center'>Create New Wallet</h3>
            </div>
            <div>
              <div className='header2' >
                <span className="page" >1</span>
                <span className="page totalPage">/2</span>
                <span className="title" >Create Keystore File + Password</span>
                <p>{ this.props.name }</p>
              </div>
              <div className="pass" >
                <p>Set a New Password</p>
                <div className="inputWrap">
                  <input type="password" name="password"  onChange={this.handleChange}/>
                  <div className="sc-brqgnP bgqVWa">
                    <i className="iconfont icon-blind-eye sc-dnqmqq caBmDY" size="14" color=""></i>
                  </div>
                </div>
              </div>
              <div className="pass" >
                <p>Re-enter Password</p>
                <div className="inputWrap">
                  <input type="password" name="rePassword" onChange={this.handleChange} />
                  <div className="sc-brqgnP bgqVWa">
                    <i className="iconfont icon-blind-eye sc-dnqmqq caBmDY" size="14" color=""></i>
                  </div>
                </div>
              </div>
              <div className="downloadkey">
                {/* <div className="unlock" onClick={() => this.unlockKeyClick()} >Unlock an Existing Wallet</div> */} 
                <Link className="unlock" to="/unlock">Unlock an Existing Wallet</Link>
                <button width="200px" className="btUnlock" onClick={() => this.downloadKeyClick()}>
                <span>Download Keystore File</span>
                <i className="iconfont icon-continue icon" size="20" color="inherit"></i>
                </button>
              </div>
              <div className="footer">
                <label htmlFor="cbx" className="lbFooter">
                  <input id="cbx" type="checkbox" name="cbConfirmRecover"  onChange={this.handleChange} />
                  <span className="textFooter">I understand that icetea cannot recover or reset my password or the keystore file. I will make a backup of the keystore file/password, keep them secret, complete all wallet creation steps and agree to all the terms.</span>
                </label>
              </div>
            </div>
          </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  name: state.Name
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveWallet: (data) => {
      dispatch(actions.saveWallet(data))
    },
    onChangeForm: (formNo) => {
      dispatch(actions.changeForm(formNo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWallet01);
// export default NewWallet; mapStateToProps