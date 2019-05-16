import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin:50px 0px 20px 0px;
  color:#848E9C;
  font-size:14px;
  @media (max-width:768px){display:none;}
  .nav {
    .select{
      color:#848484;
      .dropdown {
        i {color:#848484;
        }
      }
    }
  }
`
const FooterUpper = styled.div`
  display:flex;
  align-items:center;
  padding-bottom:8px;
  a {
    color:#848484;
    padding:0px 10px;
  }
  .nav-link {
    position:relative;
  }
`

class FooterCus extends PureComponent {
  render() {
    return (
      <FooterWrapper>
        <FooterUpper className="nav">
          <div className="nav-link">
            <a href="/home">Home</a>
          </div>
        </FooterUpper>
        <div>© 2018 - 2019 Ice Tea. All rights reserved.</div>
      </FooterWrapper>
    )
  }
}

export default withRouter(FooterCus);