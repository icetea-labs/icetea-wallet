import { ecc } from '@iceteachain/common';
import dateFormat from 'dateformat';
import tweb3 from '../service/tweb3';
import { toTEA } from '../utils';

const utils = {
  fmtTxs: txs => {
    Object.keys(txs).forEach(k => {
      const t = txs[k];
      t.shash = t.hash; // this.fmtHex(t.hash)
      t.blockHeight = t.height;

      const data = t.tx; //decodeTX(t.tx);
      let { from } = data;
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
      data.data = data.data || {};
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
  addTimeToTx: async txs => {
    for (let i = 0; i < txs.length; i += 1) {
      const { height } = txs[i];
      const { block } = await tweb3.getBlock({ height });
      const tm = block.header.time;
      const d = typeof tm === 'number' ? tm * 1000 : Date.parse(tm);
      txs[i].time = dateFormat(new Date(d), 'mm-dd  hh:MM:ss TT');
    }
    return txs;
  },
};

const transaction = {
  getTxHistory(params) {
    return new Promise(async resolve => {
      const txFrom = await tweb3.searchTransactions(
        `system.from='${params.address}' AND system._ev = 'tx'`,
        params.options
      );
      const txTo = await tweb3.searchTransactions(
        `system.to='${params.address}' AND system._ev = 'tx'`,
        params.options
      );
      const txPayer = await tweb3.searchTransactions(
        `system.payer='${params.address}' AND system._ev = 'tx'`,
        params.options
      );

      let myTxs = txFrom.txs.concat(txTo.txs).concat(txPayer.txs);
      // Remove duplicates tx
      myTxs = Object.values(myTxs.reduce((txs, tx) => Object.assign(txs, { [tx.hash]: tx }), {}));

      let transactions = utils.fmtTxs(myTxs);
      transactions = await utils.addTimeToTx(transactions);
      transactions.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
      const reps = {};
      reps.tx = transactions;
      reps.total = transactions.length;
      resolve(reps);
    });
  },
};

export default transaction;
