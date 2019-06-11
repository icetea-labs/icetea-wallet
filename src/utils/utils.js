import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import { ecc, codec, AccountType } from '@iceteachain/common';
import decode from './decode';
import paths from '../config/walletPaths';

const keythereum = require('keythereum');
const randomBytes = require('randombytes');

export const userStorage = {
  isWalletConnect() {
    let user = sessionStorage.getItem('user') || '{}';
    return (user = JSON.parse(user)).flags && user.flags.isWalletConnect;
  },
  privateKey() {
    let user = sessionStorage.getItem('user') || '{}';
    return !!(user = JSON.parse(user)).privateKey;
  },
};

function createRandom() {
  const keyBytes = 32;
  const ivBytes = 16;
  const random = randomBytes(keyBytes + ivBytes + keyBytes);
  return {
    iv: random.slice(keyBytes, keyBytes + ivBytes),
    salt: random.slice(keyBytes + ivBytes),
  };
}

export const utils = {
  createAccountWithMneomnic(mnemonic, index = 0) {
    if (!mnemonic) mnemonic = bip39.generateMnemonic();
    const privateKey = this.getPrivateKeyFromMnemonic(mnemonic, index);
    const { address } = ecc.toPubKeyAndAddress(privateKey);

    return {
      mnemonic,
      privateKey,
      address,
    };
  },
  recoverAccountFromMneomnic(mnemonic, options = { index: 0, type: AccountType.BANK_ACCOUNT }) {
    const typeTMP =
      options.type === AccountType.REGULAR_ACCOUNT ? AccountType.REGULAR_ACCOUNT : AccountType.BANK_ACCOUNT;
    let privateKey = '';
    let address = '';
    let indexBase = '';

    do {
      indexBase = options.index;
      privateKey = this.getPrivateKeyFromMnemonic(mnemonic, options.index);
      ({ address } = ecc.toPubKeyAndAddress(privateKey));
      options.index += 1;
      console.log('index', options.index);
    } while (options.index < 100 && !codec.isAddressType(address, typeTMP));

    return {
      privateKey,
      address,
      index: indexBase,
    };
  },

  getPrivateKeyFromMnemonic(mnemonic, index = 0) {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('wrong mnemonic format');
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdkey = HDKey.fromMasterSeed(seed);
    const childkey = hdkey.derive(paths + index);

    return codec.toKeyString(childkey.privateKey);
  },

  recoverAccountFromPrivateKey(keyStore, password, address) {
    const privateKey = this.getPrivateKeyFromKeyStore(keyStore, password);
    if (this.getAddressFromPrivateKey(privateKey) !== address) {
      throw new Error('wrong password');
    }
    return privateKey;
  },

  getPrivateKeyFromKeyStore(keyStore, password) {
    const account = decode(password, keyStore);
    const privateKey = codec.toString(account.privateKey);
    return privateKey;
  },

  getAddressFromPrivateKey(privateKey) {
    const { address } = ecc.toPubKeyAndAddressBuffer(privateKey);
    return address;
  },

  encryptMnemonic(mnemonic, password) {
    const options = {
      kdf: 'pbkdf2',
      cipher: 'aes-128-ctr',
      kdfparams: {
        c: 262144,
        dklen: 32,
        prf: 'hmac-sha256',
      },
      noAddress: true,
    };

    const dk = createRandom();
    return keythereum.dump(password, mnemonic, dk.salt, dk.iv, options);
  },

  decryptMnemonic(mnemonicObj, password) {
    // type uint8array
    const mnemonic = keythereum.recover(password, mnemonicObj);
    return new TextDecoder('utf-8').decode(mnemonic).replace(/%20/g, ' ');
  },
};

export const sendTranAmount = {
  checkDecimal(number) {
    const reg = new RegExp('/(?:.(d+))?(?:[eE]([+-]?d+))?$/');
    const temp = ''.concat(number).match(reg);
    if (!temp) {
      return 0;
    }
    let num = temp[1];
    if (num && num.endsWith(0)) {
      const a = num.indexOf(1);
      num = num.substring(0, a + 1);
    }
    return Math.max(0, (num ? num.length : 0) - (temp[2] ? +temp[2] : 0));
  },
};
export const decimal = 6;

export function toTEA(unit) {
  return unit / 10 ** decimal;
}

export function toUNIT(tea) {
  const resp = tea.toFixed(decimal);
  return resp * 10 ** decimal;
}
