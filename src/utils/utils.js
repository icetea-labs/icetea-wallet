import * as bip39 from 'bip39'
import HDKey from 'hdkey'
import { ecc, codec } from 'icetea-common'

export const utils = {
  createAccountWithMneomnic () {
    var mnemonic = bip39.generateMnemonic()
    var privateKey = this.getPrivateKeyFromMnemonic(mnemonic)
    console.log(privateKey)
    return {
      privateKey: privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address,
      mnemonic: mnemonic
    }
  },
  recoverAccountFromMneomnic (mnemonic) {
    var privateKey = this.getPrivateKeyFromMnemonic(mnemonic)
    return {
      privateKey: privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address
    }
  },
  getPrivateKeyFromMnemonic (mnemonic) {
    if (!bip39.validateMnemonic(mnemonic)) { throw new Error('wrong mnemonic format') }

    var seed = bip39.mnemonicToSeedSync(mnemonic)
    var hdkey = HDKey.fromMasterSeed(seed)
    return codec.toKeyString(hdkey.privateKey)
    // return privateKey ? u.default.fromSeed(privateKey).derivePath("44'/714'/0'/0/0").privateKey.toString("hex") : privateKey.toString("hex")
  }
}

export const sendTranAmount = {
  checkDecimal (number) {
    var reg = new RegExp('/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/')
    var temp = ''.concat(number).match(reg)
    if (!temp) { return 0 }
    var num = temp[1]
    if (num && num.endsWith(0)) {
      var a = num.indexOf(1)
      num = num.substring(0, a + 1)
    }
    return Math.max(0, (num ? num.length : 0) - (temp[2] ? +temp[2] : 0))
  }
}
export const decimal = 6

export function toTEA (unit) {
  return unit / (10 ** decimal)
}

export function toUNIT (tea) {
  tea = tea.toFixed(decimal)
  return tea * (10 ** decimal)
}
