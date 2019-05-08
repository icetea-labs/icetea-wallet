import React from "react";
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import { Button } from '../../elements';
import {
  Header2, 
  DivControlBtn,
   DivPreviousBt, Icon
} from '../../elements/utils';

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
const DivIncorrectMnemonic = styled.div`
  font-size: 12px;
  color: rgb(242, 48, 81);
  line-height: 13px;
`;

class NewWallet04 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWords: [],
      shuffledWords: [],
      isSequenceCorrect: true,
    }
  }

  componentDidMount() {
    document.scrollingElement.scrollTop = 1e3;
    var items = this._getRandomSequenceMenmonic();
    this.setState({
      shuffledWords: items
    })
  };
  
  _goback = () => {
    this.props.setStep('backupMnemonic');
  };

  _shuffle = (mnemonic) => {
    for (var i = mnemonic.length; i > 0;) {
      var ran = Math.floor(Math.random() * i)
        , item = mnemonic[--i];
      mnemonic[i] = mnemonic[ran];
      mnemonic[ran] = item;
    }
    return mnemonic
  };

  _getRandomSequenceMenmonic = () => {
    var mnemonic = this.props.mnemonic.split(" ");
    return this._shuffle(mnemonic);
  };

  _selectWord = (e) => {
    var { selectedWords, shuffledWords } = this.state;
    selectedWords.push(e);
    for (var i = 0, len = shuffledWords.length; i < len; i++)
      if (shuffledWords[i] === e) {
        shuffledWords.splice(i, 1);
        break
      }
    this.forceUpdate();
    this._compareSequence();
  };

  _compareSequence = () => {
    var selectItem = this.state.selectedWords
      , mnemonic = this.props.mnemonic.split(" ");
    this.setState({
      isSequenceCorrect: true//_.isEqual(mnemonic.slice(0, selectItem.length), selectItem)
    })
  };

  _recoverWord = (e) => {
    var { selectedWords, shuffledWords } = this.state;
    shuffledWords.push(e);
    for (var i = 0, len = selectedWords.length; i < len; i++)
      if (selectedWords[i] === e) {
        selectedWords.splice(i, 1);
        break
      }
    this.forceUpdate();
    this._compareSequence();
  };

  _continue = () => {
    this.props.setStep('success');
  };

  render() {
    var { shuffledWords, selectedWords, isSequenceCorrect } = this.state;
    return (
      <div>
        <Header2>
          <span className="page" >2</span>
          <span className="page totalPage">/2</span>
          <span className="title" >Choose Secondary Access</span>
        </Header2>
        <DivH3>
          <span>Please select the Mnemonic Phrase in the correct order to ensure that your copy is correct.</span>
        </DivH3>
        <DivPicMnemonic className={isSequenceCorrect ? 'default' : 'invalid'}>
          {selectedWords.map((items, index) => {
            return (
              <div className="mnemonicItem" key={index} >{items}
                <div className="removeMnemoItem" onClick={() => this._recoverWord(items)}  >
                  <Icon type="close" size="10" color=""></Icon>
                </div>
              </div>
            )
          })
          }
        </DivPicMnemonic>
        {isSequenceCorrect ? '' : <DivIncorrectMnemonic>Incorrect Mnemonic Phrase order. Please try again.</DivIncorrectMnemonic>}
        <DivMnemonic>
          {shuffledWords.map((items, index) => {
            return (
              <div className="mnemonicItem" key={index} onClick={() => this._selectWord(items)} >{items}</div>
            )
          })
          }
        </DivMnemonic>
        <DivControlBtn>
          <DivPreviousBt className="previous-button" >
            <Icon type="back" size="20" color="inherit"></Icon>
            <div className="unlock" onClick={this._goback} >Previous</div>
          </DivPreviousBt>
          <Button
            disabled={!isSequenceCorrect || 0 !== shuffledWords.length }
            width={'120px'}
            onClick={this._continue}
            >
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

const mapStateToProps = state => {
  return {
    mnemonic: state.create.mnemonic
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (step) => {
      dispatch(actions.setStep(step))
    },
  }
}

NewWallet04.defaultProps = {
  mnemonic: "",
  setStep: function () { },
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewWallet04));

