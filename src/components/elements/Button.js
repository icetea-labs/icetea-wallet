import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const BtnActive = styled.button`
  width: ${props => props.width ? props.width : "100px"};
  height: ${props => props.height ? props.height : "40px"};
  line-height: ${props => props.height ? props.height : "40px"};
  text-align:center;
  font-size:14px;
  font-weight:bold;
  background:linear-gradient(90deg,rgba(239,184,11,1) 0%,rgba(251,218,60,1) 100%);
  border-radius:3px;
  cursor:pointer;
  color:#fff;
  display:flex;
  justify-content:center;
  position:relative;
  overflow:hidden;
  border:none;
  outline:none;
  box-sizing:border-box;
  &:after{
    content:"";
    display:block;
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    pointer-events:none;
    background-image:radial-gradient(circle,#999 10%,transparent 10.01%);
    background-repeat:no-repeat;
    background-position:50%;
    transform:scale(10,10);
    opacity:0;
    transition:transform .3s,opacity .5s;
  }
  &:active:after{
    transform:scale(0,0);opacity:.6;transition:0s;
  }
  span {
    transition:transform 0.2s ease;
    @media (max-width:768px) {
      width:100%;
    }
  }
  a {
    transition:transform 0.2s ease;
    @media (max-width:768px){
      width:100%;
    }
  }
  i {
    @media (max-width:768px){
      display:none;
    }
  }
  &:hover span{
    transform:scale(0.9);
  }
  &:hover a{
    transform:scale(0.9);
  }
  &:hover i{
    transform:scale(0.9);
  }
  @media (max-width:768px){
    width:100%;
  }
`;

const BtnInactive = styled(BtnActive)`
background:#848E9C;
box-shadow:none;
width: ${props => props.width ? props.width : "100px"};
&:hover{
  transform:scale(1);
  }
`;

const Loading = styled.div`
  width:20px;
  height:20px;
  border-radius:50%;
  border:1px solid #fff;
  border-left:1px solid transparent;
  animation:load 0.8s infinite linear;
  align-self:center;
  @keyframes load{
    0%{ transform:rotate(0deg); }
    50%{ transform:rotate(180deg); }
    100%{ transform:rotate(360deg); }
  }
`;

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
    this.props.loading || this.props.onClick && this.props.onClick(e);
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
