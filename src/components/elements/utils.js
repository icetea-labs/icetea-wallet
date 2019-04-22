import styled from 'styled-components'
// For create keystore
export const DivBox2 = styled.div`
  width: 100%;
  box-shadow: rgb(228, 228, 228) 0px 0px 10px;
  background: rgb(255, 255, 255);
  padding: 40px 54px;
  @media (max-width: 623px) and (min-width: 320px) {
    box-shadow: none;
    box-sizing: border-box;
    padding: 5px 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 624px) {
    width: 500px;
  }
`;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  padding: 20px 0px 0px;
  @media (max-width: 623px) and (min-width: 320px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 70px;
  }
`;
export const DivUnlockLink = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: rgb(21, 181, 221);
  @media (max-width: 623px) and (min-width: 320px) {
    order: 1;
  }
`;
export const DivFooter = styled.div`
  font-size: 12px;
  color: rgb(132, 142, 156);
  padding: 20px 0px;
  & .lbFooter{
    user-select: none;
    cursor: pointer;
    /* display: flex; */
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