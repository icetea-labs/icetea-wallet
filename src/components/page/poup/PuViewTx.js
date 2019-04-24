import React, { Component } from 'react';
import './PuViewTx.css'

class PuViewTx extends Component {
  render() {
    var { tx } = this.props;
    return (
      <div>
        <div className="sc-hCbubC dKVYOG" style={{ opacity: 1 }}>
          <div>
            <div className="sc-kMBllD jhkZnM" style={{ opacity: 1, transform: 'translate(-240px, 0px)' }}>
              <div className="sc-enfXDO kyNWzm">Transaction History</div>
              <div className="sc-dBfaGr bwTAQT">
                <div className="sc-kWHCRG doLgQs">
                  <div className="title1">Tx Hash:</div>
                  <div className="value"><a
                    href="#"
                    rel="noopener">{tx.hash}</a></div>
                </div>
                <div className="sc-kWHCRG doLgQs">
                  <div className="title1">Block#:</div>
                  <div className="value"><a
                    href="#" rel="noopener"><span
                      className="sc-dqBHgY igApRg">{tx.blockHeight}</span></a></div>
                </div>
                <div className="sc-kWHCRG doLgQs">
                  <div className="title1">To:</div>
                  <div className="value"><a
                    href="#" rel="noopener">{tx.to}</a></div>
                </div>
                <div className="sc-kWHCRG doLgQs">
                  <div className="title1">From:</div>
                  <div className="value"><a
                    href="#"
                    rel="noopener">{tx.from}</a></div>
                </div>
                <div className="sc-kWHCRG doLgQs">
                  <div className="title1">Confirm Time:</div>
                  <div className="value"><span className="sc-dqBHgY igApRg">N/A</span></div> {/*2019-04-24 07:01:40*/}
                </div>
                <div className="sc-kWHCRG doLgQs">
                  <div className="title1">Amount:</div>
                  <div className="value"><span className="sc-dqBHgY igApRg">{tx.value}</span></div>
                </div>
                <div className="sc-kWHCRG doLgQs">
                  <div className="title1">Fee:</div>
                  <div className="value"><span className="sc-dqBHgY igApRg">{tx.fee}</span></div>
                </div>
              </div>
              <div className="sc-jgVwMx hcRqDo">
                <i className="fa fa-times dJRkzW" size={18} aria-hidden="true" onClick={this.props.closeViewDetail} ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PuViewTx;