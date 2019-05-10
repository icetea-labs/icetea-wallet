import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import { ecc, codec } from 'icetea-common';

export const utils = {
  createAccountWithMneomnic() {
    var mnemonic = bip39.generateMnemonic();
    var privateKey = this.getPrivateKeyFromMnemonic(mnemonic);
    console.log(privateKey);
    return {
      privateKey: privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address,
      mnemonic: mnemonic
    }
  },
  recoverAccountFromMneomnic (mnemonic){
    var privateKey = this.getPrivateKeyFromMnemonic(mnemonic);
    return {
      privateKey: privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address,
    }
  },
  getPrivateKeyFromMnemonic(mnemonic){
    if (!bip39.validateMnemonic(mnemonic))
      throw new Error("wrong mnemonic format");

    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var hdkey = HDKey.fromMasterSeed(seed);
    return codec.toKeyString(hdkey.privateKey);
    // return privateKey ? u.default.fromSeed(privateKey).derivePath("44'/714'/0'/0/0").privateKey.toString("hex") : privateKey.toString("hex")
  },
}