export const currentServer = 'testnet';
// eslint-disable-next-line no-underscore-dangle
window.__network__ = 'testnet';

export const node = {
  qa: ['icetea.io'],
  testnet: ['icetea01.io', 'icetea01.io', 'icetea01.io'],
  mainnet: ['icetea21.io', 'icetea22.io', 'icetea23.io', 'icetea23.io'],
}[currentServer];
export const network = window.localStorage.getItem('network') || node[0];
export const explorer = 'https://devtools.icetea.io/';
export const termOfService = 'https://icetea.io/terms';
export const faq = 'https://docs.icetea.io/';
export const forums = 'https://t.me/iceteachain';
export const telegram = 'https://t.me/iceteachain';
export const twitter = 'https://twitter.com/iceteachain';
export const mainnet = 'https://icetea.io/';
export const testnet = 'https://icetea.io/testnet';
export const iteaScan = process.env.REACT_APP_SCAN;
export const iteaScanTx = process.env.REACT_APP_SCAN_TX;
export const iteaScanBlock = process.env.REACT_APP_SCAN_BLOCK;
export const iteaScanAddress = process.env.REACT_APP_SCAN_ADDR;
