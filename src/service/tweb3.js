import { IceTeaWeb3 } from 'icetea-web3';
// export default window.tweb3 = new IceTeaWeb3('http://localhost:3001/api');
// eslint-disable-next-line no-undef
export default (window.tweb3 = new IceTeaWeb3('ws://localhost:26657/websocket'));
