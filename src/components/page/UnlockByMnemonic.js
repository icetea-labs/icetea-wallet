import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { codec, utils } from 'icetea-common';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './UnlockWallet.css';
import * as bip39 from 'bip39';
import HDKey from 'hdkey';
// Import custom component
import { Button, InputPassword } from './../elements';
// Style component
import { Icon } from './../elements/utils';
import FormError from './FormError.js';

class UnlockByMnemonic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonic: '',
            isPasswordValid: false,
            isMnemonicValid: true,
            password: '',
            loading: false,
            errMsg: '',
        };
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        console.log("Check value", value)
        if ( value === '' ){
            this.setState({
                isMnemonicValid: false,
            })
        }
        else {
            this.setState({
                [name]: value,
                isMnemonicValid: true,
            })
        }
    }

    _gotoCreate = (e) => {
        e.preventDefault();
        this.props.history.push("/create")
    }

    _passwordChange = (value, isPasswordValid) => {
        this.setState({
            isPasswordValid: isPasswordValid,
            password: value
        })
    };

    unlockWalletClick = async () => {
        var mnemonic = this.state.mnemonic;
        // console.log('CK state', this.state);

        var n = mnemonic.normalize("NFKD").split(" ");
        console.log('checkN', n)
        var mnenonicLength = n.length;
        if (mnenonicLength % 3 !== 0){
            this.setState({
                isMnemonicValid: false,
                errMsg: 'Wrong Mnemonic Format',
            })
            return
        }

        if(mnenonicLength === 12 || mnenonicLength === 24){
            var seed1 = bip39.mnemonicToSeed(this.state.mnemonic);
            seed1.then((e) => {
                console.log('e', e)
            })
    
            var seed = await bip39.mnemonicToSeed(this.state.mnemonic);
            console.log('I want to see seed', seed);
            var hdkey = HDKey.fromMasterSeed(seed);
    
            var privateKey = codec.toString(hdkey.privateKey);
            console.log('Private Key', privateKey);
            window.alert("Privatekey: " + privateKey);
    
            // save to store
            var account = {
                mnemonic: this.state.mnemonic,
                privateKey: codec.toString(privateKey),
                password: this.state.password,
                address: utils.getAccount(privateKey).address
            }
            this.props.setAccount(account);
    
            console.log('Account check', account);
            this.props.history.push("/Home");
            
        } else {
            this.setState({
                isMnemonicValid: false,
                errMsg: 'Mnemonic Phrase Wrong',
            })
            return
        }
    }

    render() {
        var { isPasswordValid, isMnemonicValid } = this.state;
        // console.log('State check', this.state);
        return (
            <div>
                <div className="mnemonicTitle">
                    <span>
                        This option restores a lost keystore file or password,
                   <br></br>
                        or imports a seed from another wallet app.
                </span>
                </div>
                <div className="textAreaTitle">
                    Please enter your word phrase
                </div>
                <div className="textAreaBorder">
                    <textarea autoComplete="off" autoCorrect="off" autoCapitalize="off"
                        spellCheck="false" className="textAreaBox" name="mnemonic" onChange={this.handleChange} >
                    </textarea>
                    <p className="mnemonic-sep">Please separate each word with a space.</p>
                </div>
                <div className="wP">
                    <InputPassword title="Temporary session password" withRules={!isPasswordValid} onChange={this._passwordChange} />
                </div>
                <FormError isHidden={this.state.isMnemonicValid} errorMessage={this.state.errMsg} />
                <div className="formFooter">
                    <a className="createNew" onClick={this._gotoCreate}><span>Create a New Wallet</span></a>
                    <Button
                        disabled={!isPasswordValid || !isMnemonicValid}
                        width={'170px'}
                        onClick={() => this.unlockWalletClick()}
                    >
                        <React.Fragment>
                            <span style={{ 'marginRight': '10px' }} >Unlock Wallet Now</span>
                            <Icon type="continue" size="20" color="inherit"></Icon>
                        </React.Fragment>
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mnemonic: state.account.mnemonic,
        password: state.account.password,
        privateKey: state.account.privateKey,
        address: state.account.address
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAccount: (data) => {
            dispatch(actions.setAccount1(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UnlockByMnemonic));