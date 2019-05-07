import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button } from './../elements';
// Style component
import {
  Header2, DivContentW2, DivControlBtn, DivPreviousBt, Icon
 } from './../elements/utils'

class NewWallet02 extends PureComponent {

  static defaultProps = {
    dispatch: function() {},
  };

  _continue = ()=> {
    this.props.dispatch(actions.setStep('backupMnemonic'));
    // save to state
    // var wallet = {
    //   mnemonic: "outdoor special balance estate eager siege ghost eight baby ancient mandate index",
    //   privateKey: "5wGNDfgSX6rt7LYT41vsjHLVxLDLVtMGtuttroWFiEK6"
    // }
    // this.props.onSaveWallet(wallet);
  }

  _goback = () => {
    this.props.dispatch(actions.setStep('inputPassword'));
  }

  render() {
    var isActive ='active';
    return (
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
              <div className="unlock" onClick={() => this._goback()} >Previous</div>
            </DivPreviousBt>
            <Button
              width={'120px'}
              onClick={() => this._continue()}
              className={isActive}>
                <span style={{ 'marginRight': '10px' }} >Continue</span>
                <Icon className="iconfont icon-continue" size="20" color="inherit"></Icon>
            </Button>
          </DivControlBtn>
        </div>
    );
  }
}

export default connect(null, null)(NewWallet02);