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
  Error,
} from './Styled';
import { setNeedAuth } from '../../../store/actions/account';
import notifi from '../../elements/Notification';
import { PuConfirm } from '../../elements/PuConfirm';

class Inheritance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wait: '',
      lock: '',
      inheritor: '',
      inheritorList: {},
      msgErr: '',
      isShowDel: false,
    };
  }

  componentDidMount() {
    const { address } = this.props;
    this.loadDid(address);
  }

  loadDid = address => {
    tweb3
      .contract('system.did')
      .methods.query(address)
      .call()
      .then(props => {
        if (props) {
          const { inheritors } = props;
          // console.log('Inheritors', inheritors);
          if (inheritors && Object.keys(inheritors).length) {
            this.setState({ inheritorList: Object.assign({}, inheritors) });
          } else {
            this.setState({ inheritorList: {} });
          }
        }
      });
  };

  _addInherit = () => {
    const { address, privateKey } = this.props;
    const { inheritor } = this.state;
    let { wait, lock } = this.state;
    wait = parseInt(wait);
    lock = parseInt(lock);
    if (!privateKey) {
      this.props.setNeedAuth(true);
    } else {
      if (!inheritor) {
        this.setState({
          msgErr: 'Address or alias field is required',
        });
        return;
      }
      if (!wait || !lock) {
        this.setState({
          msgErr: 'Wait and Lock field is required number',
        });
        return;
      }
      tweb3
        .contract('system.did')
        .methods.addInheritor(address, inheritor, wait, lock)
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

  _confirmDelete = () => {};

  _deleteInherit = inheritor => {
    const { address, privateKey } = this.props;
    if (!privateKey) {
      this.props.setNeedAuth(true);
    } else {
      if (!window.confirm('Sure to delete ' + inheritor + '?')) {
        return;
      }

      tweb3
        .contract('system.did')
        .methods.removeInheritor(address, inheritor)
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

  _addOrAliasChange = e => {
    this.setState({ inheritorErr: '', inheritor: e });
  };

  _waitChange = e => {
    this.setState({ waitErr: '', wait: e });
  };

  _lockChange = e => {
    this.setState({ lockErr: '', lock: e });
  };

  render() {
    const { inheritor, wait, lock, inheritorList, msgErr, isShowDel } = this.state;
    // console.log('Inhe CK', Object.keys(inheritorList));
    const inheritTBL = Object.keys(inheritorList).map(key => (
      <tr key={key}>
        <td>{key}</td>
        <td>{inheritorList[key].waitPeriod}</td>
        <td>{inheritorList[key].lockPeriod}</td>
        <td>
          <span onClick={() => this._deleteInherit(key)}>X</span>
        </td>
      </tr>
    ));
    // console.log('TBl CK', inheritTBL);

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
                styleName="addText"
                title="Address or alias"
                type="text"
                defaulValue={inheritor}
                onChange={this._addOrAliasChange}
                autoFocus
              />
              <STOInput
                title="Wait"
                type="number"
                defaulValue={wait}
                onChange={this._waitChange}
                onFocus={this._waitChange}
              />
              <STOInput
                title="Lock"
                type="number"
                defaulValue={lock}
                onChange={this._lockChange}
                onFocus={this._lockChange}
              />
              <Button onClick={this._addInherit}>
                <span>Add</span>
              </Button>
            </OwnerAdd>
            {msgErr && <Error>{msgErr}</Error>}
            <Note>
              <p>- Wait: how many days the inheritor has to wait before he/she can make inheritance claim</p>
              <p>- Lock: how many days he/she is locked after a rejected inheritance claim</p>
            </Note>
            <Guide>
              <span>
                Please check out <a href="https://docs.icetea.io/">Icetea documentation</a> about inheritance flow.
              </span>
            </Guide>
            {/* {isShowDel && (
              <PuConfirm
                cancelText="Cancel"
                okText="OK"
                confirm={this._confirmDelete}
                cancel={() => this.setState({ isShowDel: false })}
              >
                <p>Are you sure you want to close wallet?</p>
              </PuConfirm>
            )} */}
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
)(Inheritance);
