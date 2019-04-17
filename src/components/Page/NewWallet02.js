import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions'

class NewWallet02 extends React.Component {
  constructor(props) {
    super(props);
    this.continueClick = this.continueClick.bind(this);
    this.previousClick = this.previousClick.bind(this);
  }

  continueClick() {
      // Change form no
      this.props.onChangeForm('03');
  }

  previousClick() {
    this.props.onChangeForm('01');
  }

  render() {
    return (
      <div className="box2" >
        <div>
          <h3 className='text-center'>Create New Wallet</h3>
          <p>{this.props.name}</p>
        </div>
        <div>
          <div className='header2' >
            <span className="page" >1</span>
            <span className="page totalPage">/2</span>
            <span className="title" >Create Keystore File + Password</span>
          </div>
          <div className="text">We are about to show your mnemonic phrase, please ensure that no one else is looking at your screen.</div>
          <div className="downloadkey">
            <div className="unlock" onClick={() => this.previousClick()} >Previous</div>
            <button width="200px" className="btUnlock" onClick={() => this.continueClick()}>
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
    name: state.Name
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