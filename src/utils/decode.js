
const keythereum = require('keythereum')
const { getAccount } = require('icetea-common/src/utils')

function decode (password, keyObject) {
  var privateKey = keythereum.recover(password, keyObject)
  var account = getAccount(privateKey)
  return account
}

export default decode
