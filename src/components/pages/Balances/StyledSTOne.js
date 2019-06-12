import styled from 'styled-components';
import { DivSelectWordBase, WrapperBtnClose } from '../../elements/utils';

export const Wrapper = styled.div`
  width: 450px;
  margin-top: 30px;
  position: relative;

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

export const Error = styled.div`
  color: #f23051;
  position: absolute;
  bottom: -22px;
  left: 0;
  right: 0;
  font-size: 14px;
  display: flex;
  height: 20px;
  img {
    width: 15px;
    margin-right: 5px;
  }
`;

export const MaxValue = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
  color: #15b5dd;
  cursor: pointer;
`;

export const FeeAva = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Fee = styled.div`
  font-size: 14px;
  .fee-title {
    color: #48515d;
    margin-right: 5px;
  }
  .fee-value {
    color: #212833;
  }
`;

export const Ava = styled.div`
  font-size: 14px;
  .Available-title {
    color: #48515d;
    margin-right: 5px;
  }
  .Available-value {
    color: #212833;
  }
`;

export const ButtonWrapper = styled(DivSelectWordBase)``;

export const WrapperBtnCloseCus = styled(WrapperBtnClose)`
  line-height: 20px;
`;
