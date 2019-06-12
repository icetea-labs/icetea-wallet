import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { zIndex } from '../../constants/styles';
import logoHeader from '../../assets/img/headerLogo.svg';
import logo from '../../assets/img/logo.svg';
import cancelblack from '../../assets/img/cancelblack.svg';
import { Icon, checkDevice } from '../elements/utils';
import MenuMobile from '../menu/MenuMobile';
import { PuConfirm } from '../elements/PuConfirm';
import notifi from '../elements/Notification';
import Clock from './Clock';
import GetKeyFromSessionStorage from './GetKeyFromSessionStorage';
import { mainnet, testnet, currentServer, explorer, faq, forums } from '../../config/networks';
import selected from '../../assets/img/checked.png';
import * as actions from '../../store/actions/account';
import { utils, toTEA } from '../../utils/utils';
import tweb3 from '../../service/tweb3';

const WrapperHeader = styled.div`
  height: 50px;
  line-height: 50px;
  background: ${props => props.bgColor || props.theme.headerBg};
  color: #fff;
  display: flex;
  flex-direction: row;
  padding: 0 15px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.header};
  @media (max-width: 768px) {
    height: 44px;
    line-height: 44px;
  }
`;
const LogoDisplay = styled.div`
  display: flex;
`;
const LogoWrapper = styled.div`
  color: #f0b90b;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 150px;
    /* height: 50px; */
  }
`;
const OclockWrapper = styled.div`
  margin-left: 20px;
  padding-top: 10px;
  @media (max-width: 868px) {
    display: none;
  }
`;
const MenuDisplay = styled.div`
  justify-content: flex-end;
  display: flex;
  position: absolute;
  right: 15px;
`;
const StyledUlTag = styled.ul`
  display: flex;
  flex-direction: row;
  li {
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    margin-left: 15px;
    cursor: pointer;
    position: relative;
    &:hover {
      background: rgba(33, 40, 51, 0.5);
      span {
        text-decoration: underline;
      }
    }
    a {
      height: 100%;
      display: block;
      color: inherit;
      font-size: 13px;
      &:hover {
        text-decoration: none;
      }
    }
    &:hover ul {
      display: block;
    }
  }
  li.withSubMenus {
    .triangle {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%) rotate(0deg);
      transition: transform 0.3s ease-in-out;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #fff;
    }
    &:hover .triangle {
      transform: translate(0, -50%) rotate(180deg);
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const ItemsSubMenu = styled.div`
  width: 52px;
  text-align: center;
  cursor: pointer;
  position: relative;
  &:hover {
    background: ${props => props.theme.headerDropdownBg};
    color: #f0b90b;
  }
  ul li:not(.wallet-address) {
    animation: userappear 0.3s ease-in-out;
    @keyframes userappear {
      0% {
        height: 0;
        opacity: 0;
      }
      40% {
        height: 10px;
        opacity: 0;
      }
      100% {
        height: 20px;
        opacity: 1;
      }
    }
  }
  &:hover ul {
    display: flex;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const AccountMenu = styled.ul`
  display: none;
  flex-direction: column;
  color: #fff;
  position: absolute;
  top: 50px;
  right: 0;
  background: #252d38;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  li {
    padding: 10px;
    background: ${props => props.theme.headerDropdownBg};
    width: 290px;
    text-align: left;
    height: 20px;
    line-height: 20px;
    text-indent: 10px;
    font-size: 13px;
    &:hover {
      background: #12161c;
      color: #f0b90b;
    }
    a {
      height: 100%;
      display: block;
      color: inherit;
      font-size: 13px;
      &:hover {
        text-decoration: none;
      }
    }
  }
  li.wallet-address {
    display: flex;
    height: 40px;
    align-items: center;
    background: rgba(72, 81, 93, 0.3);
    &:hover {
      color: inherit;
    }
    .title {
      color: #48515d;
      width: 100px;
      white-space: nowrap;
    }
    .address {
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
    }
    .op {
      display: flex;
      margin-top: 10px;
      margin-left: 30px;
      i {
        margin-right: 10px;
        &:hover {
          color: #f0b90b;
        }
      }
      span {
        position: relative;
      }
    }
  }
`;

const ListAccount = styled.div`
  position: relative;
  line-height: normal;
  max-height: 150px;
  overflow: auto;
`;

const WrapAccount = styled.div`
  .account-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 13px;
    &:hover {
      background: #12161c;
      color: #f0b90b;
    }
  }
  .account-avt {
    display: flex;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    img {
      max-width: 100%;
    }
  }
  .account-info {
    width: calc(100% - 71px);
    text-align: left;
    color: #ffffff;
    &:hover {
      .accout-name {
        color: #f0b90b;
      }
    }
  }
  .accout-balances {
    font-size: 12px;
    color: #9ca2ab;
  }
  .selected {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    img {
      max-width: 100%;
    }
  }
`;
const ItemsAccount = styled.ul`
  flex-direction: column;
  color: #fff;
  border-top: 1px solid #343e4c;
  li {
    padding: 10px;
    background: ${props => props.theme.headerDropdownBg};
    width: 290px;
    text-align: left;
    height: 20px;
    line-height: 20px;
    text-indent: 10px;
    font-size: 13px;
    &:hover {
      background: #12161c;
      color: #f0b90b;
    }
    a {
      height: 100%;
      display: block;
      color: inherit;
      font-size: 13px;
      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const ItemsSubMenuWapper = styled.ul`
  display: none;
  position: absolute;
  top: 50px;
  right: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  background: #252d38;
  li {
    background: #252d38;
    height: 34px;
    line-height: 34px;
    padding: 0 20px;
    text-align: center;
    white-space: nowrap;
    animation: appear 0.3s ease-in-out;
    margin-left: 0;
    &:hover {
      background: #1e273a;
      color: #f0b90b;
    }
    @media (max-width: 768px) {
      background: inherit;
    }
  }
`;

const StyledIconMobileMenu = styled.div`
  display: none;
  position: relative;
  cursor: pointer;
  width: 20px;
  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 60px;
    top: 0;
    bottom: 0;
    left: -20px;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;
const ContentLogout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin-bottom: 20px;
  }
`;

const ImageLogout = styled.div`
  width: 100px;
  height: 66px;
  background: url(${cancelblack}) 0% 0% / contain;
`;

const RadioTitle = styled.div`
  font-size: 16px;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 10px 0 20px 0;
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  span {
    height: 10px;
    wight: 400px;
  }
`;

const RadioWRapper = styled.div`
  -webkit-appearance: display;
  display: block;
`;

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // dateTime: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      confirmLogout: false,
      showMobileMenu: false,
      showSearchIcon: false,
      chooseAcc: false,
      accounts: {},
      accSeleted: 'bankAcc',
    };
  }

  async componentDidMount() {
    await this.updateBalance();
  }

  updateBalance = async () => {
    const { childKey, setBalanceChildKey } = this.props;
    const childKeyTmp = [];
    // console.log('childKey', childKey);
    for (let i = 0; i < childKey.length; i += 1) {
      const { balance } = await tweb3.getBalance(childKey[i].address);
      childKey[i].balance = balance;
      childKeyTmp.push(childKey[i]);
    }
    setBalanceChildKey(childKeyTmp);
  };

  _confirmSignout = () => {
    return () => {
      // userStorage.isWalletConnect && state && state.disconnect();
      sessionStorage.removeItem('user');
      window.localStorage.removeItem('walletconnect');
      window.location.reload();
    };
  };

  _gotoExplorer = () => {
    const { address } = this.props;
    window.open(''.concat(explorer, '/address/').concat(address), 'blank');
  };

  _copyAddress = () => {
    notifi.info('copy success');
  };

  _getMenus = () => {
    const { address } = this.props;

    const authenticated = [
      {
        text: 'Transactions',
        path: '/transactionHistory',
      },
      {
        text: 'Balances',
        path: '/balances',
      },
      {
        text: 'BotStore',
        path: '/botStore',
      },
      {
        text: 'Profile',
        path: '/profile',
      },
    ];

    const unauthenticated = [
      {
        text: 'Create New Wallet',
        path: '/create',
      },
      {
        text: 'Unlock Wallet',
        path: '/unlock',
      },
    ];
    return address ? authenticated : unauthenticated;
  };

  _showMobileMenu = () => {
    this.setState({
      showMobileMenu: true,
    });
  };

  _hideMobileMenu = () => {
    this.setState({
      showMobileMenu: false,
    });
  };

  _showConfirmLogout = () => {
    this.setState({
      confirmLogout: true,
    });
  };

  _clickLogo = () => {
    const { history } = this.props;
    history.push('/');
  };
  // onClick={() => this.clickMenu(sub.path)}

  _buildSubMenus = subMenus => {
    return subMenus.map(sub => {
      return (
        <li key={sub.text}>
          <Link to={sub.path}>{sub.text}</Link>
        </li>
      );
    });
  };

  _chooseAccount = () => {
    this.setState({
      chooseAcc: true,
    });
  };

  _setAcc = e => {
    this.setState({
      accSeleted: e.target.value,
    });
  };

  _createAcc = e => {
    e.preventDefault();
    const { state } = this;
    const accSel = state.accSeleted;
    if (accSel === 'bankAcc') {
      this._createAccBank();
    }
    if (accSel === 'regAcc') {
      this._createAccReg();
    }
  };

  _createAccReg = () => {};

  _createAccBank = async () => {
    const { mnemonic, indexKey, addNewAccount, setNeedAuth } = this.props;
    // const indexTmp = indexKey + 1;
    // let account = {};
    if (mnemonic) {
      // do {
      //   indexTmp += 1;
      //   account = utils.createAccountWithMneomnic(mnemonic, indexTmp);
      // } while (!codec.isAddressType(account.address, AccountType.BANK_ACCOUNT));
      const account = utils.recoverAccountFromMneomnic(mnemonic, indexKey + 1);
      const { balance } = await tweb3.getBalance(account.address);
      const childKey = {
        address: account.address,
        indexKey: account.index,
        privateKey: '',
        balance,
        selected: false,
      };
      addNewAccount(childKey);
      notifi.info('Create success');
    } else {
      setNeedAuth(true);
    }
  };

  _importAccount = () => {
    console.log('aaaaa');
  };

  _selectAccount = index => {
    const { mnemonic, childKey, setAccount } = this.props;
    const selectedAddress = childKey[index].address;
    const selectedBalance = childKey[index].balance;
    let privateKey = '';
    // console.log('aa', index, childKey[index].index);
    if (mnemonic) {
      ({ privateKey } = utils.recoverAccountFromMneomnic(mnemonic, childKey[index].index));
    }
    // console.log('privateKey', childKey[index].index, privateKey);

    setAccount({
      address: selectedAddress,
      privateKey,
      balance: selectedBalance,
    });

    if (privateKey) {
      // Set default account
      tweb3.wallet.importAccount(privateKey);
      tweb3.wallet.defaultAccount = selectedAddress;
    }

    let current = sessionStorage.getItem('user');
    if (!current) {
      current = {};
    } else {
      current = JSON.parse(current);
      current.address = selectedAddress;
      current.balance = selectedBalance;
      sessionStorage.setItem('user', JSON.stringify(current));
    }
  };

  render() {
    const { confirmLogout, showMobileMenu, chooseAcc, accSeleted } = this.state;
    const { className, bgColor, address, childKey, needAuth } = this.props;
    // console.log('render header');
    // console.log('selected CK', accSeleted);

    const Menus = this._getMenus().map(el => {
      // console.log('Menus', el);
      return el.subMenus ? (
        <li className="withSubMenus" key={el.text}>
          <span>{el.text}</span>
          <ItemsSubMenuWapper className="subMenus">{this._buildSubMenus(el.subMenus)}</ItemsSubMenuWapper>
          <i className="triangle" />
        </li>
      ) : (
        <li key={el.text}>
          <Link to={el.path}>
            <span>{el.text}</span>
          </Link>
        </li>
      );
    });

    const Accounts = childKey.map((el, index) => {
      return (
        <div className="account-item" key={index} onClick={() => this._selectAccount(index)}>
          <div className="selected">{el.address === address && <img src={selected} alt="" />}</div>
          <div className="account-avt">
            <img src={logo} alt="" />
          </div>
          <div className="account-info">
            <div className="accout-name">Account {index + 1}</div>
            <div className="accout-balances">{toTEA(el.balance) || 0} TEA</div>
          </div>
        </div>
      );
    });

    return (
      <WrapperHeader className={className} bgColor={bgColor}>
        <LogoDisplay>
          <LogoWrapper onClick={this._clickLogo}>
            <img src={logoHeader} alt="" />
          </LogoWrapper>
          {/* mobile.. */}
        </LogoDisplay>
        {!checkDevice.isMobile() && (
          <OclockWrapper>
            <Clock />
          </OclockWrapper>
        )}
        <MenuDisplay>
          <StyledUlTag>
            <li>
              <a href={explorer}>Explorer</a>
            </li>
            {Menus}
          </StyledUlTag>
          {address && (
            <ItemsSubMenu>
              <Icon type="account" />
              <AccountMenu>
                <li className="wallet-address">
                  <div>
                    <div className="title">Wallet</div>
                    <div className="address">{address}</div>
                  </div>
                  <div className="op">
                    <CopyToClipboard text={address} onCopy={this._copyAddress}>
                      <span title="copy address">
                        <Icon type="copy" />
                      </span>
                    </CopyToClipboard>
                    <span onClick={this._gotoExplorer} title="go to explorer" role="presentation">
                      <Icon type="link" />
                    </span>
                  </div>
                </li>

                <ListAccount>
                  <WrapAccount>{Accounts}</WrapAccount>
                </ListAccount>

                <ItemsAccount>
                  <li onClick={this._chooseAccount} role="presentation">
                    Create Account
                  </li>
                  <li onClick={this._importAccount} role="presentation">
                    Import Account
                  </li>
                </ItemsAccount>
                <ItemsAccount>
                  <li>
                    <Link to="/unlock">Change Wallet</Link>
                  </li>
                  <li>
                    <Link to="/create">Create New Wallet</Link>
                  </li>
                  <li onClick={this._showConfirmLogout} role="presentation">
                    Close Wallet
                  </li>
                </ItemsAccount>
              </AccountMenu>
            </ItemsSubMenu>
          )}
          <StyledUlTag>
            <li className="withSubMenus">
              <Icon type="detail-D" />
              <ItemsSubMenuWapper className="subMenus">
                <li>
                  <a href={faq}>Docs / FAQ</a>
                </li>
                <li>
                  <a href={forums}>Forums</a>
                </li>
                <li>{currentServer === 'mainnet' ? <a href={mainnet}>Mainnet</a> : <a href={testnet}>Testnet</a>}</li>
              </ItemsSubMenuWapper>
            </li>
          </StyledUlTag>
          <StyledIconMobileMenu onClick={this._showMobileMenu}>
            <Icon type="menu" size="20" />
          </StyledIconMobileMenu>
        </MenuDisplay>
        {showMobileMenu && (
          <MenuMobile address={address} close={this._hideMobileMenu} closeWallet={this._showConfirmLogout} />
        )}
        {confirmLogout && (
          <PuConfirm
            cancelText="Go Back"
            okText="Yes"
            confirm={this._confirmSignout(this.state)}
            cancel={() => this.setState({ confirmLogout: false })}
          >
            <ContentLogout>
              <ImageLogout />
              <p>Are you sure you want to close wallet?</p>
            </ContentLogout>
          </PuConfirm>
        )}
        {chooseAcc && (
          <PuConfirm
            cancelText="Cancel"
            okText="Create"
            confirm={this._createAcc}
            cancel={() => this.setState({ chooseAcc: false })}
          >
            <RadioTitle>
              <span>Which type of account do you want to create?</span>
              <hr />
              <RadioWRapper>
                <input type="radio" value="bankAcc" checked={accSeleted === 'bankAcc'} onChange={this._setAcc} /> Bank
                Account
                <input type="radio" value="regAcc" checked={accSeleted === 'regAcc'} onChange={this._setAcc} /> Regular
                Account
              </RadioWRapper>
            </RadioTitle>
          </PuConfirm>
        )}
        {needAuth && <GetKeyFromSessionStorage />}
      </WrapperHeader>
    );
  }
}

Header.defaultProps = {
  dispatch() {},
  privateKey: '',
  address: '',
  encryptedData: null,
  cipher: '',
  needAuth: false,
  bgColor: '',
};

const mapStateToProps = state => {
  const {
    privateKey,
    needAuth,
    address,
    encryptedData,
    cipher,
    flags,
    childKey,
    mnemonic,
    indexKey,
    balance,
  } = state.account;
  return {
    needAuth,
    privateKey,
    address,
    encryptedData,
    cipher,
    childKey,
    mnemonic,
    indexKey,
    flags,
    isIpValid: state.globalData.isIpValid,
    balance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAccount: data => {
      dispatch(actions.setAccount(data));
    },
    addNewAccount: data => {
      dispatch(actions.addNewAccount(data));
    },
    importNewAccount: data => {
      dispatch(actions.importNewAccount(data));
    },
    setBalanceChildKey: data => {
      dispatch(actions.setBalanceChildKey(data));
    },
    setNeedAuth: data => {
      dispatch(actions.setNeedAuth(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
