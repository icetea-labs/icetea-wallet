import styled from 'styled-components'
import { zIndex } from './../../constants';
import { Button } from './Button';

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
  font-size: 16px;
  color: rgb(132, 142, 156);
  font-weight: bold;
  margin: 40px 0px;
  & span {
    font-size: 16px;
  }
  & .totalPage {
    color: rgb(234, 236, 239);
  }
  & .title {
    font-size: 18px;
    color: rgb(72, 81, 93);
    margin-left: 8px;
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
export const DivControlBtn = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding:20px 0 0 0;
  font-size:14px;
  @media (min-width:320px) and (max-width:623px){
    flex-direction:column;
    justify-content:space-around;
    align-items:center;height:70px;
    .previous-button{order:1;}
    /* .download-keystore{order:0;margin-top:20px;} */
  }
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
  cursor: pointer;
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
  }
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
export const Icon = styled.i`
  font-size : ${props => props.size + 'px' || "10px"};
`;

// For Popup
export const PuContainer = styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: ${ zIndex.modal };
  background:rgba(0,0,0,0.5);
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
export const PuBtnCancel = styled(Button)`
  height:34px;
  line-height:34px;
  padding:0 20px;
`;
export const PuBtnNext = styled(Button)`
  height:34px;
  line-height:34px;
  background:#fff;
  border:1px solid #F0B90B;color:#F0B90B;
  margin-right:10px;box-sizing:border-box;
`;
export const DivBtnClose = styled.div`
  position:absolute;
  top:5px;
  right:8px;
  cursor:pointer;
  color:#848E9C;
  &:hover{ color:#F0B90B; }
`;