import React, { PureComponent } from 'react';

import STOInput from '../Balances/STOInput';
import {
  Wrapper,
  Content,
  Title,
  Owners,
  OwnerList,
  Button,
  Table,
  THead,
  TBody,
  OwnerAdd,
  WarningText,
  WarningTooltip,
} from './StyleProfile';
import nr from '../../../assets/img/nr.svg';

class AccOwners extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ownerA: '',
    };
  }

  _ownerChange = () => {};

  _addOwner = () => {};

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
                styleName="addText"
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
