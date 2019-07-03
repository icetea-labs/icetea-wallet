import React, { Component } from 'react';
import styled from 'styled-components';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
// import 'rc-dropdown/assets/index.css'
import '../../assets/styles/dropdown.css';
import { zIndex } from '../../constants/styles';
import { Icon } from './utils';

const DropWrapper = styled.div`
  position: relative;
  text-indent: 10px;
  border-radius: ${props => (props.theme.mode === 'DARK' ? '3px' : '0')};
  font-size: 12px;
  color: #848e9c;
  height: 22px;
  line-height: 22px;
  display: inline-block;
  cursor: pointer;
  background: ${props => props.theme.dropdownBg};
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  box-sizing: border-box;
  z-index: ${zIndex.dropdown};
  width: ${props => (props.width ? props.width : 'inherit')};
`;

const DropItem = styled.i`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translate(0, -50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #666;
`;

class ComboboxPro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      options: props.options,
    };
  }

  _onSelect = e => {
    const { props, state } = this;
    const k = e.key;
    const option = state.options[k];
    if (option) {
      this.setState({
        value: option.render ? option.render() : option.text,
      });
      props.onChange && props.onChange(option.value, option.text);
    }
  };

  _onSearch = e => {
    const { props } = this;
    let valueSearch = e.target.value;
    valueSearch = valueSearch.trim().toUpperCase();
    const searchItems = props.options.filter(el => {
      return el.text.toUpperCase().includes(valueSearch) || el.value.toUpperCase().includes(valueSearch);
    });
    this.setState({
      options: searchItems,
    });
  };

  _buildList = () => {
    const { state } = this;
    const { withSearchBox } = this.props;

    return (
      <Menu onSelect={this._onSelect}>
        {withSearchBox && (
          <MenuItem disabled className="search-box">
            <Icon type="search" />
            <input autoFocus placeholder="Search Asset" onChange={this._onSearch} />
          </MenuItem>
        )}
        {state.options.map((value, index) => {
          return <MenuItem key={index}>{value.render ? value.render : value.text}</MenuItem>;
        })}
      </Menu>
    );
  };

  _buildDefaultValue = () => {
    // console.log('Call buildDefaultValue')
    const { defaultValue } = this.props;
    if (defaultValue) {
      return defaultValue;
    }
    const { options } = this.state;
    return options.length === 0 ? '' : options[0].render ? options[0].render() : options[0].text;
  };

  render() {
    const { width, className } = this.props;
    const { value } = this.state;

    return (
      <DropWrapper width={width} className={'select '.concat(className || '')}>
        <Dropdown
          trigger={['click']}
          overlay={this._buildList()}
          animation="slide-up"
          onVisibleChange={this._onVisibleChange}
        >
          <div>
            <div className="selectValue">{value || this._buildDefaultValue()}</div>
            <DropItem />
          </div>
        </Dropdown>
        {/* <DefaultItem></DefaultItem> */}
      </DropWrapper>
    );
  }
}

ComboboxPro.defaultProps = {
  options: [
    {
      text: '',
      value: '',
    },
  ],
  defaultValue: null,
  onChange() {},
  width: '',
  withSearchBox: false,
};

export default ComboboxPro;
