import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import STOInput from '../Balances/STOInput';
import {
  H2,
  TabWrapper,
  MediaContent,
  TapWrapperContent,
  Button,
  OwnerList,
  Table,
  THead,
  TBody,
  OwnerAdd,
  WarningText,
  WarningTooltip,
  RadioGroup,
  Error,
} from './Styled';
import nr from '../../../assets/img/nr.svg';
import tweb3 from '../../../service/tweb3';
import notifi from '../../elements/Notification';
import { setNeedAuth } from '../../../store/actions/account';

class AccOwners extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'one',
      ownerA: '',
      weight: '',
      weightErr: '',
    };
  }

  radioOnChange = value => {
    const { radioValue } = this.state;
    if (radioValue !== value) {
      this.setState({
        radioValue: value,
      });
    }
  };

  _ownerChange = () => {};

  _addOwner = () => {};

  _ownerWeightChange = e => {
    this.setState({ weightErr: '', weight: e });
  };

  _setOwnerWeight = () => {
    const { address, privateKey } = this.props;
    const { weight } = this.state;
    if (!privateKey) {
      this.props.setNeedAuth(true);
    } else {
      if (!weight) {
        this.setState({ weightErr: 'Weight field is required' });
        return;
      }
      tweb3
        .contract('system.did')
        .methods.setThreshold(address, +weight)
        .sendCommit({ from: address })
        .then(r => {
          this.setState({ weight: r.result });
          notifi.info('Success');
        })
        .catch(error => {
          console.error(error);
          window.alert(String(error));
        });
    }
  };

  render() {
    const { ownerA, radioValue, weight, weightErr } = this.state;
    return (
      <TabWrapper>
        <MediaContent>
          <H2>Account Owners</H2>
          <TapWrapperContent>
            <RadioGroup>
              <li
                className={radioValue === 'one' ? 'on' : ''}
                onClick={() => this.radioOnChange('one')}
                role="presentation"
              >
                <div className="selected" />
                <span>Default (who has private key is owner)</span>
              </li>
            </RadioGroup>
            <RadioGroup>
              <li
                className={radioValue === 'two' ? 'on' : ''}
                onClick={() => this.radioOnChange('two')}
                role="presentation"
              >
                <div className="selected" />
                <span>Owner list</span>
              </li>
            </RadioGroup>
            {radioValue === 'two' && (
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
                    <span>Add</span>
                  </Button>
                </OwnerAdd>
                <WarningText>
                  <span>Require approval weight of at least (?):</span>
                  <WarningTooltip>
                    <img src={nr} alt="" />
                    <div className="tips">
                      For example, if approval weight is 2, a transaction from this address require approval of at least
                      2 owners, each has weight of 1
                    </div>
                  </WarningTooltip>
                </WarningText>
                <OwnerAdd>
                  <STOInput
                    title="Weight"
                    type="number"
                    defaulValue={weight}
                    onChange={this._ownerWeightChange}
                    onFocus={this._ownerWeightChange}
                  />
                  <Button onClick={this._setOwnerWeight}>
                    <span>Set</span>
                  </Button>
                </OwnerAdd>
                {weightErr && <Error>{weightErr}</Error>}
              </OwnerList>
            )}
          </TapWrapperContent>
        </MediaContent>
      </TabWrapper>
    );
  }
}
const mapStateToProps = state => {
  const { account } = state;
  return {
    address: account.address,
    privateKey: account.privateKey,
    cipher: account.cipher,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNeedAuth: data => {
      dispatch(setNeedAuth(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccOwners);
