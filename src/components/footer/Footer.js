import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="infomation">
            © 2018 - 2019 TradaTech All rights reserved
            <a href="http://trada.tech" rel="noopener noreferrer" target="_blank"><i className="fa fa-paper-plane"></i></a>
            <a href="http://trada.tech" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook"></i></a>
            <a href="http://trada.tech" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;