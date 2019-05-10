import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from './../../../actions';
import nr from './../../../assets/img/nr.svg';
import error from './../../../assets/img/error-icon.svg';
import { utils } from '../../../utils';

import {
  Button,
  InputPassword
} from '../../elements';
import { Icon } from '../../elements/utils';

import {
  MnForm,
  WarningText,
  WarningTooltip,
  MnTitle,
  MnWrapperTextArea,
  MnTextArea,
  MnPasswordError,
  MnBtnFoolter,
  MnLinkCreateNew
} from './Styled';

class ByMnemonic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: "",
      password: "",
      loading: false,
      isPasswordValid: false
    }
  };

  _unlock = (e) => {
    e.preventDefault();
    document.activeElement.blur();
    var { mnemonic, isPasswordValid, password } = this.state;
    if (isPasswordValid) {
      if (mnemonic) {
        this.setState({
          loading: true
        });
        try {
          var resp = utils.recoverAccountFromMneomnic(mnemonic);
          var privateKey = resp.privateKey;
          var address = resp.address;
          // e.useDefaultSigningDelegate();
          console.log('privateKey', privateKey);
          this.props.unlock(privateKey, address, "", password);
        } catch (e) {
          this.setState({
            errMsg: e.message,
            loading: false
          })
        }
      } else
        this.setState({
          errMsg: "mnemonic is invalid"
        })
    }
  };

  _mnemonicChange = (e) => {
    this.setState({
      mnemonic: e.currentTarget.value.trim()
    })
  };

  _passwordChange = (value, isPasswordValid) => {
    this.setState({
      password: value,
      isPasswordValid: isPasswordValid
    });
  };

  _gotoCreate = () => {
    this.props.history.push("/create");
  }

  render() {
    var { errMsg, isPasswordValid, loading, mnemonic } = this.state;
    return (
      <div>
        <MnForm onSubmit={e => this._unlock(e)} >
          <WarningText>
            <span>This option restores a lost keystore file or password,<br />or imports a seed from another wallet app.</span>
            <WarningTooltip>
              <img src={nr} />
              <div className="tips">
                Warning! Entering your seed phrase or private key on any website is very dangerous. If you have malicious extensions installed in your browser or accidentally visit a phishing website, your assets can be stolen.
              </div>
            </WarningTooltip>
          </WarningText>
          <MnTitle>Please enter your 24 word phrase</MnTitle>
          <MnWrapperTextArea>
            <MnTextArea
              onChange={this._mnemonicChange}
              data-cy={"unlock-mnemonic-content"}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-gramm={false}
            />
            <p className="mneomnic-sep">Please separate each word with a space.</p>
          </MnWrapperTextArea>
          <InputPassword onChange={this._passwordChange} title="Temporary session password" />
          {
            errMsg &&
            <MnPasswordError>
              <img src={error} />
              <span>{errMsg}</span>
            </MnPasswordError>
          }
          <MnBtnFoolter>
            <MnLinkCreateNew className="create-link" onClick={this._gotoCreate}>Create a New Wallet</MnLinkCreateNew>
            <Button
              type="submit"
              disabled={!isPasswordValid && mnemonic}
              loading={loading}
              width="170px"
              className="unlock"
            >
              <span style={{ marginRight: "10px" }}>Unlock Wallet Now</span>
              <Icon type="continue" size="20" color="inherit" />
            </Button>
          </MnBtnFoolter>
        </MnForm>
      </div>
    );
  }
}

ByMnemonic.defaultProps = {
  unlock: function() {},
  history: {},
};

export default withRouter(ByMnemonic);


