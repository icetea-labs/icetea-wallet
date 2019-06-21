import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0px 20px 0px;
  color: #848e9c;
  font-size: 14px;
  a {
    color: #848484;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    display: none;
  }
  .nav {
    .select {
      color: #848484;
      .dropdown {
        i {
          color: #848484;
        }
      }
    }
  }
`;
const FooterUpper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  a {
    padding: 0px 10px;
  }
  .nav-link {
    position: relative;
  }
`;

class FooterCus extends PureComponent {
  goHome = () => {
    const { props } = this;
    props.history.push('/home');
  };

  render() {
    return (
      <FooterWrapper>
        <FooterUpper className="nav">
          <div className="nav-link">
            <a onClick={this.goHome}>Home</a>
          </div>
        </FooterUpper>
        <p>
          &copy; 2019 &nbsp;
          <a href="https://trada.tech/team.html" target="_blank" rel="noopener noreferrer">
            TradaTech
          </a>
        </p>
      </FooterWrapper>
    );
  }
}

export default withRouter(FooterCus);
