import React, { Component } from 'react';
import { decode } from '../../utils';
import { Link } from 'react-router-dom';
import { codec, utils } from 'icetea-common';
import * as actions from '../../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './UnlockWallet.css';

class UnlockByJson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            keyStorefile: ''
        };
    }

    unlockWalletClick = () => {
        console.log(this.state);
        console.log('I want to see keyStoreFile', this.state.keyStorefile);

        var account = decode(this.state.password, this.state.keyStorefile);
        var privateKey = codec.toString(account.privateKey);
        console.log('Private Key', privateKey);
        window.alert("Privatekey: " + privateKey);

        // save to store
        var wallet = {
            privateKey: codec.toString(privateKey),
            password: this.state.password,
            address: utils.getAccount(privateKey).address
        }
        this.props.onSaveWallet(wallet);

        console.log('Wallet check', wallet);
        this.props.history.push("/Home");
    }

    cntReader = (event) => {
        var file = event.target.files[0]
        var reader = new FileReader();
        reader.onload = (event) => {
            console.log('abc', event.target.result);
            this.setState({
                keyStorefile: JSON.parse(event.target.result)
            })
            // this.state.keyStorefile = JSON.parse(event.target.result);
        };

        reader.readAsText(file);
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <div className="opt1">
                    <span className="show">Select your keystore file</span>
                </div>
                <div className="upload">
                    <span>Upload keystore file</span>
                    <input type="file"
                        name="keyStorefile"
                        onChange={this.cntReader} />
                </div>
                <div className="passBox">
                    <div className="passInput">
                        <p className="label">Enter your wallet password</p>
                        <div className="inputWrap">
                            <input type="password"
                                name="password"
                                placeholder="Your password"
                                onChange={this.handleChange}
                                required
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
        );
    }
}

const mapStateToProps = state => {
    return {
        wallet: state.wallet
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnlockByJson));