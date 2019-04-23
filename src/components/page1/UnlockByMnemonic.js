import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { codec } from 'icetea-common';
import * as actions from '../../actions'
import { connect } from 'react-redux';
import './UnlockWallet.css';
import * as bip39 from 'bip39';
import HDKey from 'hdkey';

class UnlockByMnemonic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonic: '',
        };
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        console.log("Check value", value)
        this.setState({
            [name]: value
        })
    }

    unlockWalletClick = async () => {
        console.log(this.state.mnemonic);

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
        var wallet = {
            mnemonic: this.state.mnemonic,
            privateKey: codec.toString(privateKey),
            password: this.state.password,
        }
        this.props.onSaveWallet(wallet);

        console.log('Wallet check', wallet);
    }

    render() {
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
                    Please enter your 24 word phrase
                </div>
                <div className="textAreaBorder">
                    <textarea autoComplete="off" autoCorrect="off" autoCapitalize="off"
                        spellCheck="false" className="textAreaBox" name="mnemonic" onChange={this.handleChange} >
                    </textarea>
                    <p className="mnemonic-sep">Please separate each word with a space.</p>
                </div>
                <div className="tempPass">
                    <p className="label">Temporary session password</p>
                    <div className="inputWrap">
                        <input type="password"
                            name="password"
                            placeholder="Your password"
                        />
                    </div>
                </div>
                <div className="formFooter">
                    <Link className="createNew" to="/create">Create a New Wallet</Link>
                    <button className="unlockBtn" onClick={() => this.unlockWalletClick()}>
                        <span>Unlock Wallet Now</span>
                    </button>
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
        onChangeULType: (ulType) => {
            dispatch(actions.changeULType(ulType))
        },
        onSaveWallet: (data) => {
            dispatch(actions.saveWallet(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockByMnemonic);