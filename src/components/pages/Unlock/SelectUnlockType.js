import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'rc-dropdown'
import Menu, { Item as MenuItem, Divider } from 'rc-menu'
import 'rc-dropdown/assets/index.css'
import { Icon } from './../../elements/utils'
import {
  DropWrapper,
  DropItem,
  DefaultItem
} from './styled'

class SelectUnlockType extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      options: props.options
    }
  }

  _onSelect = (e) => {
    var key = e.key
    var option = this.state.options[key]
    if (option) {
      this.setState({
        value: option.render ? option.render() : option.text
      })
      this.props.onChange && this.props.onChange(option.value, option.text)
    }
  };

  _onSearch = (e) => {
    var value = e.target.value
    value = value.trim().toUpperCase()
    var searchItems = this.props.options.filter(e => {
      return e.text.toUpperCase().includes(value) || e.value.toUpperCase().includes(value)
    })
    this.setState({
      options: searchItems
    })
  };

  _buildList = () => {
    var { withSearchBox } = this.props
    var items = this.state.options.map((value, index) => {
      return (
        <MenuItem key={index}>
          {value.render ? value.render : value.text}
        </MenuItem>
      )
    })

    return (
      <Menu onSelect={this._onSelect}>
        {
          withSearchBox &&
          (<MenuItem disabled className='search-box' >
            <Icon type='search' />
            <input autoFocus placeholder='Search Asset' onChange={this._onSearch} />
          </MenuItem>)
        }
        {items}
      </Menu>
    )
  }

  _buildDefaultValue = () => {
    var defaultValue = this.props.defaultValue
    if (defaultValue) { return defaultValue }
    var options = this.state.options
    return options.length === 0 ? '' : options[0].render ? options[0].render() : options[0].text
  };

  render () {
    var { width, className } = this.props
    var { value } = this.props
    return (
      <DropWrapper width={width} className={'select '.concat(className || '')} >
        <Dropdown
          trigger={['click']}
          overlay={this._buildList()}
          animation='slide-up'
          onVisibleChange={this._onVisibleChange}
        >
          <div>
            <div className='selectValue'>
              {value || this._buildDefaultValue()}
            </div>
            <DropItem />
          </div>
        </Dropdown>
        <DefaultItem></DefaultItem>
      </DropWrapper>
    )
  }
}

SelectUnlockType.defaultProps = {
  options: [{
    text: '',
    value: ''
  }],
  defaultValue: null,
  onChange: function () { },
  width: '',
  withSearchBox: true
}

export default SelectUnlockType
