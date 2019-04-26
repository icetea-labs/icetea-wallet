import React, { Component } from 'react';
import dateFormat from 'dateformat';
import './TransactionHistory.css';
import { decodeTX } from 'icetea-web3/src/utils';
import { ecc } from 'icetea-common';
import tweb3 from '../../service/tweb3';
import PuViewTx from './poup/PuViewTx';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import './../../assets/styles/pagination.css';
import './../../assets/styles/locale.css';


class TransactionHistory extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      txToTable: [],
      showDetailTx: false,
      current: 1,
      pageSize: 10
    }
  }

  componentDidMount() {
    this.renderTransactions();
  }
  fmtTxs = (txs) => {
    Object.keys(txs).forEach(k => {
      const t = txs[k]
      t.shash = t.hash//this.fmtHex(t.hash)
      t.blockHeight = t.height

      const data = decodeTX(t.tx)
      let from = data.from
      if (!from) {
        const pubkey = data.evidence.pubkey || data.evidence[0].pubkey
        from = ecc.toAddress(pubkey)
      }
      t.from = from//this.fmtHex(from, 6)
      t.to = data.to//this.fmtHex(data.to, 6)
      t.value = data.value
      t.fee = data.fee

      t.status = t.tx_result.code ? 'Error' : 'Success'

      t.txType = 'transfer'
      data.data = JSON.parse(data.data) || {}
      if (data.data.op === 0) {
        t.txType = 'deploy'
        // t.to = fmtHex(t.tx_result.data);
      } else if (data.data.op === 1) {
        t.txType = 'call'
      }
    })
    return txs.reverse()
  }
  // fmtHex = (hex, c) => {
  //   if (!hex || hex.length < c * 2 + 4) return hex
  //   if (hex.indexOf('.') >= 0) return hex
  //   c = c || 4
  //   return hex.substr(0, c) + '…' + hex.substr(-c)
  // }
  fmtTime = (tm) => {
    var d = (typeof tm === 'number') ? tm * 1000 : Date.parse(tm);
    return dateFormat(new Date(d), "mm-dd  h:MM:ss")
  }
  goDetailHash = (hash) => {
    console.log(hash)
  }
  viewDetail = (hash) => {
    // console.log('-viewDetail-', hash)
    this.setState({ showDetailTx: true, hashValue: hash });
  }
  closeViewDetail = () => {
    this.setState({
      showDetailTx: !this.state.showDetailTx
    });
  }

  addTimeToTx = async (transactions) => {
    var blocksNum = [];
    transactions.forEach(el => {
      if (blocksNum.indexOf(el.height) < 0) blocksNum.push(parseInt(el.height));
    });
    var option = {
      minHeight: Math.min(...blocksNum),
      maxHeight: Math.max(...blocksNum)
    };

    console.log("option ", option)
    var blocksInfo = await tweb3.getBlocks(option);

    console.log(blocksInfo)
    var blocksInfoToObj = {};
    blocksInfo.block_metas.forEach(el => {
      blocksInfoToObj[el.header.height] = { time: this.fmtTime(el.header.time) }
    });
    console.log("transaction", transactions)
    console.log("blocksInfoToObj", blocksInfoToObj)
    transactions.forEach(el => {
      el.time = !!(blocksInfoToObj[el.height]) && blocksInfoToObj[el.height].time;
    });
    // console.log(blocksInfo)
    return transactions;
  }

  renderTransactions = async (current = this.state.current, pageSize = this.state.pageSize) => {
    try {
      var myTxs = await tweb3.searchTransactions('tx.height>0');
      var transactions = this.fmtTxs(myTxs.txs);
      // console.log('transactions',transactions);
      //
      transactions = await this.addTimeToTx(transactions);
      var form = (current - 1) * pageSize;
      var to = form + pageSize;
      if (to > transactions.length) to = transactions.length;
      var txTmp = transactions.slice(form, to)
      // this will re render the view with new data
      console.log('transaction', transactions);
      this.setState({
        transactions: transactions,
        txToTable: txTmp.map((tx, index) => (
          <tr key={index}>
            <td><div className="sc-gojNiO jQgIyo" onClick={() => this.goDetailHash(tx.hash)}>{tx.hash}</div></td>
            <td><div className="sc-evWYkj fIPZMa" >
              <span className="sc-tilXH yKCJu">{tx.time}</span>
            </div>
            </td>
            <td><div>{tx.status}</div></td>
            <td><div>{tx.txType}</div></td>
            <td><div>{tx.value}</div></td>
            <td><div>{tx.fee}</div></td>
            <td><div><i className="fa fa-ellipsis-h" onClick={() => this.viewDetail(tx.hash)} ></i></div></td>
          </tr>
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }

  getTxByHash = (hash) => {
    var tx = this.state.transactions.filter(el => {
      return el.shash === hash;
    })
    return tx[0];
  }

  onShowSizeChange = (current, pageSize) => {
    // console.log(current);
    // console.log(pageSize);
    this.renderTransactions(current, pageSize);
    this.setState({
      pageSize: pageSize,
      current: current
    });
  }

  onChange = (page) => {
    // console.log(page);
    this.renderTransactions(page);
    this.setState({
      current: page,
    });
  }
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
                    <th>Status</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>TxFee</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="sc-hwwEjo jWardX">
                  {this.state.txToTable}
                </tbody>
              </table>
            </div>
          </div>
          <div className="sc-jDwBTQ leNfoz">
            <div className="sc-hMqMXs djyRfV">
              <Pagination
                selectComponentClass={Select}
                showQuickJumper
                showSizeChanger
                defaultPageSize={this.state.pageSize}
                defaultCurrent={this.state.current}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onChange}
                total={this.state.transactions.length}
                locale={localeInfo}
              />
            </div>
          </div>
          {this.state.showDetailTx ? <PuViewTx tx={this.getTxByHash(this.state.hashValue)} closePoup={() => this.closeViewDetail()} /> : ''}
        </div>
      </div>
    );
  }
}

export default TransactionHistory;