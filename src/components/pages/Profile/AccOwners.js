import React, { PureComponent } from 'react';
import styled from 'styled-components';

import STOInput from '../Balances/STOInput';
import { Button, WarningText, WarningTooltip } from './StyleProfile';
import nr from '../../../assets/img/nr.svg';

const Wrapper = styled.div`
  background: #fdfdfd;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  width: 1200px;
  min-width: 960px;
  @media (min-width: 320px) and (max-width: 623px) {
    display: none;
  }
`;
const Title = styled.div`
  color: #212833;
  font-size: 20px;
  background: #fff;
  height: 40px;
  line-height: 40px;
`;
const Owners = styled.div`
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
const OwnerList = styled.div`
  position: relative;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: sepnarate;
  border-color: rgb(253, 253, 253);
  border-spacing: 0px 5px;
  font-size: 18px;
  margin-left: 40px;
  tr {
    padding: 10px 0px;
  }
`;
const THead = styled.thead`
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
      font-size: 13px;
      color: rgb(72, 81, 93);
      box-shadow: none;
      border-width: initial;
      border-style: none;
      border-color: initial;
      border-image: initial;
    }
  }
`;

const TBody = styled.tbody`
  display: table-row-group;
  tr td {
    position: relative;
    background-color: rgb(255, 255, 255);
    word-break: break-all;
    cursor: pointer;
    font-size: 14px;
    color: rgb(33, 40, 51);
    text-align: left;
    line-height: 40px;
    width: 30%;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
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
  tr:hover {
    box-shadow: rgba(90, 102, 124, 0.2) 0px 1px 20px;
  }
`;

const OwnerAdd = styled.div`
  width: 50%;
  padding: 40px 0px;
  margin-left: 40px;
  display: flex;
`;

class AccOwners extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ownerA: '',
    };
  }

  _ownerChange = () => {};

  __addOwner = () => {};

  render() {
    const { ownerA } = this.state;
    return (
      <Wrapper>
        <Content>
          <Title>Account Owners</Title>
          <Owners>
            <input type="radio" value="defaultAcc" />
            <span>Default (who has private key is owner)</span>
          </Owners>
          <Owners>
            <input type="radio" value="ownerList" />
            <span>Owner list</span>
          </Owners>
          <OwnerList>
            <Table>
              <THead>
                <tr>
                  <th>Address</th>
                  <th>Weight</th>
                  <th />
                </tr>
              </THead>
              <TBody>
                <tr>
                  <td>teat13qe0ntm2l4k9m567rxlevdkxxpa74685n8vdhn</td>
                  <td>1</td>
                  <td>x</td>
                </tr>
                <tr>
                  <td>teat1l3dgxy0nyud7vh9cwcem73had74q2us5uxp04v</td>
                  <td>1</td>
                  <td>x</td>
                </tr>
                <tr>
                  <td>teat1l3dgxy0nyud7vh9cwcem73had74q2us5uxp04v</td>
                  <td>1</td>
                  <td>x</td>
                </tr>
              </TBody>
            </Table>
            <OwnerAdd>
              <STOInput
                title="Owner address or alias"
                type="text"
                defaulValue={ownerA}
                onChange={this._ownerChange}
                autoFocus
              />
              <STOInput title="Weight" type="text" onChange={this._ownerChange} onFocus={this._ownerChange} />
              <Button onClick={this._addOwner}>
                <span>ADD</span>
              </Button>
            </OwnerAdd>
            <WarningText>
              <span>Require approval weight of at least (?):</span>
              <WarningTooltip>
                <img src={nr} alt="" />
                <div className="tips">
                  For example, if approval weight is 2, a transaction from this address require approval of at least 2
                  owners, each has weight of 1
                </div>
              </WarningTooltip>
            </WarningText>
            <OwnerAdd>
              <STOInput title="Weight" type="text" defaulValue={ownerA} onChange={this._ownerChange} autoFocus />
              <Button onClick={this._addOwner}>
                <span>SET</span>
              </Button>
            </OwnerAdd>
          </OwnerList>
        </Content>
      </Wrapper>
    );
  }
}

export default AccOwners;
