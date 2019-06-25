import styled from 'styled-components';
import { BtnActive } from '../../elements/utils';

export const Wrapper = styled.div`
  background: #fdfdfd;
  display: flex;
  justify-content: center;
`;
export const MediaContent = styled.div`
  width: 1200px;
  min-width: 960px;
  @media (min-width: 320px) and (max-width: 623px) {
    display: none;
  }
`;
export const WrapperPageContent = styled.div`
  background: #fff;
  box-shadow: 0px 1px 20px 0px rgba(90, 102, 124, 0.08);
  padding: 0 15px;
  line-height: 30px;
  color: #212833;
  .rc-tabs-top {
    border: none;
  }
  .rc-tabs-tab-active,
  .rc-tabs-tab-active:hover {
    color: #15b5dd;
  }
  .rc-tabs-ink-bar {
    background-color: #15b5dd;
  }
`;

export const H1 = styled.div`
  height: 30px;
  font-size: 20px;
`;
export const H2 = styled.div`
  height: 30px;
  font-size: 16px;
`;
export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & > li {
    /* height: 30px; */
    /* line-height: 30px; */
    cursor: pointer;
    width: 600px;
    padding-left: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    border-left: 4px solid #fff;
    position: relative;
    box-sizing: border-box;
    color: #263147;
    font-weight: 400;
    &:hover {
      background: #fff;
      font-weight: 600;
      /* box-shadow: 0px 0px 15px 0px rgba(223, 226, 231, 0.5); */
      /* border-left: 4px solid #15b5dd;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px; */
    }
    .selected {
      width: 12px;
      height: 12px;
      display: block;
      border: 1px solid rgba(132, 142, 156, 1);
      opacity: 0.5;
      border-radius: 50%;
      position: absolute;
      background: #fff;
      left: 5px;
      /* margin-left: 15px; */
      &:before {
        content: '';
        position: absolute;
        display: none;
        width: 8px;
        height: 8px;
        background: #15b5dd;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .custom-select {
      margin-left: 10px;
      width: 75%;
    }
  }
  .on {
    background: #fff;
    /* box-shadow: 0px 0px 15px 0px rgba(223, 226, 231, 0.5); */
    /* border-left: 4px solid #15b5dd;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px; */
    font-weight: 600;
  }
  & > li.on .selected {
    display: block;
    border-color: #15b5dd;
    opacity: 1;
    &:before {
      display: block;
    }
  }
  @media (min-width: 320px) and (max-width: 623px) {
    display: none;
  }
`;
export const WrapperCombox = styled.div`
  width: 450px;
  /* margin-top: 30px; */
  /* position: relative; */

  .title {
    color: #848e9c;
    line-height: 30px;
  }
  input {
    width: 90%;
    height: 30px;
    outline: none;
    font-family: 'DIN';
  }
  #spin {
    opacity: 0;
  }
  input::-webkit-inner-spin-button {
    opacity: 0;
  }
  .textarea {
    width: 95%;
    outline: none;
    height: 50px;
    border: 1px solid #dfe2e7;
  }
  .amount-input {
    padding-right: 150px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TabWrapper = styled.div`
  /* background: #fdfdfd; */
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
export const WrapperBlock = styled.div`
  padding-bottom: 10px;
  width: 50%;
  min-width: 400px;
`;
export const TapWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  /* box-shadow: 0px 1px 20px 0px rgba(90, 102, 124, 0.08); */
  padding: 5px 25px;
  .row {
    display: inline-flex;
    .header {
      font-weight: 600;
      margin-right: 10px;
    }
    p {
      height: 30px;
      line-height: 30px;
      font-weight: 500;
    }
  }
  .alias {
    display: inline-flex;
  }
  .tags-note {
    margin-bottom: 15px;
    height: 30px;
    line-height: 30px;
    font-weight: 500;
    color: #f23051;
  }
`;
export const WrapperTable = styled.div`
  min-height: ${props => (props['min-height'] ? props['min-height'] : '100px')};
  .table-cus {
    tr td {
      height: 30px;
      line-height: 30px;
    }
  }
`;
export const StyledText = styled.div`
  color: #212833;
  position: relative;
  display: flex;
  align-items: center;
`;

export const WrapperButton = styled.div`
  margin: 5px 0 10px;
`;
export const WrapperTexinput = styled.div`
  margin-right: 20px;
  width: 100%;
  input {
    width: 90%;
    height: 30px;
    outline: none;
    font-family: 'DIN';
  }
`;

export const Button = styled(BtnActive)`
  width: ${props => (props.width ? props.width : '100px')};
  height: ${props => (props.height ? props.height : '30px')};
  line-height: ${props => (props.height ? props.height : '28px')};
  background: inherit;
  border: 1px solid #15b5dd;
  color: #15b5dd;
  border-radius: 6px;
  &:hover {
    background: linear-gradient(90deg, rgba(20, 180, 221, 1) 0%, rgba(21, 181, 220, 1) 100%);
    color: #fff;
  }
`;

export const Table = styled.table`
  /* width: 100%; */
  border-collapse: sepnarate;
  border-color: rgb(253, 253, 253);
  border-spacing: 0px 5px;
  margin-left: 40px;
  tr {
    padding: 10px 0px;
  }
`;
export const THead = styled.thead`
  background: 0% 0% / auto 100% rgb(253, 253, 253);
  th {
    background-color: rgb(253, 253, 253);
    word-break: break-all;
    cursor: pointer;
    color: rgb(132, 142, 156);
    height: 40px;
    text-align: left;
    text-decoration: underline;
    line-height: 40px;
    th:first-child {
      text-indent: 10px;
    }
    tr {
      color: rgb(72, 81, 93);
      box-shadow: none;
      border-width: initial;
      border-style: none;
      border-color: initial;
      border-image: initial;
    }
  }
`;

export const TBody = styled.tbody`
  display: table-row-group;
  tr td {
    position: relative;
    background-color: rgb(255, 255, 255);
    word-break: break-all;
    cursor: pointer;
    color: rgb(33, 40, 51);
    text-align: left;
    line-height: 40px;
    width: 30%;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      color: #15b5dd;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  tr {
    box-shadow: rgba(90, 102, 124, 0.08) 0px 1px 20px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    border-radius: 3px;
    transition: all 0.2s ease-in 0s;
  }
  tr td:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    text-indent: 10px;
    border-left: 1px solid rgb(255, 255, 255);
  }
  tr td:last-child {
    /* styles */
  }
  tr:hover {
    box-shadow: rgba(90, 102, 124, 0.2) 0px 1px 20px;
  }
`;

export const OwnerAdd = styled.div`
  /* width: 100%; */
  padding: 20px 0px;
  margin-left: 40px;
  display: flex;
`;

export const Note = styled.div`
  margin-left: 40px;
  border: 2px solid #15b5dd;
  box-sizing: border-box;
  height: 100px;
  width: 75%;
  line-height: 50px;
  p {
    margin-left: 40px;
  }
`;

export const Guide = styled.div`
  margin-left: 40px;
  margin-top: 20px;
`;

export const Owners = styled.div`
  width: 100%;
  margin-bottom: 0px;
  font-size: 20px;
  padding: 10px;
  input {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    :checked:after {
      width: 15px;
      height: 15px;
      border-radius: 15px;
      top: -2px;
      left: -1px;
      position: relative;
      background-color: #15b5dd;
      content: '';
      display: inline-block;
      visibility: visible;
      border: 2px solid white;
    }
  }
`;

export const OwnerList = styled.div`
  position: relative;
`;

export const WarningText = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  margin-left: 40px;
  margin-bottom: 10px;
  color: #48515d;
  display: flex;
  position: relative;
  span {
    color: #f23051;
  }
`;
export const WarningTooltip = styled.div`
  margin-left: 8px;
  cursor: pointer;
  color: #848e9c;
  img {
    width: 20px;
  }
  .tips {
    position: absolute;
    left: 50px;
    width: 100%;
    padding: 10px;
    color: #848e9c;
    display: none;
    font-size: 12px;
    background: #fbfbfb;
    border: 1px solid rgba(234, 236, 239, 0.5);
  }
  &:hover .tips {
    display: block;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 13px;
  margin-bottom: 5px;
  margin-left: 40px;
`;
