import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import styled from 'styled-components';

const Main = styled.div`
  padding: 50px 0;
  min-height: calc(100vh - 100px);
`
const Wrapper = styled.div`

`

class BaseLayout extends Component {
  render() {
    return (
      <Main>
        <Header />
        <Wrapper>
          {this.props.children}
        </Wrapper>
        <Footer />
      </Main>
    );
  }
}

export default BaseLayout;