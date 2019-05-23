import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../footer';

const Wrapper = styled.div`
  height: 100%;
`;

const WrapperContent = styled.div`
  flex-grow: 1;
  padding: 60px 0px;
`;

class Layout extends PureComponent {
  render() {
    const { props } = this;
    return (
      <Wrapper>
        <Header />
        <WrapperContent>{props.children}</WrapperContent>
        <Footer />
      </Wrapper>
    );
  }
}

Layout.defaultProps = {
  children: null,
};

export default Layout;
