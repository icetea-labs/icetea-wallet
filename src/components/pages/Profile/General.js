import React, { PureComponent } from 'react';
import { codec } from '@iceteachain/common';
// import Styled from 'styled-components';
import { connect } from 'react-redux';
import notifi from '../../elements/Notification';
import tweb3 from '../../../service/tweb3';
import * as actions from '../../../store/actions/account';

import { H2, TabWrapper, MediaContent, TapWrapperContent, WrapperButton, Button } from './Styled';

class General extends PureComponent {
  registerFaucetEvent = () => {
    const { address, privateKey } = this.props;
    const { setNeedAuth } = this.props;

    if (!privateKey) {
      setNeedAuth(true);
    } else {
      console.log('faucet address: ', address);
      tweb3
        .contract('system.faucet')
        .methods.request(/* address */)
        .sendCommit({ from: address })
        .then(() => {
          notifi.info('Success');
        })
        .catch(error => {
          window.alert(String(error));
          notifi.warn('You already received 100000000 microtea. No more.');
        });
    }
  };

  render() {
    const { address, balance } = this.props;
    console.log('address', address, codec.isBankAddress(address));

    return (
      <TabWrapper>
        <MediaContent>
          <H2>Information</H2>
          <TapWrapperContent>
            <div className="row">
              <p className="header">Type:</p>
              <p> {codec.isBankAddress(address) ? 'Bank account' : 'Regular account'}</p>
            </div>
            <div className="row">
              <p className="header">Balance:</p>
              <p> {balance} TEA</p>
            </div>

            <WrapperButton>
              <Button className="get-tea" onClick={this.registerFaucetEvent}>
                <span>Get TEA from Faucet</span>
              </Button>
            </WrapperButton>
          </TapWrapperContent>
        </MediaContent>
      </TabWrapper>
    );
  }
}

General.defaultProps = {
  address: '',
  balance: 0,
};

const mapStateToProps = state => {
  const { account } = state;
  return {
    privateKey: account.privateKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNeedAuth: data => {
      dispatch(actions.setNeedAuth(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
