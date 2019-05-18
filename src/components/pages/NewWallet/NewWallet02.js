import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../../store/actions/create';
import { Button } from '../../elements';
import { Header2, DivContentW2, DivControlBtn, DivPreviousBt, Icon } from '../../elements/utils';

class NewWallet02 extends PureComponent {
  static defaultProps = {
    dispatch: function() {}
  };

  _continue = () => {
    this.props.dispatch(actions.setStep('backupMnemonic'));
  };

  _goback = () => {
    this.props.dispatch(actions.setStep('inputPassword'));
  };

  render() {
    var isActive = 'active';
    return (
      <div>
        <Header2>
          <span className="page">2</span>
          <span className="page totalPage">/2</span>
          <span className="title">Create Keystore File + Password</span>
        </Header2>
        <DivContentW2>
          <div className="shield">
            <i className="fa fa-shield" />
            <i className="fa fa-desktop" />
          </div>
          <div className="text">
            We are about to show your mnemonic phrase, please ensure that no one else is looking at
            your screen.
          </div>
        </DivContentW2>
        <DivControlBtn>
          <DivPreviousBt className="previous-button">
            <Icon type="back" size="20" color="inherit" />
            <div className="unlock" onClick={() => this._goback()}>
              Previous
            </div>
          </DivPreviousBt>
          <Button width={'120px'} onClick={() => this._continue()} className={isActive}>
            <React.Fragment>
              <span style={{ marginRight: '10px' }}>Continue</span>
              <Icon type="continue" size="20" color="inherit" />
            </React.Fragment>
          </Button>
        </DivControlBtn>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(NewWallet02);
