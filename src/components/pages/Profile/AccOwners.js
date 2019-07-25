import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import STOInput from '../Balances/STOInput';
import {
  H2,
  TabWrapper,
  TabMediaContent,
  TapWrapperContent,
  Button,
  WarningText,
  WarningTooltip,
  RadioGroup,
  WrapperBlock,
  WrapperTexinput,
  WrapperButton,
  WrapperTable,
  StyledText,
} from './Styled';
import { FontDin, Icon } from '../../elements/utils';
import Table from '../../elements/TablePro';
import nr from '../../../assets/img/nr.svg';
import tweb3 from '../../../service/tweb3';
import notifi from '../../elements/Notification';
import * as actions from '../../../store/actions/account';
import * as actionsGlobal from '../../../store/actions/globalData';

class AccOwners extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'one',
      ownerAdd: '',
      ownerErr: '',
      ownersList: {},
      weight: '',
      weightErr: '',
      threshold: '',
      thresholdErr: '',
      current: 1,
      pageSize: 5,
      add: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { address } = nextProps;
    if (address !== prevState.add) {
      return {
        add: address,
      };
    }
    return null;
  }

  componentDidMount() {
    this.loadDid();
  }

  componentDidUpdate(prevProps, prevState) {
    const { add } = this.state;
    add !== prevState.add && this.loadDid();
  }

  loadDid = () => {
    const { add } = this.state;
    if (add) {
      tweb3
        .contract('system.did')
        .methods.query(add)
        .call()
        .then(props => {
          if (props) {
            const { owners, threshold } = props;
            if (threshold) {
              this.setState({ weight: threshold, threshold });
            } else {
              this.setState({ weight: 1, threshold: 1 });
            }
            if (owners && Object.keys(owners).length) {
              this.setState({ ownersList: Object.assign({}, owners) });
            } else {
              this.setState({ ownersList: {} });
            }
          } else {
            this.setState({ weight: 1, threshold: 1, ownersList: {} });
          }
        });
    } else {
      this.setState({
        radioValue: 'one',
        ownerAdd: '',
        ownerErr: '',
        ownersList: {},
        weight: '',
        weightErr: '',
        threshold: '',
        thresholdErr: '',
        current: 1,
        pageSize: 5,
      });
    }
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
    this.setState({ ownerErr: '', ownerAdd: e });
  };

  _addOwner = event => {
    const { address, privateKey, signers, setAuthEle, setNeedAuth } = this.props;
    const { ownerAdd } = this.state;
    let { weight } = this.state;
    weight = parseInt(weight, 10);
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
      if (!ownerAdd) {
        this.setState({ ownerErr: 'Owner field is required.' });
        return;
      }
      if (!weight) {
        this.setState({ weightErr: 'Weight field is required number.' });
        return;
      }
      tweb3
        .contract('system.did')
        .methods.addOwner(address, ownerAdd, weight)
        .sendCommit(opts)
        .then(() => {
          this.loadDid(address);
          notifi.info('Add owner success!');
          this.setState({ ownerAdd: '', weight: '' });
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

  _ownerThresholdChange = e => {
    this.setState({ thresholdErr: '', threshold: e });
  };

  _setOwnerWeight = event => {
    const { address, privateKey, signers, setAuthEle, setNeedAuth } = this.props;
    let { threshold } = this.state;
    threshold = parseInt(threshold, 10);
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
      if (!threshold) {
        this.setState({ thresholdErr: 'Weight field is required number.' });
        return;
      }
      tweb3
        .contract('system.did')
        .methods.setThreshold(address, +threshold)
        .sendCommit(opts)
        .then(() => {
          this.setState({ threshold });
          notifi.info('Set owner weight success!');
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
  };

  _deleteOwner = (owner, event) => {
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
      // if (!window.confirm(`Sure to delete ${owner}?`)) {
      //   return;
      // }

      tweb3
        .contract('system.did')
        .methods.removeOwner(address, owner.address)
        .sendCommit(opts)
        .then(() => {
          this.loadDid(address);
          notifi.info('Delete owner success!');
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
  };

  buildColumns = () => {
    return [
      {
        title: 'Address (alias)',
        headerAlign: 'left',
        width: '65%',
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
        title: 'Weight',
        dataIndex: 'weight',
        headerAlign: 'left',
        width: '25%',
        sorter: true,
        key: 'Weight',
        render: e => (
          <StyledText>
            <FontDin value={e.weight} />
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
          <div onClick={event => this._deleteOwner(tag, event)} role="presentation">
            <Icon type="delete" color="#848E9C" hoverColor="#15b5dd" />
          </div>
        ),
      },
    ];
  };

  buildDataSource = () => {
    const { ownersList, current, pageSize } = this.state;

    const total = Object.keys(ownersList).length;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    let newList = [];

    if (total > 0) {
      if (to > total) to = total;
      newList = Object.keys(ownersList)
        .slice(from, to)
        .map(key => ({ [key]: ownersList[key] }));
    }

    const dataSource = newList.map(item => {
      const key = Object.keys(item)[0];
      return {
        address: key,
        weight: item[key],
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
    const {
      ownerAdd,
      ownerErr,
      ownersList,
      radioValue,
      weight,
      weightErr,
      threshold,
      thresholdErr,
      current,
      pageSize,
    } = this.state;
    const total = Object.keys(ownersList).length;

    return (
      <TabWrapper>
        <TabMediaContent>
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
              <React.Fragment>
                <WrapperBlock width="30%">
                  <TapWrapperContent>
                    <WarningText>
                      <span>Require approval weight of at least (?):</span>
                      <WarningTooltip>
                        <img src={nr} alt="" />
                        <div className="tips">
                          For example, if approval weight is 2, a transaction from this address require approval of at
                          least 2 owners, each has weight of 1
                        </div>
                      </WarningTooltip>
                    </WarningText>
                    <div className="alias">
                      <WrapperTexinput>
                        <STOInput
                          msgErr={thresholdErr}
                          title="Weight"
                          type="number"
                          defaultValue={threshold}
                          onChange={this._ownerThresholdChange}
                        />
                      </WrapperTexinput>
                      <WrapperButton>
                        <Button onClick={this._setOwnerWeight}>
                          <span>Set</span>
                        </Button>
                      </WrapperButton>
                    </div>
                  </TapWrapperContent>
                </WrapperBlock>
                <WrapperBlock width="60%">
                  <TapWrapperContent>
                    <div className="alias">
                      <WrapperTexinput>
                        <STOInput
                          msgErr={ownerErr}
                          title="Owner address or alias"
                          type="text"
                          defaultValue={ownerAdd}
                          onChange={this._ownerChange}
                          autoFocus
                        />
                      </WrapperTexinput>
                      <WrapperTexinput width="30%">
                        <STOInput
                          msgErr={weightErr}
                          title="Weight"
                          type="number"
                          defaultValue={weight}
                          onChange={this._ownerWeightChange}
                        />
                      </WrapperTexinput>
                      <WrapperButton>
                        <Button onClick={this._addOwner}>
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
                          showHeaderNonData={false}
                        />
                      </div>
                    </WrapperTable>
                  </TapWrapperContent>
                </WrapperBlock>
              </React.Fragment>
            )}
          </TapWrapperContent>
        </TabMediaContent>
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
    setAuthEle: data => {
      dispatch(actionsGlobal.setAuthEle(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccOwners);
