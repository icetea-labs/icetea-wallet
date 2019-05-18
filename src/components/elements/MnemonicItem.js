import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, MnemonicItemBase } from './utils';

const Wrapper = styled(MnemonicItemBase)`
  padding: 3px 8px;
  background: #fff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  max-height: 27px;
  color: #212833;
  align-items: center;
  cursor: pointer;
  margin: 5px;
  box-sizing: border-box;
  font-weight: 600;
  float: left;
  i {
    color: #848e9c;
  }
  &:hover {
    background: #f0b90b;
    color: #fff;
    i {
      color: #fff;
    }
  }
`;
const WrapperIcon = styled.div`
  margin-left: 5px;
  margin-bottom: 2px;
`;
export class MnemonicItem extends PureComponent {
  _handleClick = () => {
    this.props.onClick && this.props.onClick(this.props.value);
  };
  render() {
    var { canClose, value } = this.props;
    return (
      <Wrapper onClick={this._handleClick}>
        {canClose ? (
          <React.Fragment>
            <WrapperIcon>
              {' '}
              {value} <Icon type="close" size="10" />
            </WrapperIcon>
          </React.Fragment>
        ) : (
          value
        )}
      </Wrapper>
    );
  }
}

MnemonicItem.defaultProps = {
  value: '',
  onClick: function() {},
  canClose: false,
  close: function() {}
};
