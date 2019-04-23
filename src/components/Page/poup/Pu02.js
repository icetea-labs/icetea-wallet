import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions'
// css
import './Pu02.css'
// image
import pencil from './../../../assets/img/pencil.svg' // relative path to image

class Pu02 extends Component {

  continueClick() {
    this.props.onChangeForm('04');
    this.closeClick()
  }

  closeClick() {
    this.props.onChangePopup('');
  }

  render() {
    return (
      <div className="sc-jnlKLf kSGfGW">
        <div>
          <div className="sc-fYxtnH fahGvB">
            <div className="sc-tilXH hwrzfW">
              <div className="sc-lhVmIH citrzn">
                <img src={pencil} alt={"pencil"} />
                <p>Are you sure you have noted down your Mnemonic Phrase?</p>
              </div>
            </div>
            <div className="sc-hEsumM eHHijM">
              <button className="sc-bZQynM sc-cIShpX bjjIUH" onClick={() => this.closeClick()} ><span>Go Back</span></button>
              <button className="sc-bZQynM sc-ktHwxA fQzySy" onClick={() => this.continueClick()} ><span>Yes</span></button>
            </div>
            <div className="sc-kafWEX hLfPmZ">
              {/* <i className="iconfont icon-close sc-dnqmqq dJRkzW" size="18" color=""></i> */}
              <i className="fa fa-times dJRkzW" aria-hidden="true" onClick={() => this.closeClick()} ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formNo: state.formNo,
    puNo: state.puNo
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

export default connect(mapStateToProps, mapDispatchToProps)(Pu02);