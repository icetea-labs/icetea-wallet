import styled from 'styled-components';

import { zIndex } from '../../constants/styles';

export const WrapperHeader = styled.div`
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
export const LogoDisplay = styled.div`
  display: flex;
`;
export const LogoWrapper = styled.div`
  color: #15b5dd;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 150px;
    /* height: 40px; */
  }
`;
export const OclockWrapper = styled.div`
  margin-left: 20px;
  padding-top: 10px;
  @media (max-width: 868px) {
    display: none;
  }
`;
export const MenuDisplay = styled.div`
  justify-content: flex-end;
  display: flex;
  position: absolute;
  right: 15px;
`;
export const StyledUlTag = styled.ul`
  display: flex;
  flex-direction: row;
  .menu-item-selected {
    color: #15b5dd;
    text-decoration: underline;
  }
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

export const ItemsSubMenuWapper = styled.ul`
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
      color: #15b5dd;
    }
    @media (max-width: 768px) {
      background: inherit;
    }
  }
`;

export const StyledIconMobileMenu = styled.div`
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
