import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import banner from '../../assets/img/banner.png';
import newWallet from '../../assets/img/newWallet.svg';
import unlockWallet from '../../assets/img/unlockWallet.svg';

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
  background: #fff;
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
  @media (min-width: 1025px) {
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
`;

const PageContainer = styled.div`
  @media (min-width: 1025px) {
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;
    display: block;
  }
`;

const Banner = styled.div`
  @media (min-width: 1025px) {
    padding: 30px;
    padding-right: 0;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
  }
  .banner-text {
    -webkit-box-flex: 1;
    flex: 1;
    display: block;
    color: #003945;
    h1 {
      font-size: 45px;
      font-weight: 700;
      line-height: 47px;
      margin-bottom: 8px;
      letter-spacing: -1px;
    }
    p {
      color: #506175;
      margin-top: 17px;
      max-width: 450px;
      @media (min-width: 1025px) {
        color: #506175;
        line-height: 21px;
      }
    }
  }
  .banner-image {
    -webkit-box-flex: 1;
    flex: 1;
    display: block;
    img {
      @media (min-width: 1025px) {
        height: 452px;
        margin: 0 0 0 auto;
        display: block;
      }
      @media (max-width: 1024px) and (max-width: 1100px) and (min-width: 415px) {
        height: auto;
        margin-left: 20px;
        width: 300px;
      }
    }
  }
`;

const PromoCard = styled.div`
  grid-column-gap: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  a {
    background-color: transparent;
    text-decoration: none;
  }
`;

const Card = styled.div`
  &.createWallet {
    background-color: #5a78f0;
  }

  &.accessWallet {
    background-color: #05c0a5;
  }

  &:hover {
    -webkit-box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
    box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
    top: -20px;
  }
  @media (min-width: 1025px) {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
    top: 0px;
    height: 100%;
    border-radius: 10px;
    color: #fff;
    margin-bottom: 0;
    padding: 30px 40px;
    position: relative;
  }
  @media (max-width: 1024px) and (min-width: 415px) {
    border-radius: 10px;
    color: #fff;
    margin-bottom: 10px;
    padding: 30px 40px;
    position: relative;
  }
`;

const CardWrapper = styled.div`
  -webkit-box-align: center;
  text-decoration: none;
  align-items: center;
  display: flex;
`;

const CardImage = styled.div`
  padding-right: 40px;
  img {
    width: 87px;
  }
`;

const CardContent = styled.div`
  color: #fff;
  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  p {
    line-height: 19px;
    margin-bottom: 20px;
  }
  .button {
    color: #fff;
    display: inline-block;
    font-size: 15px;
    font-weight: 500;
  }
`;

class Home extends Component {
  gotoUnlock = () => {
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
        <HomeWrapper>
          <HomeOutBox>
            <PageContainer>
              <Banner>
                <div className="banner-text">
                  <h1>Icetea Wallet</h1>
                  <p>
                    Icetea Wallet is a free, client-side interface helping you interact with the Icetea blockchain. Our
                    easy-to-use, open-source platform allows you to generate wallets, interact with smart contracts, and
                    so much more.
                  </p>
                </div>
                <div className="banner-image">
                  <img src={banner} alt="" />
                </div>
              </Banner>
              <PromoCard>
                <div onClick={this.gotoCreate}>
                  <Card className="createWallet">
                    <CardWrapper>
                      <CardImage>
                        <img src={newWallet} alt="" />
                      </CardImage>
                      <CardContent>
                        <h2>Create A New Wallet</h2>
                        <p>
                          Obtain an mnemonic and generate your TEA address. Saving and safekeeping the mnemonic will be
                          your responsibility.
                        </p>
                        <p className="button">Get Started &gt;&gt;&gt;</p>
                      </CardContent>
                    </CardWrapper>
                  </Card>
                </div>
                <div onClick={this.gotoUnlock}>
                  <Card className="accessWallet">
                    <CardWrapper>
                      <CardImage>
                        <img src={unlockWallet} alt="" />
                      </CardImage>
                      <CardContent>
                        <h2>Access My Wallet</h2>
                        <p>
                          Send or swap your TEA, interact with smart contracts, and more! This is where the magic
                          happens..
                        </p>
                        <p className="button">Access Now &gt;&gt;&gt;</p>
                      </CardContent>
                    </CardWrapper>
                  </Card>
                </div>
              </PromoCard>
            </PageContainer>
          </HomeOutBox>
        </HomeWrapper>
      </AllBg>
    );
  }
}

export default withRouter(Home);
