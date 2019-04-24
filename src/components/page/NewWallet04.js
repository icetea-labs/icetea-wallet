import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
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

const DivH3 = styled.div`
  text-align: left;
  font-size: 16px;
  display: flex;
  font-weight: 500;
  margin: 20px 0px;
`;
const DivPicMnemonic = styled.div`
  position: relative;
  min-height: 100px;
  background: rgb(249, 249, 249);
  border-width: 1px;
  border-style: dashed;
  border-image: initial;
  border-color: rgb(223, 226, 231);
  padding: 10px;
  overflow: hidden;
  &.default {
    border-color: rgb(223, 226, 231);
  }
  &.invalid {
    border-color: rgb(242, 48, 81);
  }
  & .mnemonicItem {
    display: flex;
    flex-wrap: wrap;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 6px 0px;
    font-size: 14px;
    max-height: 27px;
    color: rgb(33, 40, 51);
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: 600;
    float: left;
    padding: 3px 8px;
    background: rgb(255, 255, 255);
    margin: 5px;
    &:hover {
      color: rgb(255, 255, 255);
      background: rgb(240, 185, 11);
    }
  }
  & .removeMnemoItem {
    margin-left: 5px;
    margin-bottom: 2px;
  }
`;
const DivMnemonic = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: -5px;
  & .mnemonicItem {
    display: flex;
    flex-wrap: wrap;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 6px 0px;
    font-size: 14px;
    max-height: 27px;
    color: rgb(33, 40, 51);
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: 600;
    float: left;
    padding: 3px 8px;
    background: rgb(255, 255, 255);
    margin: 5px;
    &:hover {
      color: rgb(255, 255, 255);
      background: rgb(240, 185, 11);
    }
  }
`;
const DivIncorrectMnemonic  = styled.div`
  font-size: 12px;
  color: rgb(242, 48, 81);
  line-height: 13px;
`;

class NewWallet04 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPicMnemonicValid: true,
      renderMnemonic: [],
      confirmMnemonic: []
    }
  }

  componentWillMount() {
    var { renderMnemonic } = this.state;
    if (!renderMnemonic.length) {
      renderMnemonic = this.props.wallet.mnemonic.split(' ');
      // update state
      this.setState({
        renderMnemonic,
      });
    }
  }

  continueClick = ()=> {
    // Change form no
    // this.props.onChangeForm('03');
    this.props.history.push("/Home");
  }

  viewPrivate = () => {
    window.alert("Private key: " + this.props.wallet.privateKey)
  }
  previousClick = () => {
    this.props.onChangeForm('03');
  }

  picMnemonic = (index) => {
    console.log(index)
    this.state.confirmMnemonic.push(this.state.renderMnemonic[index])
    this.state.renderMnemonic.splice(index,1);
    this.setState(this.state);
    this.validatePicMnemonic();
  }

  removeMnemonic = (index) => {
    console.log(index)
    this.state.renderMnemonic.push(this.state.confirmMnemonic[index])
    this.state.confirmMnemonic.splice(index,1);
    this.setState(this.state);
    this.validatePicMnemonic();
  }

  validatePicMnemonic = () => {
    var {confirmMnemonic, isPicMnemonicValid} = this.state;
    isPicMnemonicValid = true;
    for(var i = 0; i < confirmMnemonic.length; i++) {
      if(confirmMnemonic[i] === this.props.wallet.mnemonic.split(' ')[i]){
        isPicMnemonicValid = true;
      } else {
        isPicMnemonicValid = false;
        break;
      }
    }
    this.setState({isPicMnemonicValid});
  }

  render() {
    var isActive ='active';
    return (
      <DivBox2 >
        <div>
          <Header1>Create New Wallet</Header1>
        </div>
        <div>
          <Header2>
            <span className="page" >2</span>
            <span className="page totalPage">/2</span>
            <span className="title" >Choose Secondary Access</span>
          </Header2>
          <DivH3>
            <span>Please select the Mnemonic Phrase in the correct order to ensure that your copy is correct.</span>
          </DivH3>
          <DivPicMnemonic className= {this.state.isPicMnemonicValid ? 'default':'invalid'}>
            { this.state.confirmMnemonic.map((items,index)=>{
              return(
                <div className="mnemonicItem" key={index} >{items}
                <div className="removeMnemoItem" onClick={() => this.removeMnemonic(index)}  >
                  <i className="fa fa-times" size="10" color=""></i>
                </div>
              </div>
              )})
            }
          </DivPicMnemonic>
          { this.state.isPicMnemonicValid ? '' : <DivIncorrectMnemonic>Incorrect Mnemonic Phrase order. Please try again.</DivIncorrectMnemonic> }
          <DivMnemonic>
            { this.state.renderMnemonic.map((items,index)=>{
              return(
                <div className="mnemonicItem" key={index} onClick={() => this.picMnemonic(index)} >{items}</div>
              )})
            }
          </DivMnemonic>
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
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewWallet04))
// export default connect(mapStateToProps, mapDispatchToProps)(NewWallet04);
// export default NewWallet; mapStateToProps

