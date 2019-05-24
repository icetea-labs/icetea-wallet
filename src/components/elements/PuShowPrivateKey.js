import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { PuCommont } from './PuCommont';
import { Icon } from './utils';

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 16px;
  color: #848e9c;
  span {
    margin-left: 5px;
  }
`;
const DivPrivateKey = styled.div`
  margin-top: 20px;
  background: #f9f9f9;
  border: 1px dashed #dfe2e7;
  padding: 20px;
  word-break: break-all;
  font-weight: bold;
  color: #212833;
  font-size: 18px;
  max-width: 320px;
  font-family: 'DIN';
`;

class PuShowPrivateKey extends PureComponent {
  render() {
    const { props } = this;
    return (
      <PuCommont close={props.close} title="Your Private Key">
        <Container>
          <Icon type="pencil" size="26" color="#848e9c" />
          <span>Back up the text below on paper and keep it somewhere secret and safe.</span>
        </Container>
        <DivPrivateKey>{props.privateKey}</DivPrivateKey>
      </PuCommont>
    );
  }
}

PuShowPrivateKey.defaultProps = {
  privateKey: '',
  close() {},
};

export { PuShowPrivateKey };
export default PuShowPrivateKey;
