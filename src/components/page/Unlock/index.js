import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import * as actions from './../../../actions';
import logo from './../../../assets/img/logo.svg';
import unlock_recommend from './../../../assets/img/unlock_recommend.svg';
import ByMnemonic from './ByMnemonic';
import SelectUnlockType from './SelectUnlockType';
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
  UnlockRecommend
} from './Styled';

var itemsMenu = [{
  text: "WalletConnect",
  i18nId: "common.walletConnect",
  // img: rt.a,
  selected: false,
  recommended: true
}, {
  text: "Ledger Device",
  i18nId: "common.ledgerDevice",
  // img: it.a,
  selected: false,
  recommended: true
}, {
  text: "KeyStore File",
  i18nId: "common.keystoreFile",
  // img: it.a,
  selected: false
}, {
  text: "Mnemonic Phrase",
  i18nId: "common.mnemonicPhrase",
  // img: st.a,
  selected: true,
  recommended: true
}, {
  text: "Private Key",
  i18nId: "common.privateKey",
  // img: st.a,
  selected: false,
  hide: true,
  smallerIcon: true
}];
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
        return !!item.selected
      })[0].text
    };
  };

  componentDidMount() {
    // var types = this.state.types.map(el => {
    //   return "View Only" === el.text && (el.hide = true);
    // });
    // this.setState({
    //   types: types
    // })
  };

  _selectType = (items) => {
    var value;
    this.state.types.forEach(el => {
      if (el.text === items.text) {
        el.selected = true;
        value = items.text;
      } else {
        el.selected = false;
      }
    });
    this.setState({
      selectedType: value
    });
  };

  _unlock = (privateKey, address, keyStore, password) => {
    setTimeout(() => {
      var n = "";
      if (address) {
        this.props.getAccount(address);
        // !o.isHardware && privateKey && (n = Object(v.b)(e, r));
        sessionStorage.setItem("user", JSON.stringify({
          address: address,
          privateKey: n || privateKey,
          flags: false//o
        }));
        this.props.history.push("/Home");
      }

      this.props.setAccount({
        privateKey: privateKey,
        address: address,
        keyStore: keyStore,
        cipher: password,
        // flags: o,
        // encryptedData: n,
        userInfo: {}
      });
    })
  };

  _getSelectTypes = () => {
    var types = this.state.types;
    var items = [];
    return types.forEach(el => {
      el.hide || items.push({ text: el.text, value: el.text })
    }),
      items
  };

  _unlockWayChange = (item) => {
    this._selectType({ text: item });
  };

  render() {
    var { selectedType } = this.state;
    var items = this.state.types.filter(el => {
      return !el.hide
    });
    var listItems = items.map(item => {
      return (
        <li
          className={item.selected ? "on" : ""}
          onClick={() => this._selectType(item)}
          key={item.text}
          role="presentation"
          data-cy={"menu-".concat(item.text)}
        >
          <span>{item.text}</span>
          {
            item.recommended &&
            <UnlockRecommend src={unlock_recommend} ></UnlockRecommend>
          }
          <div className="selected"></div>
        </li>
      )
    });

    return (
      <QueueAnim delay={200} type={["top", "bottom"]} >
        <Wrapper key={1} >
          <Logo>
            <img src={logo} alt="logo" />
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
                    <SelectUnlockType
                      options={this._getSelectTypes()}
                      width="100%"
                      onChange={this._unlockWayChange}
                    />
                  </WrapperSelect>
                  <Menu>
                    {listItems}
                  </Menu>
                </WrapperMenu>
                {
                  "Mnemonic Phrase" === selectedType && <ByMnemonic unlock={this._unlock} />
                }
              </Content>
            </InBox>
          </OutBox>
        </Wrapper>
      </QueueAnim>
    );
  }
}

index.defaultProps = {
  setAccount: function () { },
  getAccount: function () { },
  history: {},
  formatI18nText: function () { }
};

const mapStateToProps = state => {
  var e = state.create;
  return {
    password: e.password,
    step: e.step,
    privateKey: e.privateKey,
    keyStoreText: e.keyStoreText,
    showPrivateKey: e.showPrivateKey,
    confirmMnemonic: e.confirmMnemonic,
    isLoading: state.globalData.isLoading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccount: (data) => {
      dispatch(actions.setAccount1(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));