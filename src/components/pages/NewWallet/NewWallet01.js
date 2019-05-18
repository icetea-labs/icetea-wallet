import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { encode, utils } from '../../../utils';
import * as acGlobal from './../../../store/actions/globalData';
import * as actions from './../../../store/actions/create';
import { Button, WarningRecover, InputPassword } from '../../elements';
import { Header2, DivControlBtnKeystore, DivUnlockLink, Icon } from '../../elements/utils';

const WrapperAgree = styled.div`
  font-size: 12px;
  padding: 20px 0;
  color: #848e9c;
  & label span {
    white-space: normal;
  }
`;
const WrapperRePassword = styled.div`
  margin: 40px 0 20px;
`;
const WrapperRePassErr = styled.p`
  color: #f23051;
  font-size: 14px;
  margin-top: 5px;
`;
class NewWallet01 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      agree: false,
      loading: false,
      isPasswordValid: true,
      rePassErr: '',
      rePassword: ''
    };
  }

  static propTypes = {
    password: PropTypes.string,
    privateKey: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    mnemonic: PropTypes.string,
    address: PropTypes.string,
    keyStore: PropTypes.string,
    autoFocus: PropTypes.bool,
    setPassword: PropTypes.func,
    setAccount: PropTypes.func,
    setStep: PropTypes.func,
    setLoading: PropTypes.func,
    setShowKeystoreText: PropTypes.func
  };

  static defaultProps = {
    password: '',
    privateKey: '',
    mnemonic: '',
    address: '',
    keyStore: null,
    autoFocus: false,
    setPassword: function() {},
    setAccount: function() {},
    setStep: function() {},
    setLoading: function() {},
    setShowKeystoreText: function() {}
  };

  _passwordChange = (value, isPasswordValid) => {
    this.props.setPassword(value);
    this.setState({
      isPasswordValid: isPasswordValid
    });
  };

  _rePasswordChange = value => {
    var t = {
      rePassword: value
      // ...this.state
    };
    this.props.password === value && (t.rePassErr = '');
    this.setState(t);
  };

  _handleCheckChange = e => {
    document.activeElement.blur();
    this.setState({
      agree: e.target.checked
    });
  };

  _gotoNext = function(e) {
    document.activeElement.blur();
    var { password } = this.props;
    var { rePassword } = this.state;
    if (password.length < 8) {
      alert('invalid password, reset again');
    } else if (password === rePassword) {
      this.props.setLoading(true);
      console.log('true');
      setTimeout(async () => {
        var account = await this._createAccountWithMneomnic();
        // this._downloadKeyStore(account.keyStore);
        this.props.setAccount({
          privateKey: account.privateKey,
          mnemonic: account.mnemonic,
          address: account.address,
          keyStore: account.keyStore,
          step: 'stepTwo'
        });
        console.log(account);
        this.props.setLoading(false);
        console.log('false');
      }, 100);
    } else {
      this.setState({
        rePassErr: 'The password entered does not match'
      });
    }
  };

  _createAccountWithMneomnic = () => {
    var resp = utils.createAccountWithMneomnic();
    var keyObject = encode(resp.privateKey, 'a');
    return {
      privateKey: resp.privateKey,
      address: resp.address,
      mnemonic: resp.mnemonic,
      keyStore: keyObject
    };
  };

  _downloadKeyStore = keyObject => {
    var a = document.createElement('a');

    var file = new Blob([JSON.stringify(keyObject)]);
    a.href = URL.createObjectURL(file);
    a.download = ''.concat(keyObject.address, '_keystore');
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(a.href);
    a.remove();
  };

  _gotoUnlock = () => {
    this.props.history.push('/unlock');
  };

  render() {
    var { agree, loading, isPasswordValid, rePassErr, rePassword } = this.state;
    return (
      <div>
        <Header2>
          <span className="page">1</span>
          <span className="page totalPage">/2</span>
          <span className="title">Create Keystore File + Password</span>
        </Header2>
        <InputPassword withRules={!isPasswordValid} onChange={this._passwordChange} />
        <WrapperRePassword>
          <InputPassword
            withRules={false}
            warning={!!rePassErr}
            onChange={this._rePasswordChange}
            title={'Re-enter Password'}
          />
          {rePassErr && <WrapperRePassErr>{rePassErr}</WrapperRePassErr>}
        </WrapperRePassword>
        <DivControlBtnKeystore>
          <DivUnlockLink onClick={this._gotoUnlock} className="previous-button">
            Unlock an Existing Wallet
          </DivUnlockLink>
          <Button
            disabled={!agree || !isPasswordValid || !rePassword}
            width={'200px'}
            onClick={() => this._gotoNext()}
            // className="download-keystore"
          >
            <React.Fragment>
              <span style={{ marginRight: '10px' }}>Next</span>
              <Icon type="continue" size="20" color="inherit" />
            </React.Fragment>
          </Button>
        </DivControlBtnKeystore>
        <WrapperAgree>
          <WarningRecover defaultChecked={agree} handleCheckChange={this._handleCheckChange} />
        </WrapperAgree>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    password: state.create.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPassword: value => {
      dispatch(actions.setPassword(value));
    },
    setAccount: value => {
      dispatch(actions.setAccount(value));
    },
    setStep: value => {
      dispatch(actions.setStep(value));
    },
    setLoading: value => {
      dispatch(acGlobal.setLoading(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewWallet01));
