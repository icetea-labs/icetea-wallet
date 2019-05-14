import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as actions from '../../../reducers/create';
import { Button } from '../../elements';
import { Icon } from '../../elements/utils';
import success from './../../../assets/img/success.svg';

const WrapperImg = styled.div`
  margin-top:20px;
  img{
    width:50px;
    margin:0 auto;
    display:block;
    margin-bottom:15px;
  }
`;

const Title = styled.div`
  font-size:16px;
  font-weight:bold;
  font-family:DIN;
  text-align:center;
  span{
    color:#F23051;
  };
`;
const Desc = styled.ul`
  padding:0 30px;
  font-size:12px;
  margin-top:15px;
  li{
    text-align:center;
  };
`;
const FoolterBtn = styled.div`
  margin-top:40px;
  display:flex;
  flex-direction:row;
  justify-content:center;
`;

class NewWallet05 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWords: [],
      shuffledWords: [],
      isSequenceCorrect: true,
    }
  }

  _gotoUnlock = () => {
    this.props.setStep("inputPassword");
    this.props.history.push("/unlock");
  }

  render() {
    return (
      <div>
        <WrapperImg>
          <img src={success} />
          <Title>You're all set!</Title>
          <Desc><li>You are ready to use the Ice-Tea Wallet and</li></Desc>
          <Desc><li>Ice-Tea Chain!</li></Desc>
          <FoolterBtn>
            <Button
              width={'170px'}
              onClick={this._gotoUnlock}
            >
              <React.Fragment>
                <span style={{ 'marginRight': '10px' }} >Unlock the wallet</span>
                <Icon type="continue" size="20" color="inherit"></Icon>
              </React.Fragment>
            </Button>
          </FoolterBtn>
        </WrapperImg>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    keyStore: state.create.keyStore
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (step) => {
      dispatch(actions.setStep(step))
    },
  }
}

NewWallet05.defaultProps = {
  setStep: function () { },
  history: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewWallet05));

