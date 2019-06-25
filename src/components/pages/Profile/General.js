import React, { PureComponent } from 'react';
import { codec } from '@iceteachain/common';
// import Styled from 'styled-components';
import { connect } from 'react-redux';
import notifi from '../../elements/Notification';
import tweb3 from '../../../service/tweb3';
import { toTEA } from '../../../utils/utils';
import * as actions from '../../../store/actions/account';
import * as actionsGlobal from '../../../store/actions/globalData';
import STOInput from '../Balances/STOInput';
import {
  H2,
  TabWrapper,
  MediaContent,
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
      balance: props.balance,
      alias: '',
      // aliasErr: '',
      tagsList: {},
      tagsValue: '',
      // tagsNameErr: '',
      // tagsValueErr: '',
      current: 1,
      pageSize: 5,
    };
  }

  componentDidMount() {
    const { address, signers, balance } = this.props;
    address && this.onLoadData({ address, signers, balance });
  }

  componentWillReceiveProps(nextProps) {
    const { address, balance } = this.props;

    if (nextProps.balance) {
      nextProps.balance !== balance && this.setState({ balance: nextProps.balance });
    }

    if (nextProps.address) {
      nextProps.address !== address && this.onLoadData(nextProps);
    } else {
      this.setState({
        balance: 0,
        alias: '',
        // aliasErr: '',
        tagsList: {},
        tagsValue: '',
        // tagsNameErr: '',
        // tagsValueErr: '',
        current: 1,
        pageSize: 5,
      });
    }
  }

  onLoadData = nextProps => {
    if (!nextProps.address) {
      notifi.warn('Please got to unlock wallet!');
      return;
    }
    this.loadAlias(nextProps.address);
    this.reLoadData(nextProps.address);
    if (nextProps.signers.isRepresent) {
      this.loadBalance(nextProps.address);
    } else {
      this.setState({ balance: nextProps.balance });
    }
  };

  loadBalance = address => {
    tweb3.getBalance(address).then(value => {
      // console.log('loadBalance', value);
      this.setState(value);
    });
  };

  registerFaucetEvent = event => {
    event.preventDefault();
    const { address, privateKey, signers, setNeedAuth, setAuthEle } = this.props;
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
        .contract('system.faucet')
        .methods.request(/* address */)
        .sendCommit(opts)
        .then(async r => {
          notifi.info(`Faucet Success: ${toTEA(r.returnValue)} TEA`);
          const { childKey, setAccount } = this.props;

          if (signers.isRepresent) {
            this.loadBalance(address);
          } else {
            const childKeyTmp = [];
            for (let i = 0; i < childKey.length; i += 1) {
              const newChild = Object.assign({}, childKey[i]);
              const { balance } = await tweb3.getBalance(newChild.address);
              newChild.balance = balance;
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
    const { address, privateKey, setNeedAuth, signers, setAuthEle } = this.props;
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
    const { address, privateKey, signers, setNeedAuth, setAuthEle } = this.props;
    const { tagsName, tagsValue } = this.state;
    const name = tagsName;
    const value = tagsValue;
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
        key: 'TxHash',
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
        key: 'Date',
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

    const dataSource = newTagsList.map(key => {
      return {
        name: Object.keys(key)[0],
        value: key[Object.keys(key)[0]],
        remove: Object.keys(key)[0],
      };
    });
    return dataSource;
  };

  render() {
    const { alias, tagsName, tagsValue, tagsList, pageSize, current } = this.state;
    const { address } = this.props;
    const { balance } = this.state;
    const total = Object.keys(tagsList).length;
    const typeOfAccount = (() => {
      try {
        if (codec.isBankAddress(address)) {
          return 'Bank account';
        }
        if (codec.isRegularAddress(address)) {
          return 'Regular account';
        }

        return 'Invalid address';
      } catch (e) {
        return 'Invalid address';
      }
    })();

    return (
      <TabWrapper>
        <MediaContent>
          <WrapperBlock>
            <H2>Information</H2>
            <TapWrapperContent>
              <div className="row">
                <p className="header">Type:</p>
                <p> {typeOfAccount}</p>
              </div>
              <div className="row">
                <p className="header">Balance:</p>
                <p> {toTEA(balance)} TEA</p>
              </div>

              <WrapperButton>
                <Button width="170px" className="get-tea" onClick={this.registerFaucetEvent}>
                  <span>Get TEA from Faucet</span>
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
                  <Button className="get-tea" onClick={this.registerUpdateAliasEvent}>
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
                  <Button className="get-tea" onClick={this.registerAddTagEvent}>
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
                  />
                </div>
              </WrapperTable>
            </TapWrapperContent>
          </WrapperBlock>
        </MediaContent>
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
