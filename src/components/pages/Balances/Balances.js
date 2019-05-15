import React, { Component } from 'react';
import './Balances.css';
import SendTransaction from './SendTransaction'
import TransactionConfirm from './TransactionConfirm';
import tweb3 from '../../../service/tweb3';
import QRCode from 'qrcode.react'
import { connect } from 'react-redux';
import TransactionHistory from './../Transaction/TransactionHistory.js';
import CopyText from  './CopyText'

class Balances extends Component {

  constructor() {
    super();
    this.state = {
      showSendForm: false,
      showCFForm: false,
      showTbl: [],
      value: '',
    }
  }
  componentDidMount() {
    this.renderTbl();
    console.log('state', this.state);
    this.setState({ value: 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx' });
  }

  viewSendForm = () => {
    this.setState({ showSendForm: true, showCFForm: false });
  }

  closeViewForm = () => {
    this.setState({
      showSendForm: !this.state.showSendForm,
    });

  }

  closeCFForm = () => {
    this.setState({
      showCFForm: !this.state.showCFForm,
    });
  }

  onCallCFForm = () => {
    this.setState({ showSendForm: false, showCFForm: true });
  }
  
  renderTbl = async () => {
    try {
      var result = await tweb3.getBalance('tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx');
      console.log("I want to see balance:", result.balance)
      var tblTmp = [{
        name: 'ICETEA COIN',
        symbo: 'ICETEA',
        totalBalance: result.balance,
        availableBalance: result.balance
      }];
      this.setState({
        showTbl: tblTmp.map((data, index) => (
          <tr key={index}>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">{data.symbo}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">{data.name}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">{data.totalBalance}</span></div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">{data.availableBalance}</span></div>
            </td>
            <td style={{ width: '10%' }}>
              <div className="sc-hkaZBZ sc-hqGPoI feIRPa"><button
                className="sc-bZQynM sc-MYvYT sc-jbWsrJ ircCEl" onClick={this.viewSendForm}>Send</button></div>
            </td>
          </tr>
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className="sc-lnrBVv kvEeOF">
        <div className="sc-kIWQTW jfuazO">
          <div className="sc-hMjcWo jvYfux">
            <div className="sc-gCwZxT iWYAnd">
              <div><span>Balances</span>
                <span className="text-address">
                  <i id="copyText">{value}</i>
                </span>
              </div>
              <div className="sc-jDwBTQ cPxcHa">
                <div className="sc-fATqzn cNStFF">
                  <i className="fa fa-qrcode sc-dnqmqq dJRkzW" aria-hidden="true" size="18"></i>
                  <div className="qrCode">
                    <div size="174" className="qrcode-box sc-iSDuPN iulYhq">
                      <QRCode size={174} className="qrForm" value="tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx" />
                    </div>
                  </div>
                </div>
                <CopyText text={this.state.value} ></CopyText>
              </div>
            </div>
            <div>
              <div className="sc-hvvHee cOshIS">
                <table className="sc-fQejPQ sc-cPuPxo dcZana">
                  <thead className="sc-eSePXt byspTh">
                    <tr>
                      <th>Asset</th>
                      <th>Name</th>
                      <th>Total Balance</th>
                      <th>Available Balance</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="sc-fvLVrH gjcHsq">
                    {this.state.showTbl}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <SendTransaction></SendTransaction> */}
          {/* {this.state.showSendForm ? <Transaction closePoup={() => this.closeViewForm()} onCallCFForm={() => this.onCallCFForm()} /> : ''} */}
          {this.state.showSendForm ? <SendTransaction close={() => this.closeViewForm()} onSendSuccess={() => this.renderTbl()} /> : ''}
          {this.state.showCFForm ? <TransactionConfirm closePoup={() => this.closeCFForm()}
            onCallTransForm={() => this.viewSendForm()} onSendSuccess={() => this.renderTbl()} /> : ''}
        </div>
        <div><TransactionHistory></TransactionHistory></div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Balances);