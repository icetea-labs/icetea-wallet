export const currentServer = 'testnet'; //c
window.__network__ = 'testnet';

//b
export const node = {
  qa: ['icetea.io'],
  testnet: ['icetea01.io', 'icetea01.io', 'icetea01.io'],
  mainnet: ['icetea21.io', 'icetea22.io', 'icetea23.io', 'icetea23.io'],
}[currentServer];
//e
export const network = window.localStorage.getItem('network') || node[0];
//a
export const explorer = 'https://icetea.io/';
export const faq = 'https://icetea.io/';
export const forums = 'https://icetea.io/';
export const mainnet = 'https://icetea.io/';
export const testnet = 'https://icetea.io/';
