import React, { PureComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter } from 'react-router-dom';
import { DivSelectWordBase, Icon } from '../elements/utils';
import notifi from '../elements/Notification';
import { faq, forums } from '../../config/networks';
import {
  LayoutDisplay,
  WrapperMenu,
  WrapperIconClose,
  WrapperItemAccount,
  PositionItemsMenu,
} from './MenuMobileStyled';

class MenuMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.layoutRef = React.createRef();
    this.state = {
      path: '/balances',
      hide: false,
      // showNodes: false,
      menuGroups: [
        // {
        //   group: 'one',
        //   menus: [
        //     {
        //       text: 'Markets',
        //       path: '/',
        //     },
        //     {
        //       text: 'Exchange',
        //       path: '/trade',
        //     },
        //   ],
        // },
        {
          group: 'two',
          menus: [
            {
              text: 'Balances',
              path: '/balances',
            },
            // {
            //   text: 'Open Orders',
            //   path: '/openOrders',
            // },
            {
              text: 'History',
              path: '/transactionHistory',
            },
          ],
        },
        {
          group: 'three',
          menus: [
            {
              text: 'Change Wallet',
              path: '/unlock',
            },
            {
              text: 'Create New Wallet',
              path: '/create',
            },
          ],
        },
      ],
      notLoginMenuGroup: [
        // {
        //   group: 'one',
        //   menus: [
        //     {
        //       text: 'Markets',
        //       path: '/',
        //     },
        //     {
        //       text: 'Exchange',
        //       path: '/trade',
        //     },
        //   ],
        // },
        {
          group: 'three',
          menus: [
            {
              text: 'Create New Wallet',
              path: '/create',
            },
            {
              text: 'Unlock Wallet',
              path: '/unlock',
            },
          ],
        },
      ],
    };
  }

  _clickMenu = path => {
    const { props } = this;
    props.history.push(path);
  };

  _buildMenus = () => {
    const { menuGroups, path, notLoginMenuGroup } = this.state;
    const { address } = this.props;
    return (address ? menuGroups : notLoginMenuGroup).map(el => {
      const li = el.menus.map((item, i) => {
        return (
          <li className={path === item.path ? 'current' : ''} key={i} onClick={() => this._clickMenu(item.path)}>
            {item.text}
          </li>
        );
      });
      return <ul key={el.group}>{li}</ul>;
    });
  };

  _hide = () => {
    const { props } = this;
    this.setState({
      hide: true,
    });
    setTimeout(() => {
      props.close && props.close();
    }, 100);
  };

  _clickLayout = e => {
    e.target === this.layoutRef.current && this._hide();
  };

  _copyAddress = () => {
    notifi.info('copy success');
  };

  render() {
    const { props } = this;
    const { address } = this.props;
    // const { hide, showNodes, currentNetWork } = this.state;
    const { hide } = this.state;

    return (
      <LayoutDisplay ref={this.layoutRef} onClick={this._clickLayout}>
        <WrapperMenu hide={hide}>
          <WrapperIconClose onClick={this._hide}>
            <Icon type="close" size="20" />
          </WrapperIconClose>
          <WrapperItemAccount show={!!address}>
            <Icon type="account" size="40" />
            <div className="address-info">
              <h2>Wallet</h2>
              <DivSelectWordBase>
                <div className="address">{address}</div>
                <CopyToClipboard text={address} onCopy={this._copyAddress}>
                  <span title="copy address">
                    <Icon type="copy" />
                  </span>
                </CopyToClipboard>
              </DivSelectWordBase>
            </div>
          </WrapperItemAccount>
          {/* choose node... */}
          <PositionItemsMenu>{this._buildMenus()}</PositionItemsMenu>
          <DivSelectWordBase className="footer">
            {address && <div onClick={props.closeWallet}>Close Wallet</div>}
            <div className="docs">
              <a href={faq} target="_blank" rel="noopener noreferrer">
                Docs/FAQ
              </a>
            </div>
            <div className="forums">
              <a href={forums} target="_blank" rel="noopener noreferrer">
                Forums
              </a>
            </div>
          </DivSelectWordBase>
        </WrapperMenu>
      </LayoutDisplay>
    );
  }
}

MenuMobile.defaultProps = {
  closeWallet() {},
  close() {},
  address: '',
};

export default withRouter(MenuMobile);
