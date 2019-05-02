import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions'

// Import custom component
import { Button } from './../elements'
// Style component
import {
  DivBox2, Header1, Header2,
  DivContentW2, DivControlBtn, DivPreviousBt
} from './../elements/utils'

class NewWallet02 extends React.Component {

  continueClick = ()=> {
    // Change form no
    this.props.onChangeForm('03');
    // save to state
    // var wallet = {
    //   mnemonic: "outdoor special balance estate eager siege ghost eight baby ancient mandate index",
    //   privateKey: "5wGNDfgSX6rt7LYT41vsjHLVxLDLVtMGtuttroWFiEK6"
    // }
    // this.props.onSaveWallet(wallet);
  }

  previousClick = () => {
    this.props.onChangeForm('01');
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
            <span className="title" >Create Keystore File + Password</span>
          </Header2>
          <DivContentW2>
            <div className="shield" >
              <i className="fa fa-shield"></i>
              <i className="fa fa-desktop"></i>
            </div>
            <div className="text">We are about to show your mnemonic phrase, please ensure that no one else is looking at your screen.</div>
          </DivContentW2>
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
    name: state.Name
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

export default connect(mapStateToProps, mapDispatchToProps)(NewWallet02);
// export default NewWallet; mapStateToProps