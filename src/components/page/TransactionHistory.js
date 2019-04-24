import React, { Component } from 'react';
import './TransactionHistory.css'

class TransactionHistory extends Component {
  render() {
    return (
      <div className="sc-cZLAbK gUtTAS">
        <div className="sc-cEvuZC kCJCmb">
          <div className="sc-iVOTot kOwkAM">Transaction History</div>
          <div>
            <div className="sc-iyvyFf gRnqNO">
              <table className="sc-kTUwUJ sc-gzOgki bkihkp">
                <thead className="sc-kPVwWT gTmcD">
                  <tr>
                    <th data-key="txHash" className="showSortMark">
                      <div className="sc-esjQYD fchNtk">TxHash<span className="sc-kfGgVZ hfdPRR"><i
                        className="iconfont icon-sort_desc sc-dnqmqq iiYHFz" size="16" color=""></i></span></div>
                    </th>
                    <th data-key="date" className="showSortMark">
                      <div className="sc-esjQYD fchNtk">Date<span className="sc-kfGgVZ hfdPRR"><i
                        className="iconfont icon-sort_desc sc-dnqmqq iiYHFz" size="16" color=""></i></span></div>
                    </th>
                    <th>Pair</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>TxFee</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="sc-hwwEjo jWardX"></tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="sc-kXeGPI hpRMTi">
          <div className="sc-iVOTot kOwkAM">Transaction History</div>
          <div>
            <div className="infinite-scroll-component "></div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionHistory;