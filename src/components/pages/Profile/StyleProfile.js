import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 0;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ItemsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const ProfileWrap = styled.div`
  font-size: 15px;
  color: #12161c;
  .orther-groups {
    font-size: 15px;
    color: #12161c;
  }
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
        border: 1px solid rgb(240, 185, 11);
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
  min-width: 80px;
  color: #ffffff;
  background: rgb(240, 185, 11);
  text-transform: capitalize;
  line-height: 30px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const InputText = styled.input`
  border: 1px solid rgb(204, 204, 204);
  height: 28px;
  padding: 0 10px;
  border-radius: 3px;
  margin-right: 10px;
  margin-bottom: 15px;
  transition: none;
  &:focus {
    border: 1px solid rgb(240, 185, 11);
    box-shadow: none;
    outline: none;
  }
  &.error {
    font-size: 13px;
    border: 1px solid red;
    margin-bottom: 5px;
  }
  @media (max-width: 640px) {
    width: 100%;
    height: 30px;
  }
`;

export const TagsList = styled.div`
  margin-bottom: 10px;
  span {
    cursor: pointer;
    margin-left: 5px;
    color: red;
  }
`;

export const OwnerList = styled.div`
  margin-bottom: 10px;
  span {
    cursor: pointer;
    margin-left: 5px;
    color: red;
  }
`;

export const InheritorList = styled.div`
  margin-bottom: 10px;
  span {
    cursor: pointer;
    margin-left: 5px;
    color: red;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 13px;
`;
