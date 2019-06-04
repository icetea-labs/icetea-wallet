import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Layout from '../layout';
import { BtnActive } from '../elements/utils';
import default1 from '../../assets/img/1_default.svg';
import hover1 from '../../assets/img/1_hover.svg';
import default2 from '../../assets/img/2_default.svg';
import hover2 from '../../assets/img/2_hover.svg';
import default3 from '../../assets/img/3_default.svg';
import hover3 from '../../assets/img/3_hover.svg';
import default4 from '../../assets/img/4_default.svg';
import hover4 from '../../assets/img/4_hover.svg';
import default5 from '../../assets/img/5_default.svg';
import hover5 from '../../assets/img/5_hover.svg';
import default6 from '../../assets/img/6_default.svg';
import hover6 from '../../assets/img/6_hover.svg';

const AllBg = styled.div`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px 0px;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  min-width: 1024px;
  background: linear-gradient(102deg, rgb(40, 47, 63) 0%, rgb(18, 22, 28) 100%);
`;

const HomeWrapper = styled.div`
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 650px;
`;

const HomeOutBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HomeTitle = styled.p`
  font-size: 40px;
  color: #fff;
  text-align: center;
  font-weight: 500;
  white-space: nowrap;
  min-width: 750px;
  @media (max-width: 1440px) {
    transform: scale(0.8);
  }
`;

const HomeSubTitle = styled.p`
  font-size: 20px;
  color: #fff;
  text-align: center;
  @media (max-width: 1440px) {
    transform: scale(0.8);
  }
`;

const HomeBtnWrap = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  font-family: 'ProximaNova';
`;

const BtnWrapper = styled(HomeBtnWrap)`
  justify-content: center;
  margin-top: 24px;
`;

const BtnCus = styled(BtnActive)`
  margin-right: 40px;
  width: 170px;
  a {
    color: inherit;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  @media (max-width: 1440px) {
    width: 110px;
    height: 30px;
    line-height: 28px;
    font-size: 12px;
  }
`;

const BtnCus1 = styled(BtnActive)`
  background: inherit;
  border: 1px solid #f0b90b;
  color: #f0b90b;
  width: 170px;
  &:hover {
    background: linear-gradient(90deg, rgba(239, 184, 11, 1) 0%, rgba(251, 218, 60, 1) 100%);
    color: #fff;
  }
  a {
    color: inherit;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  @media (max-width: 1440px) {
    width: 110px;
    height: 30px;
    line-height: 28px;
    font-size: 12px;
  }
`;

const GuideWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  a:hover {
    text-decoration: none;
  }
  li {
    color: #eaecef;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    width: 157px;
    height: 150px;
    cursor: pointer;
    img {
      width: 100px;
      height: 100px;
    }
    img.hover {
      display: none;
    }
    &:hover img.hover {
      display: block;
      transform: scale(1.2);
    }
    &:hover img.default {
      display: none;
    }
  }
  @media (max-width: 1440px) {
    margin-top: 10px;
    li {
      transform: scale(0.8);
    }
  }
`;

class Home extends Component {
  gotoTrade = () => {
    const { props } = this;
    props.history.push('/unlock');
  };

  gotoCreate = () => {
    const { props } = this;
    props.history.push('/create');
  };

  render() {
    return (
      <AllBg>
        <Layout>
          <React.Fragment>
            <HomeWrapper>
              <HomeOutBox>
                <HomeTitle>IceTea Wallet (TESTNET)</HomeTitle>
                <HomeSubTitle>A powerful Wallet</HomeSubTitle>
                <BtnWrapper>
                  <BtnCus onClick={this.gotoTrade}>
                    <span>Acess Your Wallet</span>
                  </BtnCus>
                  <BtnCus1 onClick={this.gotoCreate}>
                    <span>Create A Wallet</span>
                  </BtnCus1>
                </BtnWrapper>
                <GuideWrapper>
                  <a href="https://icetea.io/" target="_blank" rel="noopener noreferrer">
                    <li>
                      <img src={default1} className="default" alt="" />
                      <img src={hover1} className="hover" alt="" />
                      <span>How to Create a Wallet</span>
                    </li>
                  </a>
                  <a href="https://icetea.io/" target="_blank" rel="noopener noreferrer">
                    <li>
                      <img alt="" src={default2} className="default" />
                      <img alt="" src={hover2} className="hover" />
                      <span>How to Access Your Wallet</span>
                    </li>
                  </a>
                  <a href="https://icetea.io/" target="_blank" rel="noopener noreferrer">
                    <li>
                      <img alt="" src={default3} className="default" />
                      <img alt="" src={hover3} className="hover" />
                      <span>Interface Guide</span>
                    </li>
                  </a>
                </GuideWrapper>
                <GuideWrapper>
                  <a href="https://icetea.io/" target="_blank" rel="noopener noreferrer">
                    <li>
                      <img alt="" src={default4} className="default" />
                      <img alt="" src={hover4} className="hover" />
                      <span>Funding Your Testnet Account</span>
                    </li>
                  </a>
                  <a href="https://icetea.io/" target="_blank" rel="noopener noreferrer">
                    <li>
                      <img alt="" src={default5} className="default" />
                      <img alt="" src={hover5} className="hover" />
                      <span>IceTea Explorer Guide</span>
                    </li>
                  </a>
                  <a href="https://icetea.io/" target="_blank" rel="noopener noreferrer">
                    <li>
                      <img alt="" src={default6} className="default" />
                      <img alt="" src={hover6} className="hover" />
                      <span>Things to Avoid</span>
                    </li>
                  </a>
                </GuideWrapper>
              </HomeOutBox>
            </HomeWrapper>
          </React.Fragment>
        </Layout>
      </AllBg>
    );
  }
}

export default withRouter(Home);
