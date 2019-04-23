import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../actions'
import { connect } from 'react-redux';
import './UnlockWallet.css';

class UnlockByPrivateKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            privateKey: '',
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

    unlockWalletClick = () => {
        console.log(this.state.mnemonic);


        var privateKey = this.state.privateKey;
        console.log('Priate Key', privateKey);
        window.alert("Privatekey: " + privateKey);

        // save to store
        var wallet = {
            privateKey: privateKey,
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
                        This option restores your account with PrivateKey
                </span>
                </div>
                <div className="textAreaTitle">
                    Please enter your Private Key
                </div>
                <div className="textAreaBorder">
                    <textarea autoComplete="off" autoCorrect="off" autoCapitalize="off"
                        spellCheck="false" className="textAreaBox" name="privateKey" onChange={this.handleChange} >
                    </textarea>
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

export default connect(mapStateToProps, mapDispatchToProps)(UnlockByPrivateKey);