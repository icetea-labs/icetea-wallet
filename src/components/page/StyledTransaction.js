import styled from 'styled-components';
import {zIndex} from './../../constants/Styles';

export const WrapperSend = styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:${zIndex.modal};
  background:rgba(0,0,0,0.5);
`;

export const OutBox = styled.div`
  min-width:320px;
  max-width:650px;
  padding:20px;
  background:#fff;
  box-shadow:0px 3px 20px 0px rgba(90,102,124,0.2);
  position:fixed;
  top:10%;
  left:50%;
  transform:translate(-50%,-50%);
`;

export const Title = styled.div`
  font-size:14px;
  font-weight:bold;
`;

export const WrapperTab = styled.div`
  padding:30px 0;
  font-size:16px;
  padding-bottom:10px;
`;
export const DisplayTab = styled.div`
  display:flex;
`;

export const Tab = styled.div`
  width:60px;
  height:3px;
  background: ${({bg}) => bg ? bg : "#F0B90B"}
  margin-right:10px; ({df})
`;


