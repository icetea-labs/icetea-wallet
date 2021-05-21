import React, { PureComponent } from 'react';
import { codec } from '@iceteachain/common';
import _ from 'lodash';
import { connect } from 'react-redux';
import notifi from '../../elements/Notification';
import tweb3 from '../../../service/tweb3';
import { toTEA } from '../../../utils';
import * as actions from '../../../store/actions/account';
import * as actionsGlobal from '../../../store/actions/globalData';
import STOInput from '../Balances/STOInput';
import {
  H2,
  TabWrapper,
  TabMediaContent,
  WrapperBlock,
  TapWrapperContent,
  WrapperTexinput,
  WrapperButton,
  Button,
  StyledText,
  WrapperTable,
} from './Styled';
import { FontDin, Icon } from '../../elements/utils';
import Table from '../../elements/TablePro';

class General extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      add: '',
      signers: {},
      alias: '',
      tagsList: {},
      tagsValue: '',
      current: 1,
      pageSize: 5,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { address, balance, signers } = nextProps;
    let value = {};

    if (address !== prevState.add) value = Object.assign({}, { add: address });
    if (_.isEqual(signers, prevState.signers)) value = Object.assign({}, { signers });
    if (balance !== prevState.balance) value = Object.assign({}, { balance });
    if (value) return value;

    return null;
  }

  componentDidMount() {
    this.onLoadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { add } = this.state;
    add !== prevState.add && this.onLoadData();
  }

  onLoadData = () => {
    const { add, signers, balance } = this.state;
    if (!add) {
      // notifi.warn('Please got to unlock wallet!');
      this.setState({
        balance: 0,
        alias: '',
        tagsList: {},
        tagsValue: '',
        current: 1,
        pageSize: 5,
      });
      return;
    }
    this.loadAlias(add);
    this.reLoadData(add);
    if (signers.isRepresent) {
      this.loadBalance(add);
    } else {
      this.setState({ balance });
    }
  };

  loadBalance = address => {
    tweb3.getBalance(address).then(({ balance }) => {
      this.setState({ balance: Number(balance) });
    });
  };

  registerFaucetEvent = event => {
    const { signers, setNeedAuth, setAuthEle } = this.props;
    const { opts, privateKey, address } = this.beforeSubmit();

    if (!this.validateAddress(opts.signers || opts.from).isvalid) {
      notifi.warn('Invalid account');
      return;
    }

    if (!privateKey) {
      setNeedAuth(true);
      setAuthEle(event.currentTarget);
    } else {
      tweb3
        .contract('system.faucet')
        .methods.request(/* address */)
        .sendCommit(opts)
        .then(async r => {
          notifi.info(`Faucet Success: ${toTEA(r.returnValue)} PKF`);
          const { childKey, setAccount } = this.props;

          if (signers.isRepresent) {
            this.loadBalance(address);
          } else {
            const childKeyTmp = [];
            for (let i = 0; i < childKey.length; i += 1) {
              const newChild = Object.assign({}, childKey[i]);
              const { balance } = await tweb3.getBalance(newChild.address);
              newChild.balance = Number(balance);
              childKeyTmp.push(newChild);
            }
            setAccount({ childKey: childKeyTmp });
          }
        })
        .catch(error => {
          console.log(error);
          notifi.warn(String(error));
        });
    }
  };

  handleAlias = value => {
    this.setState({ alias: value });
    // this.setState({ alias: value, aliasErr: '' });
  };

  loadAlias = targetAddress => {
    tweb3
      .contract('system.alias')
      .methods.byAddress(targetAddress)
      .call()
      .then(alias => {
        this.setState({ alias });
      });
  };

  registerUpdateAliasEvent = event => {
    const { alias } = this.state;
    const { setNeedAuth, setAuthEle } = this.props;
    const { opts, privateKey, address } = this.beforeSubmit();

    if (!this.validateAddress(opts.signers || opts.from).isvalid) {
      notifi.warn('Invalid account');
      return;
    }

    if (!privateKey) {
      setNeedAuth(true);
      setAuthEle(event.currentTarget);
    } else {
      if (!alias) {
        // this.setState({ aliasErr: 'Alias field is required' });
        return;
      }
      tweb3
        .contract('system.alias')
        .methods.register(alias, address)
        .sendCommit(opts)
        .then(() => {
          this.loadAlias(address);
          notifi.info('Set alias success!');
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
  };

  handleTagsName = value => {
    this.setState({ tagsName: value });
    // this.setState({ tagsName: value, tagsNameErr: '' });
  };

  handleTagsValue = value => {
    this.setState({ tagsValue: value });
    // this.setState({ tagsValue: value, tagsValueErr: '' });
  };

  registerAddTagEvent = event => {
    const { setNeedAuth, setAuthEle } = this.props;
    const { tagsName, tagsValue } = this.state;
    const { opts, privateKey, address } = this.beforeSubmit();
    const name = tagsName;
    const value = tagsValue;

    if (!this.validateAddress(opts.signers || opts.from).isvalid) {
      notifi.warn('Invalid account');
      return;
    }

    if (!privateKey) {
      setNeedAuth(true);
      setAuthEle(event.currentTarget);
    } else {
      if (!name || !value) {
        // this.setState({ tagsNameErr: 'Err', tagsValueErr: 'Err' });
        return;
      }
      tweb3
        .contract('system.did')
        .methods.setTag(address, name, value)
        .sendCommit(opts)
        .then(resp => {
          this.reLoadData(address);
          this.setState({
            tagsName: '',
            tagsValue: '',
          });
          console.log('Tag resp: ', resp);
          notifi.info(`Tag name [${name}] added.`);
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
  };

  reLoadData = targetAddress => {
    tweb3
      .contract('system.did')
      .methods.query(targetAddress)
      .call()
      .then(resp => {
        // console.log('system.did', resp);
        if (resp) {
          const { tags } = resp;
          if (tags) {
            Object.keys(tags).length && this.setState({ tagsList: Object.assign({}, tags) });
          } else {
            this.setState({ tagsList: {} });
          }
        } else {
          this.setState({ tagsList: {} });
        }
      });
  };

  buildColumns = () => {
    return [
      {
        title: 'Name',
        headerAlign: 'left',
        width: '45%',
        sorter: true,
        dataIndex: 'name',
        key: 'name',
        render: e => (
          <StyledText>
            <FontDin value={e.name} />
          </StyledText>
        ),
      },
      {
        title: 'Value',
        dataIndex: 'value',
        headerAlign: 'left',
        width: '45%',
        sorter: true,
        key: 'value',
        render: e => (
          <StyledText>
            <FontDin value={e.value} />
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
          <div onClick={event => this.registerRemoveTagEvent(tag, event)} role="presentation">
            <Icon type="delete" color="#848E9C" hoverColor="#15b5dd" />
          </div>
        ),
      },
    ];
  };

  registerRemoveTagEvent = (tag, event) => {
    const { address, privateKey, signers, setNeedAuth, setAuthEle } = this.props;
    const opts = { from: address };
    let privateKeyTMP = privateKey;

    if (signers.isRepresent) {
      privateKeyTMP = signers.privateKey;
      opts.signers = signers.address;
    }
    // console.log('tag.currentTarget', event.currentTarget);
    if (!this.validateAddress(opts.signers || opts.from).isvalid) {
      notifi.warn('Invalid account');
      return;
    }

    if (!privateKeyTMP) {
      setNeedAuth(true);
      setAuthEle(event.currentTarget);
    } else {
      tweb3
        .contract('system.did')
        .methods.removeTag(address, tag.name)
        .sendCommit(opts)
        .then(() => {
          this.reLoadData(address);
          notifi.info(`Tag name [${tag.name}] deleted.`);
        })
        .catch(error => {
          console.error(error);
          notifi.warn(String(error));
        });
    }
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

  buildDataSource = () => {
    const { tagsList, current, pageSize } = this.state;

    const total = Object.keys(tagsList).length;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    let newTagsList = [];

    if (total > 0) {
      if (to > total) to = total;
      newTagsList = Object.keys(tagsList)
        .slice(from, to)
        .map(key => ({ [key]: tagsList[key] }));
    }

    const dataSource = newTagsList.map(item => {
      const key = Object.keys(item)[0];
      return {
        name: key,
        value: item[key],
        remove: key,
      };
    });
    return dataSource;
  };

  validateAddress = address => {
    try {
      // console.log('address', address);
      if (codec.isBankAddress(address)) {
        return { isvalid: true, type: 'Bank account' };
      }
      if (codec.isRegularAddress(address)) {
        return { isvalid: true, type: 'Regular account' };
      }
      return { isvalid: false, type: 'Invalid account' };
    } catch (e) {
      return { isvalid: false, type: 'Invalid account' };
    }
  };

  beforeSubmit = () => {
    const { address, privateKey, signers } = this.props;
    const opts = { from: address };
    let privateKeyTMP = privateKey;

    if (signers.isRepresent) {
      privateKeyTMP = signers.privateKey;
      opts.signers = signers.address;
    }

    return { opts, privateKey: privateKeyTMP, address };
  };

  render() {
    const { balance, alias, tagsName, tagsValue, tagsList, pageSize, current } = this.state;
    const { address } = this.props;
    const total = Object.keys(tagsList).length;
    const { type } = this.validateAddress(address);

    return (
      <TabWrapper>
        <TabMediaContent>
          <WrapperBlock>
            <H2>Information</H2>
            <TapWrapperContent>
              <div className="row">
                <p className="header">Type:</p>
                <p> {type}</p>
              </div>
              <div className="row">
                <p className="header">Balance:</p>
                <p> {toTEA(balance)} PKF</p>
              </div>

              <WrapperButton>
                <Button width="170px" onClick={this.registerFaucetEvent}>
                  <span>Get PKF from Faucet</span>
                </Button>
              </WrapperButton>
            </TapWrapperContent>
          </WrapperBlock>
          <WrapperBlock>
            <H2>Alias</H2>
            <TapWrapperContent>
              <div className="alias">
                <WrapperTexinput>
                  <STOInput title="Address or alias" type="text" defaultValue={alias} onChange={this.handleAlias} />
                </WrapperTexinput>

                <WrapperButton>
                  <Button onClick={this.registerUpdateAliasEvent}>
                    <span>Set</span>
                  </Button>
                </WrapperButton>
              </div>
            </TapWrapperContent>
          </WrapperBlock>
          <WrapperBlock>
            <H2>Tags</H2>
            <TapWrapperContent>
              <div className="tags-note">
                <p>Note: these tags are public and unencrypted. Everyone can see.</p>
              </div>
              <div className="alias">
                <WrapperTexinput>
                  <STOInput title="Name" type="text" defaultValue={tagsName} onChange={this.handleTagsName} />
                </WrapperTexinput>
                <WrapperTexinput>
                  <STOInput title="Value" type="text" defaultValue={tagsValue} onChange={this.handleTagsValue} />
                </WrapperTexinput>
                <WrapperButton>
                  <Button onClick={this.registerAddTagEvent}>
                    <span>Set</span>
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
        </TabMediaContent>
      </TabWrapper>
    );
  }
}

General.defaultProps = {
  address: '',
  balance: 0,
};

const mapStateToProps = state => {
  const { account } = state;
  return {
    childKey: account.childKey,
    // triggerElement: globalData.triggerElement,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNeedAuth: data => {
      dispatch(actions.setNeedAuth(data));
    },
    setBalanceChildKey: data => {
      dispatch(actions.setBalanceChildKey(data));
    },
    setAccount: data => {
      dispatch(actions.setAccount(data));
    },
    setAuthEle: data => {
      dispatch(actionsGlobal.setAuthEle(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
