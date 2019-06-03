import React from 'react';
import QueueAnim from 'rc-queue-anim';
import styled from 'styled-components';
import { PuLayout, Icon, FontDin } from '../utils';
import { iteaScan } from '../../../config/networks';

const Container = styled.div`
  min-width: 320px;
  max-width: 550px;
  padding: 30px 30px 0 30px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.popupBg};
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px 0;
  font-size: 16px;
`;

const Row = styled.div`
  padding: 5px 0;
  display: flex;
  font-size: 14px;
  .title {
    color: #848e9c;
    width: 30%;
  }
  .value {
    color: #212833;
    width: 70%;
    word-break: break-all;
    a {
      color: inherit;
      &:hover {
        color: #f0b90b;
      }
    }
  }
`;
const WrapperClose = styled.div`
  position: absolute;
  top: 5px;
  right: 8px;
  cursor: pointer;
  color: #848e9c;
  &:hover {
    color: #f0b90b;
  }
`;

function popupwindow(url, title, w, h) {
  const left = window.screen.width / 2 - w / 2;
  const top = window.screen.height / 2 - h / 2;
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  );
}

function txHashDetail(event) {
  const url = `${iteaScan}/tx/${event}`;
  popupwindow(url, 'title', 800, 600);
}

function blockDetail(event) {
  const url = `${iteaScan}/block/${event}`;
  popupwindow(url, 'title', 800, 600);
}

function PuDetailTx(props) {
  const { detail, close } = props;
  console.log('Detail', detail);
  return (
    <QueueAnim animConfig={{ opacity: [1, 0] }}>
      <PuLayout key={1}>
        <QueueAnim delay={100} type={['top', 'bottom']}>
          <Container key={2}>
            <Title>Transaction History</Title>
            <Content>
              <Row>
                <div className="title">Tx Hash:</div>
                <div className="value">
                  <a
                    href="#"
                    rel="noopener"
                  >
                    {detail.txHash}
                  </a>
                </div>
              </Row>
              <Row>
                <div className="title">Block#:</div>
                <div className="value">
                  <a href="#" rel="noopener">
                    {detail.blockHeight}
                  </a>
                </div>
              </Row>
              <Row>
                <div className="title">To:</div>
                <div className="value">
                  <a href="#" rel="noopener">
                    {detail.toAddr}
                  </a>
                </div>
              </Row>
              <Row>
                <div className="title">From:</div>
                <div className="value">
                  <a href="#" rel="noopener">
                    {detail.fromAddr}
                  </a>
                </div>
              </Row>
              <Row>
                <div className="title">Confirm Time:</div>
                <div className="value">
                  <FontDin value={detail.date} />
                </div>
              </Row>
              <Row>
                <div className="title">Amount:</div>
                <div className="value">
                  <FontDin value={detail.value} />
                </div>
              </Row>
              <Row>
                <div className="title">Fee:</div>
                <div className="value">
                  <FontDin value={detail.txFee} />
                </div>
              </Row>
            </Content>
            <WrapperClose onClick={close}>
              <Icon type="close" size="18" />
            </WrapperClose>
          </Container>
        </QueueAnim>
      </PuLayout>
    </QueueAnim>
  );
}

PuDetailTx.defaultProps = {
  detail: {},
  close: function() {},
};

export default PuDetailTx;
