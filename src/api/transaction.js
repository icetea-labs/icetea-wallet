import tweb3 from '../service/tweb3'

const transaction = {
  getTxHistory(op) {
    return tweb3.getPastEvents('Transferred', 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx', 'tx.height > 0', op)
  }
}

export default transaction
