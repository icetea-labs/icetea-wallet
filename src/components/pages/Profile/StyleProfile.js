import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 0;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ItemsTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ProfileWrap = styled.div`
  font-size: 15px;
  color: #ffffff;
  .get-tea {
    width: 120px;
    margin-bottom: 15px;
  }
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
        border: 1px solid rgb(21, 181, 221);
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

export const Button = styled.button`
  display: block;
  min-width: 120px;
  margin-bottom: 15px;
  color: #ffffff;
  background: rgb(21, 181, 221);
  text-transform: capitalize;
  line-height: 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #12161c;
    box-shadow: 1px 2px 11px 0px #0a1223;
  }
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
    border-bottom-color: rgb(21, 181, 221);
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
