import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Main = styled.div`
  padding: 50px 0;
  min-height: calc(100vh - 100px);
`;
const Wrapper = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    position: initial;
    transform: none;
    @media (max-width: 1200px) {
      max-width: 960px;
    }
    @media (max-width: 991px) {
      max-width: 768px;
    }
    @media (max-width: 768px) {
      max-width: 670px;
    }
    @media (max-width: 640px) {
      max-width: 480px;
      padding: 0 20px;
    }
  }
`;

class BaseLayout extends PureComponent {
  render() {
    const { props } = this;
    return (
      <Main>
        <Header />
        <Wrapper>
          <div className="container">{props.children}</div>
        </Wrapper>
        <Footer />
      </Main>
    );
  }
}

export default BaseLayout;
