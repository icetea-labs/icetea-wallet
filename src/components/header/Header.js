import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { zIndex } from '../../constants/styles';
import logo from '../../assets/img/logo.svg';
import cancelblack from '../../assets/img/cancelblack.svg';
import { Icon, checkDevice } from '../elements/utils';
import MenuMobile from '../menu/MenuMobile';
import { PuConfirmMnemonic } from '../elements/PuConfirmMnemonic';
import notifi from '../elements/Notification';
import Clock from './Clock';
import GetSessionPassword from './GetSessionPassword';
import { mainnet, testnet, currentServer, explorer, faq, forums } from '../../config/networks';

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
    width: 50px;
    height: 40px;
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

const ItemsAccount = styled.ul`
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

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // dateTime: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      confirmLogout: false,
      showMobileMenu: false,
      showSearchIcon: false,
    };
  }

  _confirmSignout = () => {
    return function() {
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

  _copyAddress = function() {
    notifi.info('copy success');
  };

  _getMenus = function() {
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

  render() {
    const { confirmLogout, showMobileMenu } = this.state;
    const { className, bgColor, address } = this.props;

    const Menus = this._getMenus().map(el => {
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

    return (
      <WrapperHeader className={className} bgColor={bgColor}>
        <LogoDisplay>
          <LogoWrapper onClick={this._clickLogo}>
            <img src={logo} alt="" />
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
              <ItemsAccount>
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
                <li>{'mainnet' === currentServer ? <a href={mainnet}>Mainnet</a> : <a href={testnet}>Testnet</a>}</li>
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
          <PuConfirmMnemonic
            cancelText="Go Back"
            okText="Yes"
            confirm={this._confirmSignout(this.state)}
            cancel={() => this.setState({ confirmLogout: false })}
          >
            <ContentLogout>
              <ImageLogout />
              <p>Are you sure you want to close wallet?</p>
            </ContentLogout>
          </PuConfirmMnemonic>
        )}
        {/* privateKey  account.. */}
        <GetSessionPassword />
      </WrapperHeader>
    );
  }
}

Header.defaultProps = {
  dispatch: function() {},
  privateKey: '',
  address: '',
  encryptedData: null,
  cipher: '',
  needAuth: false,
  bgColor: '',
};

const mapStateToProps = state => {
  const { privateKey, needAuth, address, encryptedData, cipher, flags } = state.account;
  return {
    needAuth: needAuth,
    privateKey: privateKey,
    address: address,
    encryptedData: encryptedData,
    cipher: cipher,
    flags: flags,
    isIpValid: state.globalData.isIpValid,
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Header));
