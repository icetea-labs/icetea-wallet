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
import * as actions from '../../../store/actions/account';

class AccOwners extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'one',
      ownerAdd: '',
      msgErr: '',
      ownersList: {},
      weight: '',
      weightErr: '',
    };
  }

  componentDidMount() {
    const { address } = this.props;
    this.loadDid(address);
  }

  componentWillReceiveProps(nextProps) {
    const { address } = this.props;
    if (address !== nextProps.address) {
      this.loadDid(nextProps.address);
    }
  }

  loadDid = address => {
    tweb3
      .contract('system.did')
      .methods.query(address)
      .call()
      .then(props => {
        if (props) {
          const { owners, threshold } = props;
          if (threshold) {
            this.setState({ weight: threshold });
          } else {
            this.setState({ weight: 1 });
          }
          if (owners && Object.keys(owners).length) {
            this.setState({ ownersList: Object.assign({}, owners) });
          } else {
            this.setState({ ownersList: {} });
          }
        } else {
          this.setState({ weight: 1, ownersList: {} });
        }
      });
  };

  radioOnChange = value => {
    const { radioValue } = this.state;
    if (radioValue !== value) {
      this.setState({
        radioValue: value,
      });
    }
  };

  _ownerChange = e => {
    this.setState({ msgErr: '', ownerAdd: e });
  };

  _addOwner = () => {
    const { address, privateKey } = this.props;
    const { ownerAdd } = this.state;
    const { setNeedAuth } = this.props;
    let { weight } = this.state;
    weight = parseInt(weight, 10);
    if (!privateKey) {
      setNeedAuth(true);
    } else {
      if (!ownerAdd) {
        this.setState({ msgErr: 'Owner field is required.' });
        return;
      }
      if (!weight) {
        this.setState({ msgErr: 'Weight field is required number.' });
        return;
      }
      tweb3
        .contract('system.did')
        .methods.addOwner(address, ownerAdd, weight)
        .sendCommit({ from: address })
        .then(() => {
          this.loadDid(address);
          notifi.info('Success');
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
  };

  _ownerWeightChange = e => {
    this.setState({ weightErr: '', weight: e });
  };

  _setOwnerWeight = () => {
    const { address, privateKey } = this.props;
    const { setNeedAuth } = this.props;
    let { weight } = this.state;
    weight = parseInt(weight, 10);
    if (!privateKey) {
      setNeedAuth(true);
    } else {
      if (!weight) {
        this.setState({ weightErr: 'Weight field is required number.' });
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
          notifi.warn(String(error));
        });
    }
  };

  _deleteOwner = owner => {
    const { address, privateKey } = this.props;
    const { setNeedAuth } = this.props;
    if (!privateKey) {
      setNeedAuth(true);
    } else {
      if (!window.confirm(`Sure to delete ${owner}?`)) {
        return;
      }

      tweb3
        .contract('system.did')
        .methods.removeOwner(address, owner)
        .sendCommit({ from: address })
        .then(r => {
          this.loadDid(address);
          notifi.info('Success');
        })
        .catch(error => {
          console.error(error);
          window.alert(String(error));
        });
    }
  };

  render() {
    const { ownerAdd, msgErr, ownersList, radioValue, weight, weightErr } = this.state;
    const ownersListTBL = Object.keys(ownersList).map(key => (
      <tr key={key}>
        <td>{key}</td>
        <td>{ownersList[key]}</td>
        <td>
          <span onClick={() => this._deleteOwner(key)}>X</span>
        </td>
      </tr>
    ));

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
                  <TBody>{ownersListTBL}</TBody>
                </Table>
                <OwnerAdd>
                  <STOInput
                    title="Owner address or alias"
                    styleName="addText"
                    type="text"
                    defaultValue={ownerAdd}
                    onChange={this._ownerChange}
                    autoFocus
                  />
                  <STOInput
                    title="Weight"
                    type="number"
                    defaultValue={weight}
                    onChange={this._ownerWeightChange}
                    onFocus={this._ownerWeightChange}
                  />
                  <Button onClick={this._addOwner}>
                    <span>Add</span>
                  </Button>
                </OwnerAdd>
                {msgErr && <Error>{msgErr}</Error>}
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
                    defaultValue={weight}
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

AccOwners.defaultProps = {
  address: '',
  privateKey: '',
};

const mapStateToProps = state => {
  const { account } = state;
  return {
    // address: account.address,
    // privateKey: account.privateKey,
    childKey: account.childKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNeedAuth: data => {
      dispatch(actions.setNeedAuth(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccOwners);
