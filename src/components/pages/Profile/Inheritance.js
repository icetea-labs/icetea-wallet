import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import tweb3 from '../../../service/tweb3';
import STOInput from '../Balances/STOInput';
import {
  H2,
  TabWrapper,
  TabMediaContent,
  TapWrapperContent,
  Button,
  WrapperNote,
  Note,
  Guide,
  WrapperBlock,
  WrapperTexinput,
  WrapperButton,
  WrapperTable,
  StyledText,
} from './Styled';
import { FontDin, Icon } from '../../elements/utils';
import Table from '../../elements/TablePro';
import notifi from '../../elements/Notification';
import * as actions from '../../../store/actions/account';
import * as actionsGlobal from '../../../store/actions/globalData';

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
      current: 1,
      pageSize: 5,
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
        current: 1,
        pageSize: 5,
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

  _addInherit = event => {
    const { address, privateKey, signers, setAuthEle, setNeedAuth } = this.props;
    const { inheritor } = this.state;
    let { wait, lock } = this.state;
    wait = parseInt(wait, 10);
    lock = parseInt(lock, 10);
    const opts = { from: address };
    let privateKeyTMP = privateKey;

    if (signers.isRepresent) {
      privateKeyTMP = signers.privateKey;
      opts.signers = signers.address;
    }

    if (!privateKeyTMP) {
      setNeedAuth(true);
      setAuthEle(event.currentTarget);
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
        .sendCommit(opts)
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

  _deleteInherit = (inheritor, event) => {
    const { address, privateKey, signers, setAuthEle, setNeedAuth } = this.props;
    const opts = { from: address };
    let privateKeyTMP = privateKey;

    if (signers.isRepresent) {
      privateKeyTMP = signers.privateKey;
      opts.signers = signers.address;
    }

    if (!privateKeyTMP) {
      setNeedAuth(true);
      setAuthEle(event.currentTarget);
    } else {
      tweb3
        .contract('system.did')
        .methods.removeInheritor(address, inheritor.address)
        .sendCommit(opts)
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

  buildColumns = () => {
    return [
      {
        title: 'Address (alias)',
        headerAlign: 'left',
        width: '56%',
        sorter: true,
        dataIndex: 'address',
        key: 'address',
        render: e => (
          <StyledText>
            <FontDin value={e.address} />
          </StyledText>
        ),
      },
      {
        title: 'Wait',
        dataIndex: 'wait',
        headerAlign: 'left',
        width: '17%',
        sorter: true,
        key: 'wait',
        render: e => (
          <StyledText>
            <FontDin value={e.wait} />
          </StyledText>
        ),
      },
      {
        title: 'Lock',
        dataIndex: 'lock',
        headerAlign: 'left',
        width: '17%',
        sorter: true,
        key: 'lock',
        render: e => (
          <StyledText>
            <FontDin value={e.lock} />
          </StyledText>
        ),
      },
      {
        title: '',
        dataIndex: 'remove',
        headerAlign: 'left',
        width: '10%',
        key: '',
        render: tag => (
          <div onClick={event => this._deleteInherit(tag, event)} role="presentation">
            <Icon type="delete" color="#848E9C" hoverColor="#15b5dd" />
          </div>
        ),
      },
    ];
  };

  buildDataSource = () => {
    const { inheritorList, current, pageSize } = this.state;
    // console.log('inheritorList', inheritorList);
    const total = Object.keys(inheritorList).length;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    let newList = [];

    if (total > 0) {
      if (to > total) to = total;
      newList = Object.keys(inheritorList)
        .slice(from, to)
        .map(key => ({ [key]: inheritorList[key] }));
    }

    const dataSource = newList.map(item => {
      const key = Object.keys(item)[0];
      return {
        address: key,
        wait: item[key].waitPeriod,
        lock: item[key].lockPeriod,
        remove: key,
      };
    });
    return dataSource;
  };

  paging = (current, pageSize) => {
    if (pageSize) {
      this.setState({
        current,
        pageSize,
      });
    } else {
      this.setState({
        current,
      });
    }
  };

  render() {
    const { inheritor, wait, lock, inheritorList, inheErr, waitErr, lockErr, current, pageSize } = this.state;
    const total = Object.keys(inheritorList).length;

    return (
      <TabWrapper>
        <TabMediaContent>
          <H2>Inheritance</H2>
          <WrapperBlock width="70%">
            <TapWrapperContent>
              <WrapperNote>
                <Note>
                  <p>- Wait: how many days the inheritor has to wait before he/she can make inheritance claim</p>
                  <p>- Lock: how many days he/she is locked after a rejected inheritance claim</p>
                </Note>
                <Guide>
                  <span>
                    Please check out &nbsp;
                    <a target="_blank" href="https://docs.icetea.io/" rel="noopener noreferrer">
                      Icetea documentation
                    </a>
                    &nbsp; about inheritance flow.
                  </span>
                </Guide>
              </WrapperNote>
              <div className="alias">
                <WrapperTexinput>
                  <STOInput
                    msgErr={inheErr}
                    title="Address or alias"
                    type="text"
                    defaultValue={inheritor}
                    onChange={this._addOrAliasChange}
                    autoFocus
                  />
                </WrapperTexinput>
                <WrapperTexinput width="30%">
                  <STOInput
                    msgErr={waitErr}
                    title="Wait"
                    type="number"
                    defaultValue={wait}
                    onChange={this._waitChange}
                  />
                </WrapperTexinput>
                <WrapperTexinput width="30%">
                  <STOInput
                    msgErr={lockErr}
                    title="Lock"
                    type="number"
                    defaultValue={lock}
                    onChange={this._lockChange}
                  />
                </WrapperTexinput>
                <WrapperButton>
                  <Button onClick={this._addInherit}>
                    <span>Add</span>
                  </Button>
                </WrapperButton>
              </div>
              <WrapperTable>
                <div className="table-cus">
                  <Table
                    columns={this.buildColumns()}
                    dataSource={this.buildDataSource()}
                    paging={this.paging}
                    total={total}
                    current={current}
                    pageSize={pageSize}
                    showQuickJumper={false}
                    showSizeChanger={false}
                  />
                </div>
              </WrapperTable>
            </TapWrapperContent>
          </WrapperBlock>
        </TabMediaContent>
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
    setAuthEle: data => {
      dispatch(actionsGlobal.setAuthEle(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inheritance);
