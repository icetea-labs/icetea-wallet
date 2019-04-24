import React from "react"
import { connect } from 'react-redux';
import * as actions from '../../actions'
import styled from 'styled-components'
// Import custom component
import { Button } from './../elements'
// Style component
import {
  DivBox2, Header1, Header2,
  DivContentW2, InputConfirmPass, DivControlBtn,
  DivUnlockLink, DivFooter, DivValidPass, DivPreviousBt
} from './../elements/utils'

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

class NewWallet03 extends React.Component {
  constructor(props) {
    super(props);
  }

  continueClick = () => {
      // Change form no
      // this.props.onChangeForm('04');
      this.props.onChangePopup('02');
  }

  viewPrivate = () => {
    window.alert("Private key: " + this.props.wallet.privateKey)
  }
  previousClick = ()=> {
    this.props.onChangeForm('02');
  }

  render() {
    var isActive ='active';
    return (
      <DivBox2>
        <div>
          <Header1>Create New Wallet</Header1>
        </div>
        <div>
          <Header2>
            <span className="page" >2</span>
            <span className="page totalPage">/2</span>
            <span className="title" >Choose Secondary Access</span>
          </Header2>
          <DivTextNote>
            <i className="fa fa-pencil-square-o"></i>
            <span>Back up the text below on paper and keep it somewhere secret and safe.</span>
          </DivTextNote>
          <DivShowMnemonic>
            <p data-cy="mnemonic">{ this.props.wallet.mnemonic }</p>
          </DivShowMnemonic>
          <DivShowPrivate>
            <div onClick={() => this.viewPrivate()} >View my Private Key &gt;&gt;</div>
          </DivShowPrivate>

          <DivControlBtn>
            <DivPreviousBt className="previousBt" >               
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              <div className="unlock" onClick={() => this.previousClick()} >Previous</div>
            </DivPreviousBt>
            <Button
              width={'120px'}
              onClick={() => this.continueClick()}
              className={isActive}>
              <div>
                <span style={{ 'marginRight': '10px' }} >Continue</span>
                <i className="fa fa-long-arrow-right"></i>
              </div>
            </Button>
          </DivControlBtn>
        </div>
      </DivBox2>
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
    onSaveWallet: (data) => {
      dispatch(actions.saveWallet(data))
    },
    onChangeForm: (step) => {
      dispatch(actions.setStep(step))
    },
    onChangePopup: (puNo) => {
      dispatch(actions.changePopup(puNo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWallet03);
// export default NewWallet; mapStateToProps