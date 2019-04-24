import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import styled from 'styled-components'

const DivPage = styled.div`
  flex-grow: 1;
  padding: 60px 0px;
`;

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
          <DivPage>
            {this.props.children}
          </DivPage>
        <Footer />
      </div>
    );
  }
}

export default Layout;