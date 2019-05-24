import React, { PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';

import {
  PuLayout,
  PuContainer,
  PuHeader,
  PuContent,
  PuFooterBtn,
  PuBtnCancel,
  PuBtnNext,
  WrapperBtnClose,
  Icon,
} from './utils';

class PuCommont extends PureComponent {
  componentWillMount() {
    window.document.body.removeEventListener('keydown', this._keydown);
  }

  componentDidMount() {
    window.document.body.addEventListener('keydown', this._keydown);
  }

  _keydown = e => {
    const { props } = this;
    const close = props.close;
    e.keyCode === 27 && close && close();
  };

  render() {
    var { closeText, title, close, children, closeAlign, next, cancelButton, hideButton, bgColor } = this.props;

    return (
      <QueueAnim animConfig={{ opacity: [1, 0] }}>
        <PuLayout key={1}>
          <QueueAnim leaveReverse delay={100} type={['top', 'bottom']}>
            <PuContainer key={1} bgColor={bgColor}>
              <PuHeader>{title}</PuHeader>
              <PuContent>{children}</PuContent>
              {!hideButton && (
                <PuFooterBtn align={closeAlign}>
                  {cancelButton && close && (
                    <PuBtnCancel onClick={() => close}>
                      <span>Cancel</span>
                    </PuBtnCancel>
                  )}
                  {(next || close) && (
                    <PuBtnNext onClick={next || close} width="100px">
                      <span>{closeText}</span>
                    </PuBtnNext>
                  )}
                </PuFooterBtn>
              )}
              {close ? (
                <WrapperBtnClose onClick={close}>
                  <Icon type="close" size="18" color="inherit" />
                </WrapperBtnClose>
              ) : null}
            </PuContainer>
          </QueueAnim>
        </PuLayout>
      </QueueAnim>
    );
  }
}

PuCommont.defaultProps = {
  closeText: 'Close',
  cancelButton: false,
  title: '',
  children: null,
  closeAlign: 'flex-end',
  bgColor: '',
  close: null,
  next: null,
  hideButton: false,
};

export { PuCommont };
export default PuCommont;
