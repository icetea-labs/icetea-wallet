import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const SubMenuWapper = styled.div`
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

const UlLink = styled.ul`
  display: flex;
  flex-direction: row;
  & li {
    height: 50px;
    line-height: 50px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    position: relative;
    padding: 0px 15px;
  }
  & li a {
    height: 100%;
    display: block;
    color: rgb(255, 255, 255);
    font-size: 13px;
  }
  & li:hover {
    color: rgb(240, 185, 11);
    background: rgb(37, 45, 56);
  }
  & li:hover ul {
    display: block;
  }

  & li.withSubMenus .triangle {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translate(0px, -50%) rotate(0deg);
    width: 0px;
    height: 0px;
    transition: transform 0.3s ease-in-out 0s;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgb(255, 255, 255);
  }
`;

const menus = [
  {
    text: 'Explorer',
    path: '/explorer',
  },
  {
    text: 'Transaction',
    path: '/transactionHistory',
  },
  {
    text: 'Orders',
    subMenus: [
      {
        text: 'Open Orders',
        path: '/openOrders',
      },
      {
        text: 'Order History',
        path: '/orderHistory',
      },
      {
        text: 'Trade History',
        path: '/tradeHistory',
      },
      {
        text: 'Fee History',
        path: '/feeHistory',
      },
    ],
  },
  {
    text: 'Bots Store',
    path: '/botStore',
  },
  {
    text: 'Balances',
    path: '/balances',
  },
];

class Menu extends PureComponent {
  clickMenu = e => {
    const { history } = this.props;
    history.push(e);
  };

  buildSubMenus = subMenus => {
    var res = null;
    if (subMenus.length > 0) {
      res = subMenus.map((menu, index) => {
        return (
          <li className={menu.text} key={index} onClick={() => this.clickMenu(menu.path)}>
            {menu.text}
          </li>
        );
      });
    }
    return res;
  };

  buildMenus = menus => {
    var res = null;
    if (menus.length > 0) {
      menus.subMenus
        ? (res = (
            <li className="withSubMenus" key={menus.subMenus.text}>
              <span>{menus.subMenus.text}</span>
              <SubMenuWapper className="subMenus">{this.buildSubMenus(menus.subMenus)}</SubMenuWapper>
              <i className="triangle" />
            </li>
          ))
        : (res = menus.map((menu, index) => {
            return (
              <li className={menu.text} key={index} onClick={() => this.clickMenu(menu.path)}>
                {menu.text}
              </li>
            );
          }));
    }
    return res;
  };
  render() {
    return <UlLink>{this.buildMenus(menus)}</UlLink>;
  }
}

const mapStateToProps = state => {
  var account = state.acount;
  return {
    // privateKey: account.privateKey,
    // needAuth: account.needAuth,
    // address: account.address,
    // encryptedData: account.encryptedData,
    // cipher: account.cipher,
    // flags: account.flags,
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Menu));
