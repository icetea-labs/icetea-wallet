import React, { PureComponent } from 'react';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import { PuLayout, PuBtnGoback, PuBtnNext, WrapperBtnClose, Icon } from './utils';

const PuContainer = styled.div`
  min-width: 320px;
  max-width: 450px;
  padding: 30px;
  box-sizing: border-box;
  background: ${props => props.theme.popupBg};
  box-shadow: ${props => props.theme.boxShadow};
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    width: 100%;
    min-width: 300px;
    max-width: 300px;
    padding: 15px;
    top: 20%;
  }
`;
const PuContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 20px 0;
  font-size: 16px;
  color: ${props => props.theme.fontColor};
`;
const PuFoolterBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const WrapperBtnCloseCus = styled(WrapperBtnClose)`
  line-height: 20px;
`;

class PuConfirmMnemonic extends PureComponent {
  render() {
    const { confirm, cancel, cancelText, okText, children } = this.props;
    return (
      <QueueAnim animConfig={{ opacity: [1, 0] }}>
        <PuLayout key={1}>
          <QueueAnim leaveReverse delay={100} type={['top', 'bottom']}>
            <PuContainer key={2}>
              <PuContent>{children}</PuContent>
              <PuFoolterBtn>
                <PuBtnGoback onClick={cancel}>
                  <span>{cancelText}</span>
                </PuBtnGoback>
                <PuBtnNext onClick={confirm}>
                  <span>{okText}</span>
                </PuBtnNext>
              </PuFoolterBtn>
              <WrapperBtnCloseCus onClick={cancel}>
                <Icon type="close" size="18" color="inherit" />
              </WrapperBtnCloseCus>
            </PuContainer>
          </QueueAnim>
        </PuLayout>
      </QueueAnim>
    );
  }
}

PuConfirmMnemonic.defaultProps = {
  okText: '',
  cancelText: '',
  confirm() {},
  cancel() {},
  children: null,
};

export { PuConfirmMnemonic };
export default PuConfirmMnemonic;
