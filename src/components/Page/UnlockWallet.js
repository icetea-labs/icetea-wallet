import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { codec } from 'icetea-common';
import { connect } from 'react-redux';
import logo from '../Page/logo.png';
import { decode } from '../../utils';
import './UnlockWallet.css';
//import FormError from './FormError.js'

class UnlockWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            keyStorefile: ''
        };

        this.cntReader = this.cntReader.bind(this);
        this.unlockWalletClick = this.unlockWalletClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    unlockWalletClick() {
        console.log(this.state);
        console.log('fuck', this.state.keyStorefile);

        var account = decode(this.state.password, this.state.keyStorefile);
        var privateKey = codec.toString(account.privateKey);
        console.log('Private Key', privateKey);
        window.alert("Privatekey: " + privateKey)
    }

    uploadFile(event) {
        let file = event.target.files[0];
        console.log(file);
        
        if (file) {
          let data = new FormData();
          data.append('file', file);
        }
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value; 
        let name = target.name;
        this.setState({
          [name]: value
        })
      }

    cntReader(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event)=> {
          console.log('abc',event.target.result);
          this.state.keyStorefile = JSON.parse(event.target.result);
        };

        reader.readAsText(file);
      }

    render() {
        return (
            <div className="unlockWallet">
                <div className="logo" >
                    <Link to="/"><img width={80} height={80} src={logo} alt="" /> </Link>
                </div>
                <div className="unlockPack">
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
                                    <li className="on" role="presentation" data-cy="menu-KeyStore File">
                                        <span>1. KeyStore FIle</span>
                                        <div className="selected"></div>
                                    </li>
                                    <li role="presentation" data-cy="menu-Mnemonic Phrase">
                                        <span>2. Mnemonic Phrase</span>
                                        <div className="selected"></div>
                                    </li>
                                    <li role="presentation" data-cy="menu-Private Key">
                                        <span>3. Private Key</span>
                                        <div className="selected"></div>
                                    </li>
                                </ul>
                            </div>
                            <div className="rightTable">
                                <div className="opt1">
                                    <span className="show">Select your keystore file</span>
                                </div>
                                <div className="upload">
                                    <span>Upload keystore file</span>
                                    <input type="file"
                                        name="keyStorefile"
                                        onChange={this.cntReader}/>
                                </div>
                                <div className="opt2">

                                    <span>Or paste the contents of your keystore file</span>
                                </div>
                                <textarea autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" data-gramm="false" className="keyText"></textarea>
                                <div className="passBox">
                                    <div className="passInput">
                                        <p className="label">Enter your wallet password</p>
                                        <div className="inputWrap">
                                            <input type="password"
                                                name="password"
                                                placeholder="Your password"
                                                onChange={this.handleChange}
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className="formFooter">
                                    <Link className="createNew" to="/create">Create a New Wallet</Link>
                                    <button className="unlockBtn" onClick={() => this.unlockWalletClick()}>
                                        <span>Unlock Wallet Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.Name,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockWallet);
