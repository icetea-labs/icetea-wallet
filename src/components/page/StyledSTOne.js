import styled from 'styled-components';
import {zIndex} from './../../constants/Styles';

export const Wrapper = styled.div`
  width:450px;
  margin-top:30px;
  position:relative;
  
  .title {S
    color:#848E9C;
    font-size:14px;
    line-height:30px;
  }
  input {
    width:90%;
    height:30px;
    outline:none;
    font-size:16px;
    font-family:'DIN';
  }
  #spin {
    opacity:0;
  }
  input::-webkit-inner-spin-button {
    opacity:0;
  }
  .textarea {
    width:100%;
    outline:none;
    height:50px;
    border:1px solid #DFE2E7;font-size:14px;
  }
  .amount-input {
    padding-right:150px;
  }
  @media (max-width:768px){
    width:100%;
  }
`;

export const Error = styled.div`
  color:#F23051;
  position:absolute;
  bottom:-22px;
  left:0;
  right:0;
  font-size:14px;
  display:flex;
  height:20px;
  img {
    width:15px;
    margin-right:5px;
  }
`;

