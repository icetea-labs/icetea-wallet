import styled from 'styled-components';
import { zIndex } from '../../constants/styles';

export const LayoutDisplay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: ${zIndex.modal};
`;
export const WrapperMenu = styled.div`
  width: 300px;
  background: #12161c;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  font-size: 16px;
  padding-top: 50px;
  transform: ${props => (props.hide ? 'translate(100%,0)' : 'translate(0,0)')};
  transition: transform 0.3s linear;
  animation: bounce 0.3s linear;
  ul {
    margin-left: 40px;
    border-bottom: 1px solid #212833;
    padding: 10px 0;
    li.current {
      color: #15b5dd;
      &:before {
        content: ' ';
        position: absolute;
        display: block;
        height: 2px;
        width: 12px;
        left: 0;
        bottom: 6px;
        background: #15b5dd;
      }
    }
    li {
      height: 40px;
      line-height: 40px;
      position: relative;
      a {
        height: 100%;
        display: block;
        color: inherit;
        font-size: 16px;
        &:hover {
          text-decoration: none;
        }
      }
    }
    li.withSubMenus {
      height: auto;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 40px;
    right: 0;
  }
  .docs {
    margin-left: 30px;
    a {
      color: #848e9c;
      font-size: 12px;
    }
  }
  .forums {
    margin-left: 30px;
    a {
      color: #848e9c;
      font-size: 12px;
    }
  }
  @media (max-width: 768px) {
    display: block;
    .subMenus {
      display: block;
      position: relative;
      top: 0;
      li {
        text-align: left;
      }
    }
  }
  @keyframes bounce {
    0% {
      transform: translateX(100%);
    }
    40% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;
export const WrapperIconClose = styled.div`
  position: absolute;
  right: 15px;
  top: 0;
  &:before {
    content: ' ';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: -20px;
    width: 60px;
  }
`;
export const WrapperItemAccount = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  padding-left: 30px;
  margin-bottom: 20px;
  .address-info {
    line-height: 20px;
    margin-left: 10px;
    h2 {
      font-size: 18px;
    }
  }
  .address {
    width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 10px;
    color: #848e9c;
  }
`;
export const PositionItemsMenu = styled.div`
  position: relative;
`;
