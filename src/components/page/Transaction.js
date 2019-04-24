import React, { Component } from 'react';
import './Transaction.css'

class Transaction extends Component {
  render() {
    return (
      <div>
        <h1>Transaction</h1>
        <div className="transContents">
          <div className="addressContainer">
          <div>
            <span>Balances</span>
            <span className="text-address"></span>
          </div>
          </div>
          <div className="balanceContainer"></div>
          <div className="sendCurrency">
            <div className="content-title">
            <h2>Send Transaction </h2></div>
            <div className="send-form"></div>
            <div className="submit-button-container">
              <button className="submit-button">Send Transaction</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;