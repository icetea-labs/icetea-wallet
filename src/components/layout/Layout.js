import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../footer';

const Wrapper = styled.div`
  height: 100%;
`;
const DivPage = styled.div`
  flex-grow: 1;
  padding: 60px 0px;
`;
class Layout extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <DivPage>{this.props.children}</DivPage>
        <Footer />
      </Wrapper>
    );
  }
}
Layout.defaultProps = {
  children: null
};

export default Layout;
