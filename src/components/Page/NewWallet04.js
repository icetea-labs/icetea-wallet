import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import './NewWallet03.css'

class NewWallet04 extends React.Component {
  constructor(props) {
    super(props);
    this.continueClick = this.continueClick.bind(this);
    this.previousClick = this.previousClick.bind(this);
    this.viewPrivate = this.viewPrivate.bind(this);
    
  }

  continueClick() {
      // Change form no
      this.props.onChangeForm('03');
  }

  viewPrivate() {
    window.alert("Private key: " + this.props.wallet.privateKey)
  }
  previousClick() {
    this.props.onChangeForm('02');
  }

  render() {
    return (
      <div className="box2" >
        <div>
          <h3 className='text-center'>Create New Wallet</h3>
        </div>
        <div>
          <div className='header2' >
            <span className="page" >2</span>
            <span className="page totalPage">/2</span>
            <span className="title" >Choose Secondary Access</span>
          </div>
          <div className="sc-jAaTju fnWXYz">
            <span>Back up the text below on paper and keep it somewhere secret and safe.</span>
          </div>
          <div className="sc-jDwBTQ dUwgbJ">
            <p data-cy="mnemonic">{ this.props.wallet.mnemonic }</p>
          </div>
          <div className="sc-gPEVay iYjXjI">
            <a rel="noopener" onClick={() => this.viewPrivate()} >View my Private Key</a>&nbsp;<span>&gt;&gt;</span>
          </div>
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
    wallet: state.wallet
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

export default connect(mapStateToProps, mapDispatchToProps)(NewWallet04);
// export default NewWallet; mapStateToProps