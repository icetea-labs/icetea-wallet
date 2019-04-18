import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
// import { Link } from 'react-router-dom';  
import { codec } from 'icetea-common'
import * as bip39 from 'bip39';
import HDKey from 'hdkey';
// import keythereum from 'keythereum';
import { encode} from '../../utils';
import { connect } from 'react-redux';
import './NewWallet01.css'
import * as actions from '../../actions'

class NewWallet01 extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      password:'',
      isPassValid: {},
      isShowBoxPass: false,
      confirmPassword:'',
      isShowBoxRePass: false,
      cbConfirmRecover:false,
    };//{ cSelected: [] };

    this.unlockKeyClick = this.unlockKeyClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  continueClick = () => {
    var isShowBoxRePass= false;
    if(!this.state.cbConfirmRecover) {
      window.alert("Confirm check box")
    } else if(this.state.password && this.state.confirmPassword && this.state.password !== this.state.confirmPassword) {
      isShowBoxRePass = true;
    } else {
      isShowBoxRePass = false;
      var mnemonic = bip39.generateMnemonic();
      var seed = bip39.mnemonicToSeed(mnemonic);
      var hdkey = HDKey.fromMasterSeed(seed);
      var keyObject = encode(hdkey.privateKey, this.state.password);
      this.download(JSON.stringify(keyObject), keyObject.address + '_keystore.txt', 'text/plain');
      // save to state
      var wallet = {
        mnemonic: mnemonic,
        privateKey: codec.toString(hdkey.privateKey)
      }
      this.props.onSaveWallet(wallet);
      // Change form no
      this.props.onChangeForm('02');
    }
    this.setState({
      isShowBoxRePass
    })
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value.trim();
    let name = target.name;
    this.setState({
      [name]: value
    })
    if (name === 'password') {
      this.validatePassword(value)
    } else if (name === 'confirmPassword' && this.state.password === value) {
      console.log('value',value)
      // update state
      this.setState({
        isShowBoxRePass: false
      })
    }
  }

  validatePassword = (value) => {
    var {isPassValid, isShowBoxPass } = this.state;
    if (value.length < 8) {
      isPassValid.length = false;
    } else {
      isPassValid.length = true;
    }

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#])"); //[!@#\$%\^&\*]
    // console.log('value--',value,'---',regex.test(value))
    if(regex.test(value)) {
      isPassValid.text = true;
    } else {
      isPassValid.text = false;
    }

    if (this.state.isPassValid.length && this.state.isPassValid.text) {
      isShowBoxPass = false;
    } else {
      isShowBoxPass = true;
    }
    // update state
    this.setState({
      isPassValid,
      isShowBoxPass
    })
  }

  unlockKeyClick = () => {
    this.props.history.push(`/unlock`)
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  render() {
    var boxMsg = <div className="checkPassword">
                    <div className="text">Your password must include the following properties: </div>
                    <ul>
                      <li className={ this.state.password.trim() === '' ? 'empty' : this.state.isPassValid.length ? 'pass':'invalid' }>8 or more characters</li>
                      <li className={ this.state.password.trim() === '' ? 'empty' : 
                        this.state.isPassValid.text ? 'pass':'invalid' }>An upper-case letter, symbol and a number</li>
                    </ul>
                  </div>
    var boxErrorConfirmPass = <p className="rePasswordinvalid">The password entered does not match</p>
    var boxValiConfirmPass = this.state.isShowBoxRePass ? boxErrorConfirmPass : ''
    var boxValiPass = this.state.isShowBoxPass ? boxMsg : ''
    // console.log(boxValiConfirmPass)

    return (
          <div className="box2" >
            <div>
              <div className="header1">Create New Wallet</div>
            </div>
            <div>
              <div className='header2' >
                <span className="page" >1</span>
                <span className="page totalPage">/2</span>
                <span className="title" >Create Keystore File + Password</span>
              </div>
              <div className="passwordInput" >
                <p className= { this.state.password.trim() === '' ? 'label': 'label label-value'}>Set a New Password</p>
                <div className="inputWrap">
                  <input type="password" name="password"  onChange={ this.handleChange }/>
                </div>
                  { boxValiPass }
              </div>
              <div className="rePasswordInput" >
                <div className="passwordInput" >
                  <p className= { this.state.confirmPassword.trim() === '' ? 'label': 'label label-value'}>Re-enter Password</p>
                  <div className="inputWrap">
                    <input type="password" name="confirmPassword" onChange={ this.handleChange } />
                  </div>
                </div>
                  { boxValiConfirmPass }
              </div>
              <div className="btControlArea">
                <div className="unlock">Unlock an Existing Wallet</div>
                <button onClick={() => this.continueClick()}
                  className= {this.state.cbConfirmRecover && !this.state.isShowBoxPass && this.state.confirmPassword !=='' ? 'continueBt height':'continueBt'}>
                  <div>
                    <span>Download Keystore File</span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </div>
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