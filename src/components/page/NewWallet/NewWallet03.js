import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components'
import * as actions from '../../../actions'
import { Button } from '../../elements'
import {
  Header2, 
  DivControlBtn, 
  DivPreviousBt, Icon
} from '../../elements/utils'

const DivTextNote = styled.div`
  text-align: left;
  font-size: 16px;
  display: flex;
  margin: 20px 0px;
  & i {
    margin-top: 5px;
    margin-right: 15px;
    font-size: 20px;
  }
`;
const DivShowMnemonic = styled.div`
  text-align: center;
  position: relative;
  background: rgb(249, 249, 249);
  border-width: 1px;
  border-style: dashed;
  border-color: rgb(216, 216, 216);
  border-image: initial;
  padding: 20px;
  & p {
    line-height: 25px;
    font-size: 18px;
    word-spacing: 6px;
    font-family: DIN;
    font-weight: 900;
  }
`;

const DivShowPrivate = styled.div`
  text-align: right;
  cursor: pointer;
  color: rgb(72, 81, 93);
  padding: 10px 0px;
`;

class NewWallet03 extends PureComponent {

  _showPrivatekey = () => {
    this.props.setShowPrivateKey(true);
  }
  _goback = () => {
    this.props.setStep('stepTwo');
  }
  _show = () => {
    this.props.setConfirmMnemonic(true);
  }
  render() {
    var isActive = 'active';
    return (
      <div>
        <Header2>
          <span className="page" >2</span>
          <span className="page totalPage">/2</span>
          <span className="title" >Choose Secondary Access</span>
        </Header2>
        <DivTextNote>
          <Icon type="pencil" size="20" color="inherit"></Icon>
          <span>Back up the text below on paper and keep it somewhere secret and safe.</span>
        </DivTextNote>
        <DivShowMnemonic>
          <p data-cy="mnemonic">{this.props.mnemonic}</p>
        </DivShowMnemonic>
        <DivShowPrivate>
          <div onClick={() => this._showPrivatekey()} >View my Private Key &gt;&gt;</div>
        </DivShowPrivate>

        <DivControlBtn>
          <DivPreviousBt className="previous-button" >
            <Icon type="back" size="20" color="inherit"></Icon>
            <div className="unlock" onClick={() => this._goback()} >Previous</div>
          </DivPreviousBt>
          <Button
            width={'120px'}
            onClick={() => this._show()}
            className={isActive}>
            <React.Fragment>
              <span style={{ 'marginRight': '10px' }} >Continue</span>
              <Icon type="continue" size="20" color="inherit"></Icon>
            </React.Fragment>
          </Button>
        </DivControlBtn>
      </div>
    );
  }
}

NewWallet03.defaultProps = {
  mnemonic: "",
  privateKey: "",
  setStep: function () { },
  setShowPrivateKey: function () { },
  setConfirmMnemonic: function () { }
}

const mapStateToProps = state => {
  return {
    mnemonic: state.create.mnemonic,
    privateKey: state.create.privateKey
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (step) => {
      dispatch(actions.setStep(step))
    },
    setShowPrivateKey: (value) => {
      dispatch(actions.setShowPrivateKey(value))
    },
    setConfirmMnemonic: (value) => {
      dispatch(actions.setConfirmMnemonic(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewWallet03));