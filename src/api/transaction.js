import { decodeTX } from 'icetea-web3/src/utils';
import { ecc } from 'icetea-common';
import dateFormat from 'dateformat';
import tweb3 from '../service/tweb3';
import { toTEA } from '../utils/utils';

const transaction = {
  getTxHistory(params) {
    return new Promise(async resolve => {
      var systemAddr = 'system',
        eventName = 'Transferred';
      var conditionsByTo = "tx.to='" + params.address + "' AND tx.height > 0";
      var conditionsByFrom = "tx.from='" + params.address + "' AND tx.height > 0";
      // get by to address
      var myTxsByTo = await tweb3.getPastEvents(eventName, systemAddr, conditionsByTo, params.options);
      // get by from address
      var myTxsByFrom = await tweb3.getPastEvents(eventName, systemAddr, conditionsByFrom, params.options);
      var myTxs = myTxsByFrom.txs.concat(myTxsByTo.txs);
      var transactions = utils.fmtTxs(myTxs);
      transactions = await utils.addTimeToTx(transactions);
      var reps = {};
      reps.tx = transactions;
      reps.total = transactions.length;
      resolve(reps);
    });
  },
};

export default transaction;

const utils = {
  fmtTxs: txs => {
    Object.keys(txs).forEach(k => {
      const t = txs[k];
      t.shash = t.hash; // this.fmtHex(t.hash)
      t.blockHeight = t.height;

      const data = decodeTX(t.tx);
      let from = data.from;
      if (!from) {
        const pubkey = data.evidence.pubkey || data.evidence[0].pubkey;
        from = ecc.toAddress(pubkey);
      }
      t.from = from;
      t.to = data.to;
      t.value = toTEA(data.value);
      t.fee = toTEA(data.fee || '0');

      t.status = t.tx_result.code ? 'Error' : 'Success';

      t.txType = 'transfer';
      data.data = JSON.parse(data.data) || {};
      if (data.data.op === 0) {
        t.txType = 'deploy';
        // t.to = fmtHex(t.tx_result.data);
      } else if (data.data.op === 1) {
        t.txType = 'call';
      }

      t.txType = t.txType.toUpperCase();
    });
    return txs.reverse();
  },
  addTimeToTx: async transactions => {
    var blocksInfo = [];
    for (var i = 0; i < transactions.length; i++) {
      var resp = await tweb3.getBlock({ height: transactions[i].height });
      blocksInfo.push(resp.block_meta);
    }
    // console.log(blocksInfo)
    var blockTime = {};
    blocksInfo.forEach(el => {
      blockTime[el.header.height] = { time: utils.fmtTime(el.header.time) };
    });
    // console.log(blockTime)
    transactions.forEach(el => {
      if (blockTime[el.height]) {
        el.time = blockTime[el.height].time;
      } else {
        console.log('el.height', el.height);
      }
    });
    return transactions;
  },
  fmtTime: tm => {
    var d = typeof tm === 'number' ? tm * 1000 : Date.parse(tm);
    return dateFormat(new Date(d), 'mm-dd  h:MM:ss');
  },
};
