import React, { Component } from 'react';
import './Balances.css';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import SendTransaction from './SendTransaction';
import tweb3 from '../../../service/tweb3';
import TransactionHistory from '../Transaction';
import { Icon, checkDevice, DivSelectWordBase, BtnActive } from '../../elements/utils';
import { toTEA } from '../../../utils';
import notifi from '../../elements/Notification';
import SendTxMobile from './SendTxMobile';
import * as actions from '../../../store/actions/account';

// let user = sessionStorage.getItem('user');
// user = (user && JSON.parse(user)) || {};

const MobileWrapper = styled.div`
  background: rgb(18, 22, 28);
  @media (max-width: 768px) {
    display: block;
  }
`;

const NotMobileWrapper = styled.div`
  @media (max-width: 768px) {
    /* display: none; */
  }
`;

const Wrapper = styled.div`
  display: none;
  background: #12161c;
  @media (max-width: 768px) {
    display: block;
  }
  .scrollContainer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
`;

const Outbox = styled.div`
  padding: 10px 12px;
  border-top: 1px solid #000;
  position: relative;
  top: 44px;
  background: #12161c;
`;

const Title = styled(DivSelectWordBase)`
  justify-content: space-between;
  font-size: 20px;
  padding: 10px 0;
  color: #fff;
  align-items: center;
  text-indent: '10px';
  font-weight: 'bold';
`;

const WrapSubTitle = styled.div`
  background: linear-gradient(225deg, rgba(29, 36, 46, 1) 0%, rgba(19, 23, 30, 1) 100%);
  box-shadow: 0px 0px 8px 0px rgba(11, 14, 17, 0.5);
  border-radius: 3px;
  color: #848e9c;
  padding: 25px 12px;
  .totalUsd {
    font-size: 14px;
  }
  .address {
    color: #848e9c;
    font-size: 17px;
    font-weight: 500;
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
  }
  .box {
    width: 24px;
    height: 24px;
    background: rgba(33, 40, 51, 1);
    border-radius: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const WrapperQRCode = styled(DivSelectWordBase)`
  justify-content: center;
  margin-top: 20px;
  .qrcode-box {
    position: relative;
    border: 2px solid rgb(255, 255, 255);
    display: inline-block;
    background: rgb(37, 45, 56);
    padding: 10px;
  }
  .qrcode-box::after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    background: rgb(37, 45, 56);
  }
  .qrcode-box::before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    background: rgb(37, 45, 56);
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 10px;
  background: rgba(33, 40, 51, 0.6);
  border-radius: 3px;
`;

const ContentTitle = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  position: relative;
  color: rgb(132, 142, 156);
  border-bottom: 1px solid rgb(11, 14, 17);
  padding: 0px 15px;
  .symbol {
    font-size: 14px;
    margin-right: 10px;
    color: rgb(255, 255, 255);
  }
  .name {
    width: 130px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const ContentValue = styled.div`
  font-size: 13px;
  position: relative;
  padding: 10px 15px;
`;

const TitleAsset = styled.div`
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

const BtnCus = styled(BtnActive)`
  background: inherit;
  border: 1px solid #15b5dd;
  color: #15b5dd;
  width: 170px;
  a {
    color: inherit;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  @media (max-width: 1440px) {
    width: 110px;
    height: 30px;
    line-height: 28px;
    font-size: 12px;
  }
`;

const ContentValueBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CVBWrapper = styled.div`
  .title {
    color: rgb(132, 142, 156);
    width: 46px;
    text-align: left;
    margin-right: 20px;
  }
  .value {
    color: rgb(255, 255, 255);
  }
  span {
    font-family: DIN;
  }
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: rgb(255, 255, 255);
  font-weight: 600;
  .title {
    margin-right: 10px;
    color: rgb(255, 255, 255);
  }
`;

const AvaiWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: rgb(255, 255, 255);
  title {
    color: rgb(132, 142, 156);
    font-size: 13px;
  }
`;

class Balances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: '',
      showSend: false,
      showTbl: [],
      showMbTbl: [],
      showMobileCode: false,
      showSendMobi: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.address !== prevState.addr) {
      return {
        addr: nextProps.address,
      };
    }
    return null;
  }

  componentDidMount() {
    checkDevice.isMobile() ? this.renderMobileTbl() : this.renderTbl();
  }

  componentDidUpdate(prevProps, prevState) {
    const { addr } = this.state;
    if (addr !== prevState.addr) {
      this.renderTbl(addr);
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.sendTimeOut);
  };

  showSendTransaction = () => {
    this.setState({ showSend: true });
  };

  viewSendMobi = () => {
    this.setState({ showSendMobi: true });
  };

  getKeyFromSeasionStogae = () => {
    const { props } = this;
    props.setNeedAuth(true);
    this.setState({ showSend: true });
  };

  _closeSendModal = () => {
    this.setState({ showSend: false });
  };

  onCFSuccess = () => {
    this.sendTimeOut = setTimeout(() => {
      this.setState(prevState => ({ showSend: !prevState.showSend }));
    }, 1e3);
  };

  _buildBalances = () => {};

  _copyAddress = () => {
    notifi.info('Copy successful!');
  };

  _showMobileQrCode = () => {
    const { state } = this;
    const value = state.showMobileCode;
    this.setState({
      showMobileCode: !value,
    });
  };

  _sendTransaction = () => {
    const { privateKey } = this.props;
    return privateKey ? this.showSendTransaction() : this.getKeyFromSeasionStogae();
  };

  renderTbl = async addr => {
    try {
      const { address } = this.props;
      if (!address) {
        return;
      }
      // const { addr } = this.state;
      const result = await tweb3.getBalance(addr || address);
      const tblTmp = [
        {
          name: 'PolkaFoundry Native Token',
          symbo: 'PKF',
          totalBalance: toTEA(result.balance),
          availableBalance: toTEA(result.balance),
        },
      ];

      this.setState({
        showTbl: tblTmp.map((data, index) => (
          <tr key={index}>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">{data.symbo}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">{data.name}</div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">
                <span className="sc-tilXH yKCJu">{data.totalBalance}</span>
              </div>
            </td>
            <td style={{ width: '15%' }}>
              <div className="sc-hkaZBZ jvVxXM">
                <span className="sc-tilXH yKCJu">{data.availableBalance}</span>
              </div>
            </td>
            <td style={{ width: '10%' }}>
              <div className="sc-hkaZBZ sc-hqGPoI feIRPa">
                <button type="button" className="sc-bZQynM sc-MYvYT sc-jbWsrJ ircCEl" onClick={this._sendTransaction}>
                  Send
                </button>
              </div>
            </td>
          </tr>
        )),
      });
    } catch (err) {
      // console.log(err);
    }
  };

  renderMobileTbl = async () => {
    try {
      const { privateKey, address } = this.props;
      const result = await tweb3.getBalance(address);
      const tblTmp = [
        {
          name: 'PolkaFoundry Native Token',
          symbo: 'PKF',
          totalBalance: toTEA(result.balance),
          availableBalance: toTEA(result.balance),
        },
      ];
      this.setState({
        showMbTbl: tblTmp.map((data, index) => (
          <div key={index}>
            <div className="infinite-scroll-component">
              <ContentWrapper>
                <ContentTitle>
                  <TitleAsset>
                    <div className="symbol">{data.symbo}</div>
                    <div className="name">{data.name}</div>
                  </TitleAsset>
                  <BtnCus onClick={privateKey ? this.viewSendMobi : this.viewCFForm}>Send</BtnCus>
                  {/* <BtnCus onClick={this.viewSendMobi}>Send</BtnCus> */}
                </ContentTitle>
                <ContentValue>
                  <ContentValueBox>
                    <CVBWrapper>
                      <TotalWrapper>
                        <div className="title">Total</div>
                        <div className="value">
                          <span>{data.totalBalance}</span>
                        </div>
                      </TotalWrapper>
                      <AvaiWrapper>
                        <div className="title">Available</div>
                        <div className="value">
                          <span>{data.availableBalance}</span>
                        </div>
                      </AvaiWrapper>
                    </CVBWrapper>
                  </ContentValueBox>
                </ContentValue>
              </ContentWrapper>
            </div>
          </div>
        )),
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { props } = this;
    const { showSend, sendingAsset, showTbl, showMobileCode, showMbTbl, showSendMobi, addr } = this.state;
    const { privateKey } = this.props;
    return (
      <div>
        <MobileWrapper>
          {checkDevice.isMobile() && (
            <Wrapper>
              <React.Fragment>
                <Outbox>
                  <Title>My Balances</Title>
                  <WrapSubTitle>
                    <DivSelectWordBase margin="10px 0 0 0" justify="space-between" align="center">
                      <div className="address">{addr}</div>
                      <CopyToClipboard text={addr} onCopy={this._copyAddress}>
                        <div title="copy box" onClick={this._copyAddress}>
                          <Icon type="copy" size={14} />
                        </div>
                      </CopyToClipboard>
                      <span className="box" onClick={this._showMobileQrCode}>
                        <Icon type={showMobileCode ? 'close' : 'qrcode'} size={14} />
                      </span>
                    </DivSelectWordBase>
                    {showMobileCode && (
                      <WrapperQRCode>
                        <div size="174" className="qrcode-box sc-iSDuPN iulYhq">
                          <QRCode size={174} level="M" className="qrForm" value={addr} />
                        </div>
                      </WrapperQRCode>
                    )}
                  </WrapSubTitle>
                  <div>{showMbTbl}</div>
                </Outbox>
              </React.Fragment>
            </Wrapper>
          )}
        </MobileWrapper>

        {showSendMobi && (
          <MobileWrapper>
            <Wrapper>
              <React.Fragment>
                <Outbox>
                  <SendTxMobile />
                </Outbox>
              </React.Fragment>
            </Wrapper>
          </MobileWrapper>
        )}
        <NotMobileWrapper>
          <div className="sc-lnrBVv kvEeOF">
            <div className="sc-kIWQTW jfuazO">
              <div className="sc-hMjcWo jvYfux">
                <div className="sc-gCwZxT iWYAnd">
                  <div>
                    <span>Balances</span>
                    <span className="text-address">
                      <i id="copyText">{addr}</i>
                    </span>
                  </div>
                  <div className="sc-jDwBTQ cPxcHa">
                    <div className="sc-fATqzn cNStFF">
                      <Icon type="qrcode" size={18} />
                      <div className="qrCode">
                        <div size="174" className="qrcode-box sc-iSDuPN iulYhq">
                          <QRCode size={174} className="qrForm" value={addr} />
                        </div>
                      </div>
                    </div>
                    <div className="sc-fATqzn cNStFF">
                      <CopyToClipboard text={addr} onCopy={this._copyAddress}>
                        <span title="copy address">
                          <Icon type="copy" size={18} />
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="sc-hvvHee cOshIS">
                    <table className="sc-fQejPQ sc-cPuPxo dcZana">
                      <thead className="sc-eSePXt byspTh">
                        <tr>
                          <th>Asset</th>
                          <th>Name</th>
                          <th>Total Balance</th>
                          <th>Available Balance</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody className="sc-fvLVrH gjcHsq">{showTbl}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              {showSend && privateKey && (
                <SendTransaction
                  onSendSuccess={this.renderTbl}
                  bncClient=""
                  assets={props.buildBalances}
                  privateKey={privateKey}
                  sendingAsset={sendingAsset}
                  // address={user.address}
                  address={addr}
                  // account_number={user.account_number}
                  // sequence={parseInt(user.sequence, 10)}
                  close={this._closeSendModal}
                />
              )}
            </div>
            <div>
              <TransactionHistory />
            </div>
          </div>
        </NotMobileWrapper>
      </div>
    );
  }
}

Balances.defaultProps = {
  tokens: [],
  symbolTickers: [],
  pairs: [],
  userInfo: {},
  privateKey: '',
  dispatch() {},
  cryptoCurrencyRate: {},
  history: {},
};

const mapStateToProps = state => {
  // var exchange = state.exchange
  // var tokens = exchange.tokens
  // var cryptoCurrencyRate = exchange.cryptoCurrencyRate
  // var pairs = exchange.pairs
  // var symbolTickers = state.tickers.symbolTickers
  const { account } = state;
  return {
    userInfo: account.userInfo,
    privateKey: account.privateKey,
    address: account.address,
    balance: account.balance,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setNeedAuth: data => {
      dispatch(actions.setNeedAuth(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Balances);
