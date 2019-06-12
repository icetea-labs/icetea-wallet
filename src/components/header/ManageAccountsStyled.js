import styled from 'styled-components';
import cancelblack from '../../assets/img/cancelblack.svg';

export const ItemsSubMenu = styled.div`
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
export const AccountMenu = styled.ul`
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

export const ListAccount = styled.div`
  position: relative;
  line-height: normal;
  max-height: 150px;
  overflow: auto;
`;

export const WrapAccount = styled.div`
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
export const ItemsAccount = styled.ul`
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

export const PUContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin-bottom: 20px;
  }
`;

export const ImageLogout = styled.div`
  width: 100px;
  height: 66px;
  background: url(${cancelblack}) 0% 0% / contain;
`;

export const RadioAccountsTypes = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  padding-right: 20px;
  /* border-right: 1px solid rgba(234, 236, 239); */
  li {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    width: 200px;
    padding-left: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    border-left: 4px solid #fff;
    font-size: 15px;
    position: relative;
    box-sizing: border-box;
    color: #263147;
    font-weight: 400;
    &:hover {
      background: #fff;
      font-weight: 600;
      box-shadow: 0px 0px 15px 0px rgba(223, 226, 231, 0.5);
      border-left: 4px solid #f0b90b;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    svg {
      width: 30px;
      height: 28px;
      margin-left: -2px;
    }
    .selected {
      width: 12px;
      height: 12px;
      display: block;
      border: 1px solid rgba(132, 142, 156, 1);
      opacity: 0.5;
      border-radius: 50%;
      position: absolute;
      background: #fff;
      right: 10px;
      &:before {
        content: '';
        position: absolute;
        display: none;
        width: 8px;
        height: 8px;
        background: #f0b90b;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .on {
    background: #fff;
    box-shadow: 0px 0px 15px 0px rgba(223, 226, 231, 0.5);
    border-left: 4px solid #f0b90b;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-weight: 600;
  }
  li.on .selected {
    display: block;
    border-color: #f0b90b;
    opacity: 1;
    &:before {
      display: block;
    }
  }
  /* @media (min-width: 320px) and (max-width: 623px) {
    display: none;
  } */
`;
