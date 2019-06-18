import styled from 'styled-components';
import { BtnActive } from '../../elements/utils';

export const Container = styled.div`
  padding: 30px 0;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const ItemsTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ProfileWrap = styled.div`
  font-size: 15px;
  color: #ffffff;
  /* .get-tea {
    width: 120px;
    margin-bottom: 15px;
  } */
  .select {
    max-width: 500px;
    margin-bottom: 10px;
    .css-bg1rzq-control {
      min-height: auto;
      height: 30px;
    }
    .css-151xaom-placeholder {
      position: initial;
      transform: translateY(0);
    }
    .css-bgvzuu-indicatorSeparator {
      display: none;
    }
    .css-16pqwjk-indicatorContainer {
      padding: 5px 5px 0 0;
      height: 30px;
    }
    .css-1hwfws3 {
      padding: 0 10px;
      height: 28px;
      min-height: 28px;
    }
    .css-1szy77t-control {
      box-shadow: none;
      height: 28px;
      min-height: 28px;
      &:hover {
        border: 1px solid #15b5dd;
      }
    }
  }
  .css-1thkkgx-indicatorContainer {
    padding: 0 5px;
  }
`;

export const FormGroups = styled.div``;

export const Label = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;

export const LabelPro = styled.label`
  width: 100%;
  margin-bottom: 100px;
  font-size: 20px;
  padding: 30px;
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

export const InputText = styled.input`
  font-size: 14px;
  min-width: 235px;
  border: none;
  border-bottom: 1px solid #40485b;
  background: transparent;
  color: #ffffff;
  height: 35px;
  padding: 0 10px;
  border-radius: 0;
  margin-right: 10px;
  margin-bottom: 20px;
  transition: none;
  &:focus {
    transition: border-bottom-color 0.6s ease;
    border-bottom-color: #15b5dd;
    box-shadow: none;
    outline: none;
  }
  &.error {
    font-size: 13px;
    border-bottom-color: red;
    transition: border-bottom-color 0.3s ease;
    margin-bottom: 7px;
  }
  &.one-field {
    min-width: 735px;
    @media (max-width: 768px) {
      min-width: 670px;
      margin-right: 0;
      padding: 0;
    }
    @media (max-width: 640px) {
      min-width: auto;
    }
  }
  &.two-field {
    margin-right: 15px;
    min-width: calc(735px / 2 - 15px);
    @media (max-width: 991px) {
      min-width: calc(735px / 2 - 19px);
    }
    @media (max-width: 768px) {
      min-width: calc(100% - 20px);
      margin-right: 0;
    }
  }
  &.three-field {
    margin-right: 15px;
    min-width: calc(735px / 3 - 21px);
    @media (max-width: 991px) {
      min-width: calc(735px / 3 - 24px);
    }
    @media (max-width: 768px) {
      min-width: calc(100% - 20px);
      margin-right: 0;
    }
  }
  @media (max-width: 640px) {
    width: calc(100% - 25px);
    height: 30px;
  }
`;

export const List = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px;
  list-style-type: square;
  list-style-position: inside;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    color: #15b5dd;
    cursor: pointer;
    margin-left: 5px;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 13px;
  margin-bottom: 15px;
`;

export const WarningText = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  margin-left: 40px;
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
    left: 0;
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