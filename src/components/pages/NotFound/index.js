import React, { PureComponent } from 'react'
import styled from 'styled-components';
import notFound from './../../../assets/img/404notFound.png';

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  font-size: 13px;
`;

const ImgWraper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255);
`;

class index extends PureComponent {
  render() {
    return (
      <Wrapper>
        <ImgWraper>
          <img src={notFound} alt="Not Found" />
        </ImgWraper>
      </Wrapper>
    )
  }
}

export default index;