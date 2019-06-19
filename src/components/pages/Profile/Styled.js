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
export const H1 = styled.div`
  color: #212833;
  font-size: 20px;
  background: #fff;
  height: 40px;
  line-height: 40px;
`;
export const H2 = styled.div`
  color: #212833;
  font-size: 18px;
  background: #fff;
  height: 40px;
  line-height: 40px;
`;
export const WrapperContent = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  background: #fff;
  box-shadow: 0px 1px 20px 0px rgba(90, 102, 124, 0.08);
  /* height: 40px; */
  padding: 0 5px 0 15px;
`;
export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  li {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    width: 600px;
    padding-left: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    border-left: 4px solid #fff;
    font-size: 14px;
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
  li.on .selected {
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
    font-size: 14px;
    line-height: 30px;
  }
  input {
    width: 90%;
    height: 30px;
    outline: none;
    font-size: 16px;
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
    font-size: 14px;
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
`;
export const TapWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  /* box-shadow: 0px 1px 20px 0px rgba(90, 102, 124, 0.08); */
  padding: 0 5px 100px 15px;
  p {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 500;
  }
  .row {
    display: inline-flex;
    .header {
      font-weight: 600;
      margin-right: 10px;
    }
  }
`;
export const WrapperButton = styled.div`
  margin: 15px 0 15px 0;
`;

export const Button = styled(BtnActive)`
  background: inherit;
  border: 1px solid #15b5dd;
  color: #15b5dd;
  width: 170px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, rgba(20, 180, 221, 1) 0%, rgba(21, 181, 220, 1) 100%);
    color: #fff;
  }
  a {
    color: inherit;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  @media (max-width: 1440px) {
    width: 110px;
    height: 30px;
    line-height: 28px;
    font-size: 12px;
  }
  /* display: block;
  min-width: 120px;
  margin-bottom: 30px;
  color: #ffffff;
  background: #15b5dd;
  text-transform: capitalize;
  line-height: 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer; */
  /* transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #12161c;
    box-shadow: 1px 2px 11px 0px #0a1223;
  } */
`;
