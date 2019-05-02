import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  & input:checked + label span:first-child {
      background: rgb(240, 185, 10);
      border-color: rgb(240, 185, 10);
      animation: 0.4s ease 0s 1 normal none running wave;
  }
  & input:checked + label span:first-child::before {
    transform: scale(3.5);
    opacity: 0;
    transition: all 0.6s ease 0s;
  }
  & input:checked + label span:first-child svg {
    stroke-dashoffset: 0;
  }
`;
const Label = styled.label`
  user-select: none;
  cursor: pointer;
  display: flex;
  margin: auto;
  & > span:first-child {
    position: relative;
    width: 14px;
    height: 14px;
    transform: scale(0.75);
    vertical-align: middle;
    border-radius: 3px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(132, 142, 156);
    border-image: initial;
    transition: all 0.2s ease 0s;
  }
  &:hover span:first-child {
    border-color: rgb(240, 185, 10);
  }
  & > span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0px, 0px, 0px);
    flex: 0 0 auto;
  }
  & > span:first-child::before {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    transform: scale(0);
    opacity: 1;
    background: rgb(240, 185, 10);
    border-radius: 50%;
  }
  & > span:first-child svg {
    position: absolute;
    top: 2px;
    left: 1px;
    fill: none;
    stroke: rgb(255, 255, 255);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transform: translate3d(0px, 0px, 0px);
    transition: all 0.3s ease 0.1s;
  }
  & > span:last-child {
    padding-left: 5px;
    line-height: 20px;
    width: 90%;
  }
`;
const Span = styled.span`
    font-size: 12px;
    color: rgb(132, 142, 156);
    line-height: 14px;
`;
const DivText = styled.div`
  & a {
      color: rgb(240, 185, 11);
  }
`;

export class WarningRecover extends Component {

  handleCheckChange = (e) => {
    this.props.handleCheckChange(!this.props.defaultChecked)
  }

  render() {
    var { defaultChecked } = this.props;
    return (
      <Container>
        <input id="cbx" type="checkbox" checked={defaultChecked}
          style={{ display: 'none' }} onChange={this.handleCheckChange} />
        <Label htmlFor="cbx">
          <span>
            <svg width="12px" height="10px" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
          <Span>
            <DivText>I understand that Ice-tea cannot recover or reset my password or the keystore file. I will make a backup of the keystore file/password, keep them secret, complete all wallet creation steps and agree to all the
                <a target="_blank" href="/en/terms">terms</a>
            </DivText>
          </Span>
        </Label>
      </Container>
    );
  }
}