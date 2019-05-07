import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NewWallet01 from './NewWallet01';
import NewWallet02 from './NewWallet02';
import NewWallet03 from './NewWallet03';
import NewWallet04 from './NewWallet04';
import Pu01 from './poup/Pu01';
import Pu02 from './poup/Pu02';
import Loading from './poup/Loading';

import { Header1 } from './../elements/utils'
import { PuShowPrivateKey } from './../elements'

const DivWallet = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  padding-bottom: 50px;
  justify-content: center;
`;
const DivLogo = styled.div`
  height: 80px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
  width: 80px;
  top: 10px;
`;
const DivBox1 = styled.div`
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const DivBox2 = styled.div`
  width: 100%;
  box-shadow: rgb(228, 228, 228) 0px 0px 10px;
  background: rgb(255, 255, 255);
  padding: 40px 54px;
  @media (max-width: 623px) and (min-width: 320px) {
    box-shadow: none;
    box-sizing: border-box;
    padding: 5px 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 624px) {
    width: 500px;
  }
`;

class NewWalletMaster extends PureComponent {
  static propTypes = {
    password: PropTypes.string,
    step: PropTypes.string,
    privateKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object]),
    keyStoreText: PropTypes.string,
    showPrivateKey: PropTypes.bool,
    confirmMnemonic: PropTypes.bool,
    showKeystoreText: PropTypes.bool,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    password: "",
    step: "",
    privateKey: "",
    keyStoreText: "",
    showPrivateKey: false,
    confirmMnemonic: false,
    showKeystoreText: false,
    dispatch: function() {},
    history:{},
    isLoading: false
  };

  render() {
    var {confirmMnemonic, showPrivateKey, step, isLoading} = this.props;
    // console.log('00-step', step);
    return (
      <div>
          <DivWallet>
          <DivLogo>
            <img src="https://trada.tech/assets/img/logo.svg" alt="log" />
          </DivLogo>
          <DivBox1>
            <DivBox2>
              <div>
                <Header1>Create New Wallet</Header1>
              </div>
              { "inputPassword"    === step && <NewWallet01/> }
              { "stepTwo"          === step && <NewWallet02/> }
              { "backupMnemonic"   === step && <NewWallet03/> }
              { "confirmMnemonic"  === step && <NewWallet04/> }
              { "success"          === step && <NewWallet04/> }
            </DivBox2>
          </DivBox1>
        </DivWallet>
        { isLoading && <Loading/> }
        { <PuShowPrivateKey/> }

        {/* { confirmMnemonic || true && <Pu01/> } */}
        { showPrivateKey && <Pu02/> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  var e = state.create;
  return {
    password: e.password,
    step: e.step,
    privateKey: e.privateKey,
    keyStoreText: e.keyStoreText,
    showPrivateKey: e.showPrivateKey,
    confirmMnemonic: e.confirmMnemonic,
    isLoading: state.globalData.isLoading,
  };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// }
export default connect(mapStateToProps, null)(withRouter(NewWalletMaster));