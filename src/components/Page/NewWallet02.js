import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import './NewWallet02.css'

class NewWallet02 extends React.Component {
  constructor(props) {
    super(props);
    this.continueClick = this.continueClick.bind(this);
    this.previousClick = this.previousClick.bind(this);
  }

  continueClick() {
      // Change form no
      this.props.onChangeForm('03');
    // save to state
    var wallet = {
      mnemonic: "outdoor special balance estate eager siege ghost eight baby ancient mandate index",
      privateKey: "5wGNDfgSX6rt7LYT41vsjHLVxLDLVtMGtuttroWFiEK6"
    }
    this.props.onSaveWallet(wallet);
  }

  previousClick() {
    this.props.onChangeForm('01');
  }

  render() {
    return (
      <div className="box2" >
        <div>
          <div className="header1">Create New Wallet</div>
        </div>
        <div>
          <div className='header2' >
            <span className="page" >2</span>
            <span className="page totalPage">/2</span>
            <span className="title" >Create Keystore File + Password</span>
          </div>
          <div className="textContent">
            <div className="shield" >
              <i className="fa fa-shield"></i>
              <i className="fa fa-desktop"></i>
            </div>
            <div className="text">We are about to show your mnemonic phrase, please ensure that no one else is looking at your screen.</div>
          </div>
          <div className="downloadkey">
            <div className="previousBt"  >
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              <div className="unlock" onClick={() => this.previousClick()} >Previous</div>
            </div>
            <button width="200px" className="continueBt" onClick={() => this.continueClick()}>
              <span>Continue</span>
              <i className="iconfont icon-continue icon" size="20" color="inherit"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveWallet: (data) => {
      dispatch(actions.saveWallet(data))
    },
    onChangeForm: (formNo) => {
      dispatch(actions.changeForm(formNo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWallet02);
// export default NewWallet; mapStateToProps