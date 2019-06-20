import React, { PureComponent } from 'react';
import { codec } from '@iceteachain/common';
// import Styled from 'styled-components';
import { connect } from 'react-redux';
import notifi from '../../elements/Notification';
import tweb3 from '../../../service/tweb3';
import { toTEA } from '../../../utils/utils';
import * as actions from '../../../store/actions/account';

import { H2, TabWrapper, MediaContent, TapWrapperContent, WrapperButton, Button } from './Styled';

class General extends PureComponent {
  registerFaucetEvent = () => {
    const { address, privateKey } = this.props;
    const { setNeedAuth } = this.props;

    if (!privateKey) {
      setNeedAuth(true);
    } else {
      console.log('faucet address: ', address, '-', privateKey);
      tweb3
        .contract('system.faucet')
        .methods.request(/* address */)
        .sendCommit({ from: address })
        .then(async r => {
          notifi.info(`Faucet Success: ${toTEA(r.returnValue)} TEA`);
          console.log('r', r.returnValue);

          const { childKey, setAccount } = this.props;
          const childKeyTmp = [];
          for (let i = 0; i < childKey.length; i += 1) {
            const newChild = Object.assign({}, childKey[i]);
            const { balance } = await tweb3.getBalance(newChild.address);
            newChild.balance = balance;
            childKeyTmp.push(newChild);
          }
          setAccount({ childKey: childKeyTmp });
        })
        .catch(error => {
          console.log(error);
          notifi.warn(String(error));
        });
    }
  };

  render() {
    const { address, balance } = this.props;

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
              <p> {toTEA(balance)} TEA</p>
            </div>

            <WrapperButton>
              <Button width="170px" className="get-tea" onClick={this.registerFaucetEvent}>
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
    childKey: account.childKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNeedAuth: data => {
      dispatch(actions.setNeedAuth(data));
    },
    setBalanceChildKey: data => {
      dispatch(actions.setBalanceChildKey(data));
    },
    setAccount: data => {
      dispatch(actions.setAccount(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
