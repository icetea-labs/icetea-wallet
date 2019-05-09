import React, { Component } from 'react';
import { decode } from '../../utils';
import { Link } from 'react-router-dom';
import { codec, utils } from 'icetea-common';
import * as actions from '../../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './UnlockWallet.css';
import PropTypes from 'prop-types';
import upload from '../../assets/img/upload.png';
import FormError from './FormError.js';

// Import custom component
import { Button, InputPassword } from './../elements';
// Style component
import { Icon} from './../elements/utils';

const propTypes = {
    password: PropTypes.string,
    setAccount: PropTypes.func,
    getAccount: PropTypes.func,
    formatI18nText: PropTypes.func,
}

const defaultProps = {
    password: "",
    setAccount: () => { },
    getAccount: () => { },
    formatI18nText: () => { },
}

class UnlockByJson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            keyStoreFile: '',
            errMsg: '',
            loading: false,
            showTextArea: false,
            isPasswordValid: true,
        };
    }

    unlockWalletClick = () => {
        console.log('Check State',this.state);
        // console.log('I want to see keyStoreFile', this.state.keyStorefile);
        // console.log('checkPass props', this.props.password);

        try {
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
        } catch {
            this.setState({
                errMsg: "Keystore mac check failed - wrong password?",
                isPasswordValid: false
            })
        }

        // console.log('Recheck State',this.state);
        
    }

    fileChange = (event) => {
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

    _gotoCreate = (e) => {
        e.preventDefault();
        this.props.history.push("/create")
    }

    _passwordChange = (value, isPasswordValid) => {
        this.props.setPassword(value);
        this.setState({
            isPasswordValid: !isPasswordValid,
            password: value
        })
        console.log('checkP', value)
    };

    render() {
        var isPasswordValid = this.state;   
        return (
            <div>
                <div className="opt1">
                    <span className="show">Select your keystore file</span>
                </div>
                <div className="upload">
                    <img src={upload} alt="" />
                    <span>Upload keystore file</span>
                    <input type="file"
                        name="keyStorefile"
                        onChange={this.fileChange} />
                </div>
                <div className="wP">
                    <InputPassword title="Enter your wallet password" withRules={ !isPasswordValid } onChange={this._passwordChange} />
                </div>
              
                <FormError isHidden={this.state.isPasswordValid} errorMessage={this.state.errMsg} />
               
                <div className="formFooter">
                    <a className="createNew" onClick={this._gotoCreate}><span>Create a New Wallet</span></a>
                    <Button
                        width={'170px'}
                        onClick={() => this.unlockWalletClick()}>
                    <span style={{ 'marginRight': '10px' }} >Unlock Wallet Now</span>
                    <Icon type="continue" size="20" color="inherit"></Icon>
                    </Button>
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
        setPassword: (value) => {
            dispatch(actions.setPassword(value));
        },
        onChangeULType: (ulType) => {
            dispatch(actions.changeULType(ulType))
        },
        onSaveWallet: (data) => {
            dispatch(actions.saveWallet(data))
        }
    }
}

UnlockByJson.propTypes = propTypes;
UnlockByJson.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnlockByJson));