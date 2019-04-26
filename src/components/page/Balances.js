import React, { Component } from 'react';
import './Balances.css';
import Transaction from './Transaction';
import tweb3 from './../../service/tweb3';
import QRCode from 'qrcode.react'

class Balances extends Component {

  constructor() {
    super();
    this.state = {
      showSendForm: false,
      showTbl: [],
    }
  }
  componentDidMount() {
    this.renderTbl();
    console.log('state', this.state)
  }

  viewSendForm = () => {
    this.setState({ showSendForm: true });
  }

  closeViewForm = () => {
    this.setState({
      showSendForm: !this.state.showSendForm
    });

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
              <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0</span></div>
            </td>
            <td style={{ width: '10%' }}>
              <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0</span></div>
            </td>
            <td style={{ width: '10%' }}>
              <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0.0</span></div>
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
    return (
      <div className="sc-lnrBVv kvEeOF">
        <div className="sc-kIWQTW jfuazO">
          <div className="sc-hMjcWo jvYfux">
            <div className="sc-gCwZxT iWYAnd">
              <div><span>Balances</span><span className="text-address"><i className="copyText">tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx</i></span>
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
                <div className="sc-fATqzn cNStFF">
                  <i className="fa fa-clone" aria-hidden="true" size="18"></i>
                </div>
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
                      <th>Frozen</th>
                      <th>In Order</th>
                      <th>BTC Value</th>
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
          {this.state.showSendForm ? <Transaction closePoup={() => this.closeViewForm()} onSendSuccess={() => this.renderTbl()} /> : ''}
        </div>
      </div>
    );
  }
}

export default Balances;