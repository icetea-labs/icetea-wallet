import React, { PureComponent } from 'react';

import STOInput from '../Balances/STOInput';
import { Wrapper, Content, Title, OwnerList, Button, Table, THead, TBody, OwnerAdd, Note, Guide } from './StyleProfile';

class Inheritance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addOrAlias: '',
      wait: '',
      lock: '',
    };
  }

  _addOrAliasChange = () => {};

  _waitChange = () => {};

  _lockChange = () => {};

  _addInherit = () => {};

  render() {
    const { addOrAlias, wait, lock } = this.state;
    return (
      <Wrapper>
        <Content>
          <Title>Inheritance</Title>
          <OwnerList>
            <Table>
              <THead>
                <tr>
                  <th>Address</th>
                  <th>Wait(days)</th>
                  <th>Lock(days)</th>
                  <th />
                </tr>
              </THead>
              <TBody>
                <tr>
                  <td>teat13qe0ntm2l4k9m567rxlevdkxxpa74685n8vdhn</td>
                  <td>1</td>
                  <td>2</td>
                  <td>x</td>
                </tr>
                <tr>
                  <td>teat1l3dgxy0nyud7vh9cwcem73had74q2us5uxp04v</td>
                  <td>1</td>
                  <td>2</td>
                  <td>x</td>
                </tr>
                <tr>
                  <td>teat1l3dgxy0nyud7vh9cwcem73had74q2us5uxp04v</td>
                  <td>1</td>
                  <td>2</td>
                  <td>x</td>
                </tr>
              </TBody>
            </Table>
            <OwnerAdd>
              <STOInput
                styleName="addText"
                title="Address or alias"
                type="text"
                defaulValue={addOrAlias}
                onChange={this._addOrAliasChange}
                autoFocus
              />
              <STOInput title="Wait" type="text" defaulValue={wait} onChange={this._waitChange} autoFocus />
              <STOInput title="Lock" type="text" defaulValue={lock} onChange={this._lockChange} autoFocus />
              <Button onClick={this._addInherit}>
                <span>ADD</span>
              </Button>
            </OwnerAdd>
            <Note>
              <p>- Wait: how many days the inheritor has to wait before he/she can make inheritance claim</p>
              <p>- Lock: how many days he/she is locked after a rejected inheritance claim</p>
            </Note>
            <Guide>
              <span>
                Please check out <a href="https://docs.icetea.io/">Icetea documentation</a> about inheritance flow.
              </span>
            </Guide>
          </OwnerList>
        </Content>
      </Wrapper>
    );
  }
}

export default Inheritance;
