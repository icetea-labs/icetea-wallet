import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import { ecc, codec } from 'icetea-common';
import decode from './decode';

export const utils = {
  createAccountWithMneomnic() {
    const mnemonic = bip39.generateMnemonic();
    const privateKey = this.getPrivateKeyFromMnemonic(mnemonic);
    console.log(privateKey);
    return {
      privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address,
      mnemonic,
    };
  },
  recoverAccountFromMneomnic(mnemonic) {
    const privateKey = this.getPrivateKeyFromMnemonic(mnemonic);
    return {
      privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address,
    };
  },
  getPrivateKeyFromMnemonic(mnemonic) {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('wrong mnemonic format');
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdkey = HDKey.fromMasterSeed(seed);
    return codec.toKeyString(hdkey.privateKey);
    // return privateKey ? u.default.fromSeed(privateKey).derivePath("44'/714'/0'/0/0").privateKey.toString("hex") : privateKey.toString("hex")
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
    const address = ecc.toPubKeyAndAddressBuffer(privateKey).address;
    console.log('CK decode address', address)
    return address;
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
