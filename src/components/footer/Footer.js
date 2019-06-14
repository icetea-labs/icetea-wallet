import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { zIndex } from '../../constants/styles';
import { termOfService, forums, faq, telegram, twitter } from '../../config/networks';

const FooterWapper = styled.div`
  height: 50px;
  line-height: 50px;
  background: #12161c;
  width: 100%;
  color: #48515d;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: ${zIndex.footer};
  @media (max-width: 768px) {
    justify-content: flex-start;
    display: none;
  }
`;

const LeftFooter = styled.ul`
  display: flex;
  margin-left: 90px;
  li {
    margin-right: 30px;
  }
  a {
    color: #ffff;
    &:hover {
      color: #15b5dd;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const RightFooter = styled.div`
  display: flex;
  margin-right: 90px;
  color: #ffff;
  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
    justify-content: space-around;
  }
`;

const CopyRight = styled.div`
  display: flex;
  margin-right: 5px;
`;

const SocialFooter = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    margin-right: 5px;
    a {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #212833;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: #ffff;
      }
      &:hover i {
        color: #15b5dd;
      }
    }
  }
`;

class Footer extends PureComponent {
  render() {
    return (
      <FooterWapper>
        <LeftFooter>
          <li>
            <a href={termOfService} target="blank" rel="noopener">
              Terms of Service
            </a>
          </li>
          <li>
            <a href={forums} target="blank" rel="noopener">
              Forums
            </a>
          </li>
          <li>
            <a href={faq} target="blank" rel="noopener">
              Docs / FAQ
            </a>
          </li>
        </LeftFooter>
        <RightFooter>
          <CopyRight>© 2018 - 2019 Ice Tea. All rights reserved.</CopyRight>
          <SocialFooter>
            <li>
              <a href={telegram} target="blank" rel="noopener">
                <i className="iconfont icon-telegram" size="14" color="" />
              </a>
            </li>
            <li>
              <a href={twitter} target="blank" rel="noopener">
                <i className="iconfont icon-twitter" size="14" color="" />
              </a>
            </li>
          </SocialFooter>
        </RightFooter>
      </FooterWapper>
    );
  }
}

export default Footer;
