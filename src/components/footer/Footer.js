import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { zIndex } from '../../constants/styles';
import { termOfService, forums, faq, telegram, twitter } from '../../config/networks';

const FooterWapper = styled.div`
  height: 50px;
  line-height: 50px;
  background: #12161c;
  width: 100%;
  color: #848e9c;
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
    color: inherit;
    &:hover {
      color: #15b5dd;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const RightFooter = styled.div`
  display: block;
  margin-right: 90px;
  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
    justify-content: space-around;
  }
`;

const CopyRight = styled.div`
  display: block;
  margin: 3px 0;
  line-height: 18px;
  a {
    color: inherit;
    &:hover {
      color: #15b5dd;
    }
  }
  .footer-trada {
    display: flex;
    align-items: center;
  }
`;

const SocialFooter = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 10px;
  li {
    margin-right: 10px;
    a {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #212833;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      i {
        color: #848e9c;
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
            <a href={termOfService} target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
          </li>
          <li>
            <a href={forums} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </li>
          <li>
            <a href={faq} target="_blank" rel="noopener noreferrer">
              Docs
            </a>
          </li>
        </LeftFooter>
        <RightFooter>
          <CopyRight>
            <div className="footer-trada">
              <p>
                &copy; 2019 &nbsp;
                <a href="https://polkafoundry.com/" target="_blank" rel="noopener noreferrer">
                  Icetea Foundation
                </a>
              </p>
              <SocialFooter>
                <li>
                  <a href={telegram} target="_blank" rel="noopener noreferrer">
                    <i className="iconfont icon-telegram" size="14" color="" />
                  </a>
                </li>
                <li>
                  <a href={twitter} target="blank" rel="noopener noreferrer">
                    <i className="iconfont icon-twitter" size="14" color="" />
                  </a>
                </li>
              </SocialFooter>
            </div>
            <div>
              <p>
                Icons by &nbsp;
                <a target="_blank" href="https://thenounproject.com/" rel="noopener noreferrer">
                  the Noun Project &nbsp;
                </a>
                (
                <a target="_blank" href="https://thenounproject.com/" rel="noopener noreferrer">
                  icon list
                </a>
                ).
              </p>
            </div>
          </CopyRight>
        </RightFooter>
      </FooterWapper>
    );
  }
}

export default Footer;
