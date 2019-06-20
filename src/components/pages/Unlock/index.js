import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';

import { codec, AccountType } from '@iceteachain/common';
import * as actions from '../../../store/actions/account';
import logo from '../../../assets/img/logo.svg';
import unlockRecommend from '../../../assets/img/unlock_recommend.svg';
import ByMnemonic from './ByMnemonic';
import ByPrivateKey from './ByPrivateKey';
import SelectUnlockType from './SelectUnlockType';
import { utils } from '../../../utils';
import tweb3 from '../../../service/tweb3';
import {
  Wrapper,
  Logo,
  OutBox,
  InBox,
  Title,
  Content,
  WrapperMenu,
  SubTitle,
  WrapperSelect,
  Menu,
  UnlockRecommend,
} from './styled';
import FooterCus from '../FooterCus';

const itemsMenu = [
  {
    text: 'WalletConnect',
    i18nId: 'common.walletConnect',
    // img: rt.a,
    selected: false,
    recommended: true,
  },
  {
    text: 'Ledger Device',
    i18nId: 'common.ledgerDevice',
    // img: it.a,
    selected: false,
    recommended: true,
  },
  {
    text: 'KeyStore File',
    i18nId: 'common.keystoreFile',
    // img: it.a,
    selected: false,
  },
  {
    text: 'Mnemonic Phrase',
    i18nId: 'common.mnemonicPhrase',
    // img: st.a,
    selected: true,
    recommended: true,
  },
  {
    text: 'Private Key',
    i18nId: 'common.privateKey',
    // img: st.a,
    selected: false,
    hide: true,
    smallerIcon: true,
  },
];
// {
//   text: "View Only",
//   i18nId: "common.viewOnly",
//   // img: ht,
//   selected: false,
//   hide: true
// }];

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      types: itemsMenu,
      selectedType: itemsMenu.filter(item => {
        return !!item.selected;
      })[0].text,
    };
  }

  componentDidMount() {
    // var types = this.state.types.map(el => {
    //   return "View Only" === el.text && (el.hide = true);
    // });
    // this.setState({
    //   types: types
    // })
  }

  _selectType = items => {
    let value;
    const { types } = this.state;
    types.forEach(el => {
      if (el.text === items.text) {
        el.selected = true;
        value = items.text;
      } else {
        el.selected = false;
      }
    });
    this.setState({
      selectedType: value,
    });
  };

  _unlock = (privateKey, address, keyStore, password, mnemonic, indexKey) => {
    const { props } = this;
    let isBankAccount = '';

    setTimeout(() => {
      let encryptedData = '';
      if (mnemonic) {
        encryptedData = utils.encryptMnemonic(mnemonic, password);
      }
      if (address) {
        const childKey = {
          index: 0,
          address: '',
          selected: true,
          balance: 0,
          privateKey: '',
        };
        childKey.index = indexKey;
        childKey.address = address;

        isBankAccount = codec.isAddressType(address, AccountType.BANK_ACCOUNT);

        props.setAccount({
          indexBankKey: isBankAccount ? indexKey : 0,
          indexRegularKey: isBankAccount ? 0 : indexKey,
          address,
          privateKey,
          cipher: password,
          mnemonic,
          keyStore,
          childKey: [childKey],
          // flags: o,
          encryptedData,
          userInfo: {},
        });
        // set defaultAccount for tweb3
        tweb3.wallet.importAccount(privateKey);
        tweb3.wallet.defaultAccount = address;
        // this.props.getAccount(address)
        // !o.isHardware && privateKey && (n = Object(v.b)(e, r));
        const newChildKey = Object.assign({}, childKey);
        delete newChildKey.privateKey;
        delete newChildKey.balance;
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            indexBankKey: isBankAccount ? indexKey : 0,
            indexRegularKey: isBankAccount ? 0 : indexKey,
            address,
            mnemonic: encryptedData || mnemonic,
            // mnemonic,
            flags: false, // o
            childKey: [newChildKey],
          })
        );

        props.history.push('/balances');
      }
    });
  };

  _getSelectTypes = () => {
    const { types } = this.state;
    const items = [];
    return (
      types.forEach(el => {
        el.hide || items.push({ text: el.text, value: el.text });
      }),
      items
    );
  };

  _unlockWayChange = item => {
    this._selectType({ text: item });
  };

  gotoHome = () => {
    const { props } = this;
    props.history.push('/Home');
  };

  render() {
    const { selectedType, types } = this.state;
    const items = types.filter(el => {
      return !el.hide;
    });
    const listItems = items.map(item => {
      return (
        <li
          className={item.selected ? 'on' : ''}
          onClick={() => this._selectType(item)}
          key={item.text}
          role="presentation"
          data-cy={'menu-'.concat(item.text)}
        >
          <span>{item.text}</span>
          {item.recommended && <UnlockRecommend src={unlockRecommend} />}
          <div className="selected" />
        </li>
      );
    });

    return (
      <QueueAnim delay={200} type={['top', 'bottom']}>
        <Wrapper key={1}>
          <Logo>
            <img src={logo} alt="logo" onClick={this.gotoHome} />
          </Logo>
          <OutBox>
            <InBox>
              <div>
                <Title>Unlock Your Wallet</Title>
              </div>
              <Content>
                <WrapperMenu>
                  <SubTitle>Select how you would like to unlock</SubTitle>
                  <WrapperSelect>
                    <SelectUnlockType options={this._getSelectTypes()} width="100%" onChange={this._unlockWayChange} />
                  </WrapperSelect>
                  <Menu>{listItems}</Menu>
                </WrapperMenu>
                {selectedType === 'WalletConnect' && <ByPrivateKey />}
                {selectedType === 'Ledger Device' && <ByPrivateKey />}
                {selectedType === 'KeyStore File' && <ByPrivateKey />}
                {selectedType === 'Mnemonic Phrase' && <ByMnemonic unlock={this._unlock} />}
              </Content>
            </InBox>
            <FooterCus />
          </OutBox>
        </Wrapper>
      </QueueAnim>
    );
  }
}

index.defaultProps = {
  setAccount() {},
  getAccount() {},
};

const mapDispatchToProps = dispatch => {
  return {
    setAccount: data => {
      dispatch(actions.setAccount(data));
    },
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withRouter(index));
