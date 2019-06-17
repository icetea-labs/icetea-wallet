export const currentServer = 'testnet';
// eslint-disable-next-line no-underscore-dangle
window.__network__ = 'testnet';

export const node = {
  qa: ['icetea.io'],
  testnet: ['icetea01.io', 'icetea01.io', 'icetea01.io'],
  mainnet: ['icetea21.io', 'icetea22.io', 'icetea23.io', 'icetea23.io'],
}[currentServer];
export const network = window.localStorage.getItem('network') || node[0];
export const explorer = 'https://icetea.io/';
export const termOfService = 'https://icetea.io/';
export const faq = 'https://icetea.io/';
export const forums = 'https://icetea.io/';
export const telegram = 'https://t.me/iceteachain';
export const twitter = 'https://icetea.io/';
export const mainnet = 'https://icetea.io/';
export const testnet = 'https://icetea.io/';
export const iteaScan = 'http://localhost:3006';
