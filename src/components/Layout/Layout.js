import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';

class Layout extends Component {
  render() {
    return (
      <div className="layout_container">
        <Header />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;