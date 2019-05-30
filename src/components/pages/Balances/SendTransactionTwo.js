import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Wrapper } from './StyledSTOne';

const Title = styled.div`
  margin-top: 30px;
  .name {
    font-size: 20px;
    color: #212833;
    font-weight: bold;
    margin-right: 10px;
  }
  .fullName {
    font-size: 16px;
    color: #48515d;
  }
`;

const WrapperTwo = styled(Wrapper)`
  display: flex;
  border: none;
  font-size: 14px;
  padding-bottom: 0;
  margin-top: 5px;
  .title {
    width: 50px;
    color: #848e9c;
    margin-right: 10px;
  }
  .value {
    color: #212833;
    line-height: 30px;
    width: 390px;
    word-break: break-all;
  }
`;

const WrapperClose = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: #848e9c;
  &:hover {
    color: #f0b90b;
  }
`;

class SendTransactionTwo extends PureComponent {
  render() {
    const { asset, to, from, amount, memo } = this.props;
    return (
      <div>
        <Title>
          <span className="name">ITEA</span>
          <span className="fullName">IceTea Chain Native Token</span>
        </Title>
        <WrapperTwo>
          <div className="title">To:</div>
          <div className="value">{to}</div>
        </WrapperTwo>
        <WrapperTwo>
          <div className="title">From:</div>
          <div className="value">{from}</div>
        </WrapperTwo>
        <WrapperTwo>
          <div className="title">Amount:</div>
          <div className="value">{amount}</div>
        </WrapperTwo>
        <WrapperTwo>
          <div className="title">Memo:</div>
          <div className="value">{memo}</div>
        </WrapperTwo>
        <WrapperTwo>
          <div className="title">Fee:</div>
          <div className="value">0.1 ITEA</div>
        </WrapperTwo>
      </div>
    );
  }
}

SendTransactionTwo.defaultProps = {
  to: '',
  from: '',
  amount: '',
  memo: '',
  asset: {},
};

export default SendTransactionTwo;
