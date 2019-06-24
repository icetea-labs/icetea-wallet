import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import tweb3 from '../../../service/tweb3';
import STOInput from '../Balances/STOInput';
import {
  H2,
  TabWrapper,
  MediaContent,
  TapWrapperContent,
  Button,
  Table,
  THead,
  TBody,
  OwnerAdd,
  Note,
  Guide,
} from './Styled';
import notifi from '../../elements/Notification';
import * as actions from '../../../store/actions/account';
import { Icon } from '../../elements/utils';

class Inheritance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wait: '',
      lock: '',
      inheritor: '',
      inheritorList: {},
      inheErr: '',
      waitErr: '',
      lockErr: '',
    };
  }

  componentDidMount() {
    const { address } = this.props;
    address && this.loadDid(address);
  }

  componentWillReceiveProps(nextProps) {
    const { address } = this.props;
    if (!nextProps.address) {
      this.setState({
        wait: '',
        lock: '',
        inheritor: '',
        inheritorList: {},
        inheErr: '',
        waitErr: '',
        lockErr: '',
      });
    } else {
      address !== nextProps.address && this.loadDid(nextProps.address);
    }
  }

  loadDid = address => {
    tweb3
      .contract('system.did')
      .methods.query(address)
      .call()
      .then(props => {
        if (props) {
          const { inheritors } = props;
          if (inheritors && Object.keys(inheritors).length) {
            this.setState({ inheritorList: Object.assign({}, inheritors) });
          } else {
            this.setState({ inheritorList: {} });
          }
        } else {
          this.setState({ inheritorList: {} });
        }
      });
  };

  _addInherit = () => {
    const { address, privateKey } = this.props;
    const { setNeedAuth } = this.props;
    const { inheritor } = this.state;
    let { wait, lock } = this.state;
    wait = parseInt(wait, 10);
    lock = parseInt(lock, 10);
    if (!privateKey) {
      setNeedAuth(true);
    } else {
      if (!inheritor) {
        this.setState({
          inheErr: 'Address or alias field is required',
        });
        return;
      }
      if (!wait) {
        this.setState({
          waitErr: 'Wait field is required number',
        });
        return;
      }
      if (!lock) {
        this.setState({
          lockErr: 'Lock field is required number',
        });
        return;
      }
      tweb3
        .contract('system.did')
        .methods.addInheritor(address, inheritor, wait, lock)
        .sendCommit({ from: address })
        .then(() => {
          this.loadDid(address);
          notifi.info('Add inheritance success!');
          this.setState({
            inheritor: '',
            wait: '',
            lock: '',
          });
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
  };

  _confirmDelete = () => {};

  _deleteInherit = inheritor => {
    const { address, privateKey } = this.props;
    const { setNeedAuth } = this.props;
    if (!privateKey) {
      setNeedAuth(true);
    } else {
      // if (!window.confirm(`Sure to delete ${inheritor}?`)) {
      //   return;
      // }

      tweb3
        .contract('system.did')
        .methods.removeInheritor(address, inheritor)
        .sendCommit({ from: address })
        .then(() => {
          this.loadDid(address);
          notifi.info('Delete inheritance success!');
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
  };

  _addOrAliasChange = e => {
    this.setState({ inheErr: '', inheritor: e });
  };

  _waitChange = e => {
    this.setState({ waitErr: '', wait: e });
  };

  _lockChange = e => {
    this.setState({ lockErr: '', lock: e });
  };

  render() {
    const { inheritor, wait, lock, inheritorList, inheErr, waitErr, lockErr } = this.state;
    // console.log('inheritorList CK', Object.keys(inheritorList));
    const inheritTBL = Object.keys(inheritorList).map(key => (
      <tr key={key}>
        <td style={{ width: '40%' }}>{key}</td>
        <td style={{ width: '20%' }}>{inheritorList[key].waitPeriod}</td>
        <td style={{ width: '20%' }}>{inheritorList[key].lockPeriod}</td>
        <td style={{ width: '20%' }}>
          <span onClick={() => this._deleteInherit(key)}>
            <Icon type="delete" color="#848E9C" hoverColor="#15b5dd" />
          </span>
        </td>
      </tr>
    ));

    return (
      <TabWrapper>
        <MediaContent>
          <H2>Inheritance</H2>
          <TapWrapperContent>
            <Table>
              <THead>
                <tr>
                  <th>Address</th>
                  <th>Wait(days)</th>
                  <th>Lock(days)</th>
                  <th />
                </tr>
              </THead>
              <TBody>{inheritTBL}</TBody>
            </Table>
            <OwnerAdd>
              <STOInput
                msgErr={inheErr}
                width="40%"
                title="Address or alias"
                type="text"
                defaultValue={inheritor}
                onChange={this._addOrAliasChange}
                autoFocus
              />
              <STOInput
                msgErr={waitErr}
                width="20%"
                title="Wait"
                type="number"
                defaultValue={wait}
                onChange={this._waitChange}
                onFocus={this._waitChange}
              />
              <STOInput
                msgErr={lockErr}
                width="20%"
                title="Lock"
                type="number"
                defaultValue={lock}
                onChange={this._lockChange}
                onFocus={this._lockChange}
              />
              <Button onClick={this._addInherit}>
                <span>Add</span>
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
          </TapWrapperContent>
        </MediaContent>
      </TabWrapper>
    );
  }
}

Inheritance.defaultProps = {
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
)(Inheritance);
