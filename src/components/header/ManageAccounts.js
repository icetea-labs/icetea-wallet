import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { codec, AccountType } from '@iceteachain/common';
import tweb3 from '../../service/tweb3';
import * as actions from '../../store/actions/account';
import { utils, toTEA } from '../../utils/utils';
import selected from '../../assets/img/checked.png';
import logo from '../../assets/img/logo.svg';
import { explorer } from '../../config/networks';

import { Icon } from '../elements/utils';
import notifi from '../elements/Notification';
import GetKeyFromSessionStorage from './GetKeyFromSessionStorage';
import { PuConfirm } from '../elements/PuConfirm';
import {
  ItemsSubMenu,
  AccountMenu,
  ListAccount,
  ItemsAccount,
  WrapAccount,
  PUContents,
  ImageLogout,
  RadioAccountsTypes,
} from './ManageAccountsStyled';

const accountsTypes = [
  {
    text: 'Bank Account',
    type: AccountType.BANK_ACCOUNT,
    selected: true,
    recommended: true,
  },
  {
    text: 'Regular Account',
    type: AccountType.REGULAR_ACCOUNT,
    selected: false,
    recommended: true,
  },
];

class ManageAccounts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowLogout: false,
      isShowSelectAccountType: false,
      loading: false,
      types: accountsTypes,
      selectedType: accountsTypes.filter(item => {
        return !!item.selected;
      })[0].type,
    };
  }

  // check viec lien tuc setaccount.
  async componentDidMount() {
    await this.updateBalance();
  }

  updateBalance = async () => {
    const { childKey, setAccount } = this.props;
    const childKeyTmp = [];
    for (let i = 0; i < childKey.length; i += 1) {
      const newChild = Object.assign({}, childKey[i]);
      const { balance } = await tweb3.getBalance(newChild.address);
      newChild.balance = balance;
      childKeyTmp.push(newChild);
    }
    setAccount({ childKey: childKeyTmp });
  };

  _gotoExplorer = () => {
    const { address } = this.props;
    window.open(''.concat(explorer, '/address/').concat(address), 'blank');
  };

  _copyAddress = () => {
    notifi.info('copy success');
  };

  _selectAccount = index => {
    const { mnemonic, childKey, setAccount } = this.props;
    const selectedAddress = childKey[index].address;
    const selectedBalance = childKey[index].balance;
    let privateKey = '';
    // console.log('childKey', childKey);
    // console.log('aa', index, childKey[index].index);
    if (mnemonic) {
      privateKey = utils.getPrivateKeyFromMnemonic(mnemonic, childKey[index].index);
    }
    // console.log('privateKey', childKey[index].index, privateKey);

    setAccount({
      address: selectedAddress,
      balance: selectedBalance,
      privateKey,
    });

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

  _createAccount = () => {
    const { mnemonic, setNeedAuth } = this.props;

    if (!mnemonic) setNeedAuth(true);

    this.setState({
      isShowSelectAccountType: true,
    });
  };

  _puSelectType = items => {
    let value;
    const { types } = this.state;

    types.forEach(el => {
      if (el.text === items.text) {
        el.selected = true;
        value = items.type;
      } else {
        el.selected = false;
      }
    });

    this.setState({
      selectedType: value,
    });
  };

  _createAccountWithType = async () => {
    this.setState({
      loading: true,
    });
    const { mnemonic, addBankAccount, addRegularAccount, indexBankKey, indexRegularKey } = this.props;
    const { selectedType } = this.state;
    const childKey = {
      indexKey: 0,
      address: '',
      selected: false,
      balance: 0,
      privateKey: '',
    };
    const options = { index: 0, type: AccountType.BANK_ACCOUNT };
    let account = null;
    if (selectedType === AccountType.BANK_ACCOUNT) {
      options.index = indexBankKey + 1;
      options.type = AccountType.BANK_ACCOUNT;
      account = utils.recoverAccountFromMneomnic(mnemonic, options);
    } else {
      options.index = indexRegularKey + 1;
      options.type = AccountType.REGULAR_ACCOUNT;
      account = utils.recoverAccountFromMneomnic(mnemonic, options);
    }

    const { balance } = await tweb3.getBalance(account.address);
    childKey.address = account.address;
    childKey.indexKey = account.index;
    childKey.balance = balance;
    childKey.privateKey = utils.getPrivateKeyFromMnemonic(mnemonic, account.index);

    tweb3.wallet.importAccount(childKey.privateKey);

    setTimeout(() => {
      selectedType === AccountType.BANK_ACCOUNT ? addBankAccount(childKey) : addRegularAccount(childKey);
      notifi.info('Create success');

      this.setState({
        isShowSelectAccountType: false,
        loading: false,
      });
    }, 500);
  };

  _importAccount = () => {
    console.log('aaaaa');
  };

  _showConfirmLogout = () => {
    this.setState({
      isShowLogout: true,
    });
  };

  _confirmSignout = () => {
    return () => {
      // userStorage.isWalletConnect && state && state.disconnect();
      sessionStorage.removeItem('user');
      window.localStorage.removeItem('walletconnect');
      window.location.reload();
    };
  };

  render() {
    const { address, privateKey, childKey, needAuth } = this.props;
    const { isShowLogout, isShowSelectAccountType, types, loading } = this.state;

    const Accounts = childKey.map((el, index) => {
      return (
        <div className="account-item" key={index} onClick={() => this._selectAccount(index)}>
          <div className="selected">{el.address === address && <img src={selected} alt="" />}</div>
          <div className="account-avt">
            <img src={logo} alt="" />
          </div>
          <div className="account-info">
            <div className="accout-name">Account {index + 1}</div>
            <div className="accout-balances">
              {codec.isAddressType(el.address, AccountType.REGULAR_ACCOUNT)
                ? 'REGULAR ACCOUNT'
                : `${toTEA(el.balance) || 0} TEA`}
            </div>
          </div>
        </div>
      );
    });

    const ListSelectItems = types.map(item => {
      return (
        <li
          className={item.selected ? 'on' : ''}
          onClick={() => this._puSelectType(item)}
          key={item.text}
          role="presentation"
          data-cy={'menu-'.concat(item.text)}
        >
          <span>{item.text}</span>
          {/* {item.recommended && <UnlockRecommend src={unlockRecommend} />} */}
          <div className="selected" />
        </li>
      );
    });

    return (
      <React.Fragment>
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
              <li onClick={this._createAccount} role="presentation">
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
        {isShowLogout && (
          <PuConfirm
            cancelText="Go Back"
            okText="Yes"
            confirm={this._confirmSignout(this.state)}
            cancel={() => this.setState({ isShowLogout: false })}
          >
            <PUContents>
              <ImageLogout />
              <p>Are you sure you want to close wallet?</p>
            </PUContents>
          </PuConfirm>
        )}
        {privateKey && isShowSelectAccountType && (
          <PuConfirm
            loading={loading}
            cancelText="Cancel"
            okText="Create"
            confirm={this._createAccountWithType}
            cancel={() => this.setState({ isShowSelectAccountType: false })}
          >
            <PUContents>
              <p>Which type of account do you want to create?</p>
              <RadioAccountsTypes>{ListSelectItems}</RadioAccountsTypes>
            </PUContents>
          </PuConfirm>
        )}
        {needAuth && <GetKeyFromSessionStorage />}
      </React.Fragment>
    );
  }
}

ManageAccounts.defaultProps = {
  needAuth: false,
  encryptedData: null,
  cipher: '',
  address: '',
};

const mapStateToProps = state => {
  const { account } = state;
  return {
    needAuth: account.needAuth,
    privateKey: account.privateKey,
    address: account.address,
    encryptedData: account.encryptedData,
    cipher: account.cipher,
    childKey: account.childKey,
    mnemonic: account.mnemonic,
    indexBankKey: account.indexBankKey,
    indexRegularKey: account.indexRegularKey,
    flags: account.flags,
    isIpValid: state.globalData.isIpValid,
    balance: account.balance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAccount: data => {
      dispatch(actions.setAccount(data));
    },
    addBankAccount: data => {
      dispatch(actions.addBankAccount(data));
    },
    addRegularAccount: data => {
      dispatch(actions.addRegularAccount(data));
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
)(withRouter(ManageAccounts));
