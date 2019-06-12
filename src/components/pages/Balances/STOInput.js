import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from '../../elements/utils';

// Component 1093

const InputLabel = styled.div`
  position: relative;
  input {
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 14px;
    caret-color: #15b5dd;
    color: ${props => props.theme.inputColor};
    background: inherit;
    padding: 5px 0 10px;
    &:focus {
    }
    &::-webkit-input-placeholder {
      font-size: 14px;
      color: #848e9c;
      font-weight: normal;
    }
  }
  .border-bottom {
    width: 100%;
    height: 1px;
    background: rgba(234, 236, 239, 0.5);
    position: absolute;
    bottom: 0;
    transition: background 0.2s ease;
  }

  input:focus + .border-bottom {
    background: #15b5dd;
  }

  .label {
    color: ${props => props.theme.fontColor};
    font-size: 16px;
    position: absolute;
    transform: translate(0px, 30px);
    transition: all 0.25s ease;
    opacity: 0;
  }

  .label-value {
    transform: translate(0px, -15px);
    font-size: 14px;
    color: #848e9c;
    opacity: 1;
  }
`;

const Clear = styled.div`
  position: absolute;
  right: 0px;
  bottom: 10px;
  color: ${props => props.theme.fontColor};
  cursor: pointer;
`;

export default class STOInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  _getDecimal = e => {
    const { type } = this.props;
    return type !== 'number' ? 0 : e && e.includes('.') ? e.split('.')[1].length : 0;
  };

  _textChange = e => {
    const { state, props } = this;
    let stateValue = state.value;
    const value = e.currentTarget.value.trim();

    if (this._getDecimal(value) <= 8) {
      stateValue = value;
    }
    this.setState(
      {
        value: stateValue,
      },
      () => props.onChange(stateValue)
    );
  };

  componentDidUpdate = preProps => {
    const { props, state } = this;
    const t = props.defaultValue;
    const n = state.value;
    preProps.defaultValue !== t &&
      parseFloat(n) !== parseFloat(t) &&
      this.setState({
        value: t,
      });
  };

  _clear = () => {
    const { props } = this;
    this.setState(
      {
        value: '',
      },
      () => props.onChange('', false)
    );
  };

  render() {
    const { value } = this.state;
    const { title, defaultValue, type, autoFocus } = this.props;

    return (
      <InputLabel>
        <p className={value || defaultValue ? 'label label-value' : 'label'}>{title}</p>
        <div>
          <input type={type} placeholder={title} value={value} autoFocus={autoFocus} onChange={this._textChange} />
          <div className="border-bottom" />
          {(!!value || !!defaultValue) && (
            <Clear onClick={this._clear}>
              <Icon type="clear" size="14" />
            </Clear>
          )}
        </div>
      </InputLabel>
    );
  }
}

STOInput.defaultProps = {
  onChange() {},
  title: '',
  type: 'text',
  value: '',
  defaultValue: '',
  autoFocus: false,
};
