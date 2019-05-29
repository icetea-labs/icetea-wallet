const keythereum = require('keythereum');
const randomBytes = require('randombytes');
const { codec } = require('icetea-common');

function createRandom() {
  const keyBytes = 32;
  const ivBytes = 16;
  const random = randomBytes(keyBytes + ivBytes + keyBytes);
  return {
    iv: random.slice(keyBytes, keyBytes + ivBytes),
    salt: random.slice(keyBytes + ivBytes),
  };
}

/**
 * @privateKey
 * @password
 */
function encode(privateKey, password) {
  const options = {
    kdf: 'pbkdf2',
    cipher: 'aes-128-ctr',
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: 'hmac-sha256',
    },
  };

  const dk = createRandom();
  return keythereum.dump(password, codec.toBuffer(privateKey), dk.salt, dk.iv, options);
}

export default encode;
