
const keythereum = require('keythereum')
const randomBytes = require('randombytes')
const { codec } = require('icetea-common')
/**
 * @privateKey
 * @password
 */
function encode (privateKey, password) {
  var options = {
    kdf: 'pbkdf2',
    cipher: 'aes-128-ctr',
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: 'hmac-sha256'
    }
  }

  var dk = createRandom()
  privateKey = codec.toBuffer(privateKey)
  return keythereum.dump(password, privateKey, dk.salt, dk.iv, options)
}

function createRandom () {
  var keyBytes = 32
  var ivBytes = 16
  var random = randomBytes(keyBytes + ivBytes + keyBytes)
  return {
    iv: random.slice(keyBytes, keyBytes + ivBytes),
    salt: random.slice(keyBytes + ivBytes)
  }
}

export default encode
