import React from "react"
// import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import './NewWallet03.css'

class NewWallet03 extends React.Component {
  constructor(props) {
    super(props);
    this.continueClick = this.continueClick.bind(this);
    this.previousClick = this.previousClick.bind(this);
    this.viewPrivate = this.viewPrivate.bind(this);
    
  }

  continueClick() {
      // Change form no
      // this.props.onChangeForm('04');
      this.props.onChangePopup('02');
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
          <div className="header1">Create New Wallet</div>
        </div>
        <div>
          <div className='header2' >
            <span className="page" >2</span>
            <span className="page totalPage">/2</span>
            <span className="title" >Choose Secondary Access</span>
          </div>
          <div className="textNote">
            <i className="fa fa-pencil-square-o"></i>
            <span>Back up the text below on paper and keep it somewhere secret and safe.</span>
          </div>
          <div className="showMnemonic">
            <p data-cy="mnemonic">{ this.props.wallet.mnemonic }</p>
          </div>
          <div className="showPrivate">
            <div onClick={() => this.viewPrivate()} >View my Private Key &gt;&gt;</div>
          </div>
          <div className="btControlArea">
            <div className="previousBt">
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              <div className="unlock" onClick={() => this.previousClick()} >Previous</div>
            </div>
            <button onClick={() => this.continueClick()} className='continueBt height mini'>
              <div>
                <span>Continue</span>
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
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
    },
    onChangePopup: (puNo) => {
      dispatch(actions.changePopup(puNo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWallet03);
// export default NewWallet; mapStateToProps