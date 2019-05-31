import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import nr from '../../../assets/img/nr.svg';
import error from '../../../assets/img/error-icon.svg';
import { utils } from '../../../utils';
import { Button, InputPassword } from '../../elements';
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
  MnLinkCreateNew,
} from './styled';

class ByMnemonic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: '',
      password: '',
      loading: false,
      isPasswordValid: false,
    };
  }

  _unlock = event => {
    event.preventDefault();
    document.activeElement.blur();
    const { props } = this;
    const { mnemonic, isPasswordValid, password } = this.state;

    if (isPasswordValid) {
      if (mnemonic) {
        this.setState({
          loading: true,
        });
        try {
          const resp = utils.recoverAccountFromMneomnic(mnemonic);
          const { privateKey, address } = resp;

          // e.useDefaultSigningDelegate();
          // console.log('privateKey', privateKey);
          props.unlock(privateKey, address, '', password, mnemonic);
        } catch (err) {
          this.setState({
            errMsg: err.message,
            loading: false,
          });
        }
      } else {
        this.setState({
          errMsg: 'mnemonic is invalid',
        });
      }
    }
  };

  _mnemonicChange = e => {
    this.setState({
      mnemonic: e.currentTarget.value.trim(),
    });
  };

  _passwordChange = (value, isPasswordValid) => {
    this.setState({
      password: value,
      isPasswordValid,
    });
  };

  _gotoCreate = () => {
    const { props } = this;
    props.history.push('/create');
  };

  render() {
    const { errMsg, isPasswordValid, loading, mnemonic } = this.state;
    return (
      <div>
        <MnForm onSubmit={e => this._unlock(e)}>
          <WarningText>
            <span>
              This option restores a lost keystore file or password,
              <br />
              or imports a seed from another wallet app.
            </span>
            <WarningTooltip>
              <img src={nr} alt="" />
              <div className="tips">
                Warning! Entering your seed phrase or private key on any website is very dangerous. If you have
                malicious extensions installed in your browser or accidentally visit a phishing website, your assets can
                be stolen.
              </div>
            </WarningTooltip>
          </WarningText>
          <MnTitle>Please enter your 12 word phrase</MnTitle>
          <MnWrapperTextArea>
            <MnTextArea
              onChange={this._mnemonicChange}
              data-cy="unlock-mnemonic-content"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-gramm={false}
            />
            <p className="mneomnic-sep">Please separate each word with a space.</p>
          </MnWrapperTextArea>
          <InputPassword onChange={this._passwordChange} title="Temporary session password" />
          {errMsg && (
            <MnPasswordError>
              <img src={error} alt="" />
              <span>{errMsg}</span>
            </MnPasswordError>
          )}
          <MnBtnFoolter>
            <MnLinkCreateNew className="create-link" onClick={this._gotoCreate}>
              Create a New Wallet
            </MnLinkCreateNew>
            <Button
              type="submit"
              // disabled={!isPasswordValid && mnemonic}
              loading={loading}
              width="170px"
              className="unlock"
            >
              <span style={{ marginRight: '10px' }}>Unlock Wallet Now</span>
              <Icon type="continue" size="20" color="inherit" />
            </Button>
          </MnBtnFoolter>
        </MnForm>
      </div>
    );
  }
}

ByMnemonic.defaultProps = {
  unlock() {},
  history: {},
};

export default withRouter(ByMnemonic);
