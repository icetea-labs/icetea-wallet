import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import { codec, utils } from 'icetea-common'
import { encode } from '../../utils';
import * as actions from '../../actions';

// Import custom component
import { Button, WarningRecover, InputPassword } from './../elements'
// Style component
import {
  DivBox2, Header1, Header2,
  InputPass, InputConfirmPass, DivControlBtn,
  DivUnlockLink, DivFooter, DivFooterCheckBox, DivValidPass, Icon
} from './../elements/utils'

const DivAgree = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgb(132, 142, 156);
  & label span {
    white-space: normal;
  }
`;

class NewWallet01 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agree: false,
      password: '',
      isPassValid: {},
      isShowBoxPass: false,
      confirmPassword: '',
      isShowBoxRePass: false,
    };//{ cSelected: [] };
  }

  continueClick = () => {
    var isShowBoxRePass = false;
    if (!this.state.agree) {
      window.alert("Confirm check box")
    } else if (this.state.password !== this.state.confirmPassword) {
      isShowBoxRePass = true;
    } else if (this.state.password !== '') {
      this.props.onChangePopup('01');
      isShowBoxRePass = false;
      setTimeout(() => {
        this.generateAccount()
      }, 500);
    }
    this.setState({
      isShowBoxRePass
    })
  }

  generateAccount = async () => {
    var mnemonic = bip39.generateMnemonic();
    var seed = await bip39.mnemonicToSeed(mnemonic);
    var hdkey = HDKey.fromMasterSeed(seed);
    var keyObject = encode(hdkey.privateKey, this.state.password);
    this.download(JSON.stringify(keyObject), keyObject.address + '_keystore.txt', 'text/plain');
    // save to state
    var wallet = {
      mnemonic: mnemonic,
      privateKey: codec.toString(hdkey.privateKey),
      address: utils.getAccount(hdkey.privateKey).address
    }
    this.props.onSaveWallet(wallet);
    this.props.onChangePopup('00');
    // Change form no
    this.props.onChangeForm('02');
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value.trim();
    let name = target.name;
    this.setState({
      [name]: value
    })
    if (name === 'password') {
      this.validatePassword(value)
    } else if (name === 'confirmPassword' && this.state.password === value) {
      console.log('value', value)
      // update state
      this.setState({
        isShowBoxRePass: false
      })
    }
  }

  handleCheckChange = (e) => {
    this.setState({
      agree: !this.state.agree
    })
  }
  
  handlePasswordChange = (value) => {
    this.setState({
      password: value
    });
  }
  
  validatePassword = (value) => {
    var { isPassValid, isShowBoxPass } = this.state;
    if (value.length < 8) {
      isPassValid.length = false;
    } else {
      isPassValid.length = true;
    }

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#])"); //[!@#\$%\^&\*]
    // console.log('value--',value,'---',regex.test(value))
    if (regex.test(value)) {
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

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  render() {
    var { password, isPassValid } = this.state;
    var boxMsg =
      <DivValidPass>
        <div className="text">Your password must include the following properties: </div>
        <ul>
          <li className={password.trim() === '' ? 'empty' :
            isPassValid.length ? 'pass' : 'invalid'}>8 or more characters</li>
          <li className={password.trim() === '' ? 'empty' :
            isPassValid.text ? 'pass' : 'invalid'}>An upper-case letter, symbol and a number</li>
        </ul>
      </DivValidPass>

    var boxErrorConfirmPass = <p className="rePasswordinvalid">The password entered does not match</p>
    var boxValiConfirmPass = this.state.isShowBoxRePass ? boxErrorConfirmPass : ''
    var boxValiPass = this.state.isShowBoxPass ? boxMsg : ''
    // console.log(boxValiConfirmPass)
    var { agree, isShowBoxPass, confirmPassword } = this.state;
    var isActive = (agree && !isShowBoxPass && confirmPassword !== '') ? 'active' : ''
    return (
      <DivBox2>
        <div>
          <Header1>Create New Wallet</Header1>
        </div>
        <div>
          <Header2>
            <span className="page" >1</span>
            <span className="page totalPage">/2</span>
            <span className="title" >Create Keystore File + Password</span>
          </Header2>

          <InputPassword withRules={!!password} warning={false} onChange={this.handlePasswordChange} />

          <InputConfirmPass>
            <InputPass>
              <p className={this.state.confirmPassword.trim() === '' ? 'label' : 'label label-value'}>Re-enter Password</p>
              <div className="inputWrap">
                <input type="password" name="confirmPassword" onChange={this.handleChange} />
              </div>
            </InputPass>
            {boxValiConfirmPass}
          </InputConfirmPass>

          <DivControlBtn>
            <DivUnlockLink><Link className="unlock" to="/unlock">Unlock an Existing Wallet</Link></DivUnlockLink>
            <Button
              // disabled = {true}
              width={'200px'}
              onClick={() => this.continueClick()}
              className={isActive}>
              <span style={{ 'marginRight': '10px' }} >Download Keystore File</span>
              <Icon className="iconfont icon-continue" size="20" color="inherit"></Icon>
            </Button>
          </DivControlBtn>
          <DivAgree>
            <WarningRecover defaultChecked={ agree } handleCheckChange={this.handleCheckChange } />
          </DivAgree>
        </div>
      </DivBox2>
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
    onChangeForm: (step) => {
      dispatch(actions.setStep(step))
    },
    onChangePopup: (puNo) => {
      dispatch(actions.changePopup(puNo))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewWallet01));

// export default NewWallet; mapStateToProps