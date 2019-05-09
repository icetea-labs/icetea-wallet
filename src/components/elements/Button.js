import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components'
import {
  BtnActive,
  BtnInactive,
  Loading
} from './utils'

export class Button extends PureComponent {
  static defaultProps = {
    disabled: false,
    loading: false,
    onClick: function () { },
    children: null,
    width: "",
    height: "",
    type: "active"
  }
  _handleClick = (e) => {
    this.props.loading || (this.props.onClick && this.props.onClick(e));
  }
  render() {
    var {disabled, children, loading, width, height} = this.props;
    return (
      <>
        { 
          disabled ? <BtnInactive width={width}>{ children }</BtnInactive>
          : <BtnActive
            onClick = {this._handleClick}
            width = {width}
            height = {height}
          >
          { loading ? <Loading/> : children }
          </BtnActive> 
        }
      </>
    );
  }
}
