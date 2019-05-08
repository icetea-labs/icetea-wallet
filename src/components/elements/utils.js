import React from 'react';
import styled from 'styled-components';
import { zIndex } from './../../constants/Styles';
// For create keystore
export const Header1 = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  padding-bottom: 18px;
  text-align: center;
  font-family: DIN;
`;
export const Header2 = styled.div`
  font-size:16px;
  color:#848E9C;
  margin:40px 0 20px;
  font-weight:bold;
  span{font-size:16px;}
  .totalPage{color:#EAECEF;}
  .title{
    font-size:18px;
    color:#48515D;
    margin-left:8px;
  }
`;
export const InputPass = styled.div`
  margin-top: 20px;
  position: relative;
  & .label {
    font-size: 16px;
    position: absolute;
    transform: translateY(0px);
    z-index: 100;
    color: rgb(132, 142, 156);
    transition: all 0.2s ease 0s;
  }
  & .label-value {
    transform: translateY(-20px);
    color: rgb(72, 81, 93);
    font-size: 12px;
  }
  & .inputWrap {
    position: relative;
    z-index: 300;
  }
  & input {
    width: 100%;
    height: 100%;
    font-size: 14px;
    caret-color: rgb(21, 181, 221);
    color: rgb(72, 81, 93);
    border-style: none none solid;
    outline: none;
    border-bottom: 1px solid rgba(234, 236, 239, 0.5);
    padding: 0px 0px 10px;
    background: inherit;
  }
  & input:focus {
    border-color: rgb(21, 181, 221);
  }
`;
export const InputConfirmPass = styled.div`
  margin: 40px 0px 20px;
`;
export const DivValidPass = styled.div`
  margin-top: 5px;
  background: rgb(251, 251, 251);
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(234, 236, 239, 0.5);
  border-image: initial;
  & ul {
    color: rgb(38, 49, 71);
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
  }
  & ul li:first-child {
    margin-right: 60px;
  }
  & ul li {
    position: relative;
    font-size: 12px;
    white-space: nowrap;
  }
  & .invalid {
    color: rgb(242, 48, 81);
  }
  & ul li.invalid::before {
    background: rgb(242, 48, 81);
  }
  & ul li.pass::before {
    background: rgb(0, 192, 135);
  }
  & ul li::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    top: 5px;
    left: -15px;
    border-radius: 50%;
    background: rgb(132, 142, 156);
  }
  @media (max-width: 623px) and (min-width: 320px) {
    & ul {
      flex-direction: column;
  }
}
`;
export const DivControlBtnKeystore = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding:20px 0 0 0;
  font-size:14px;
  @media (min-width:320px) and (max-width:623px){
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    height:70px;
    .previous-button{order:1;}
    .download-keystore{order:0;margin-top:20px;}
  }
`;
export const DivControlBtn = styled.div`
  a{
    color:inherit;
    &:hover{color:#f0b90b;}
  }
  margin-top:40px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  @media (min-width:320px) and (max-width:623px){
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    height:70px;
    padding-bottom:40px;
    .previous-button{order:1;}
    .continue{order:0;margin-top:20px;}}
`;

export const DivUnlockLink = styled.div`
  cursor:pointer;
  display:flex;
  align-items:center;
  color:#f0b90b;
  i{margin-right:10px;}
`;
export const DivFooter = styled.div`
  font-size: 12px;
  color: rgb(132, 142, 156);
  padding: 20px 0px;
  & .lbFooter{
    user-select: none;
    cursor: pointer;
    display: flex;
    margin: auto;
  }
  & .textFooter{
    font-size: 12px;
    color: rgb(132, 142, 156);
    white-space: normal;
    padding-left: 5px;
    line-height: 20px;
    width: 90%;
  }
`;
export const DivFooterCheckBox = styled.div`
  & input:checked + label span:first-child {
      background: rgb(240, 185, 10);
      border-color: rgb(240, 185, 10);
      animation: 0.4s ease 0s 1 normal none running wave;
  }
`;
export const DivPreviousBt = styled.div`
  /* cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgb(132, 142, 156);
  & i {
    margin-right: 10px;
    color: inherit;
  }
  & div {
    color: inherit;
  }
  &:hover div, &:hover i {
    color: rgb(240, 185, 11);
  }
  &:hover div {
    text-decoration: underline;
  } */
  cursor:pointer;
  display:flex;
  align-items:center;
  font-size:14px;
  color:#848e9c;
  &:hover{color:#f0b90b;}
  a{color:inherit;}
  i{margin-right:10px;}
`;
export const DivContentW2 = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .shield {
    font-size: 70px;
  }
  & .text {
    font-size: 16px;
    margin-top: 40px;
    color: rgb(72, 81, 93);
    text-align: center;
  }
`;

const IconBase = styled.i`
  color: ${props => props.color };
  font-size: ${props => "".concat(props.size, "px") };
  &:hover {
    color: ${props => props.hoverColor ? props.hoverColor : props.color };
  };
`;
export const Icon = (props) => {
  var {size, color, type} = props;
  return (
    <IconBase 
      className={ "iconfont icon-".concat(type) }
      size  = { size || "16px" }
      color = { color }
    >
    </IconBase>
    );
}
Icon.defaultProps = {
  size: 16,
  color: "",
  hoverColor: ""
}
// For create 
export const BtnActive = styled.button`
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
export const BtnInactive = styled(BtnActive)`
background:#848E9C;
box-shadow:none;
width: ${props => props.width ? props.width : "100px"};
&:hover{
  transform:scale(1);
  }
`;
export const Loading = styled.div`
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
// For Popup
export const PuLayout = styled.div`
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
  z-index: ${ zIndex.modal };
  background:rgba(0,0,0,0.5);
`;
export const PuContainer = styled.div`
  color:${ props => props.theme.fontColor || "black" };
  min-width:320px;
  padding:30px;
  box-sizing:border-box;
  background:${ props => props.theme.popupBg || "#fff" };
  box-shadow:${ props => props.theme.boxShadow };
  position:fixed;
  top:20%;
  left:50%;
  transform:translate(-50%,-50%);
`;

export const PuHeader = styled.div`
  font-size:14px;
  font-weight:bold;
  font-family:'DIN';
`;
export const PuContent = styled.div`
  padding:20px 0;
  font-size:16px;
  & a{
      &,&:hover,&:active,&:visited {
        color:inherit !important;text-decoration:underline;
      }
    }
`;
export const PuFooterBtn = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:${ props=> props.align };
`;
export const PuBtnNext = styled(BtnActive)`
  height:34px;
  line-height:34px;
  padding:0 20px;
`;
export const PuBtnCancel = styled(BtnActive)`
  height:34px;
  line-height:34px;
  background:#fff;
  border:1px solid #F0B90B;color:#F0B90B;
  margin-right:10px;box-sizing:border-box;
`;
export const PuBtnGoback = styled(BtnActive)`
  background:inherit;
  color:#F0B90B;
  border:1px solid #F0B90B;
  box-shadow:none;
  height:34px;
  line-height:34px;
  margin-right:25px;
  box-sizing:border-box;
`;

export const WrapperBtnClose = styled.div`
  position:absolute;
  top:5px;
  right:8px;
  cursor:pointer;
  color:#848E9C;
  &:hover{ color:#F0B90B; }
`;
// For DivSelectWord
export const DivSelectWordBase = styled.div`
  align-items:${props => props.align};
  background:${props => "theme" == props.bg ? props.theme.bg : ""};
  display:flex;
  flex:${props => props.flex};
  flex-basis:${props => props.basis};
  flex-direction:${props => props.direction};
  flex-wrap:${props => props.wrap || "wrap"};
  height:${props => props.height};
  justify-content:${props => props.justify};
  margin:${props => props.margin};
  padding:${props => props.padding};
  align-content:${props => props.content};
`;
// MnemonicItem
export const MnemonicItemBase = styled.div`
  border:1px solid ${props => props.theme.border || "#eee"};
  height:${props => props.height};
  padding:0;
  margin:${props => props.margin || "5px"};
  user-select:none;
`;