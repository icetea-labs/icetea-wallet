import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import BaseLayout from '../../layout/BaseLayout';
import tweb3 from '../../../service/tweb3';
import notifi from '../../elements/Notification';
import {
  Container,
  PageTitle,
  ItemsTitle,
  ProfileWrap,
  FormGroups,
  Label,
  LabelPro,
  Button,
  InputText,
  List,
  Error,
} from './StyleProfile';
import { setNeedAuth } from '../../../store/actions/account';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWallet: '',
      isHidden: true,
      alias: '',
      tagsName: '',
      tagsValue: '',
      tagsList: {},
      threshold: 1,
      owner: '',
      weight: '',
      ownersList: {},
      inheritor: '',
      waitDays: '',
      lockDays: '',
      inheritorList: {},
      // error
      aliasErr: '',
      tagsNameErr: '',
      tagsValueErr: '',
      thresholdErr: '',
      ownerErr: '',
      weightErr: '',
      inheritorErr: '',
      waitDaysErr: '',
      lockDaysErr: '',
    };
  }

  componentDidMount() {
    this.handleWalletAddress();
  }

  handleWalletAddress = () => {
    const { privateKey, address } = this.props;
    if (!address) {
      notifi.warn('Please got to unlock wallet!');
      return;
    }
    if (!privateKey) {
      // this.props.setNeedAuth(true);
    }
    this.setState({
      selectedWallet: address,
      isHidden: false,
    });
    this.loadAlias(address);
    this.loadDid(address);
  };

  registerFaucetEvent = () => {
    const { address } = this.props;
    tweb3
      .contract('system.faucet')
      .methods.request(/* address */)
      .sendCommit({ from: address })
      .then(r => {
        notifi.info('Success');
      })
      .catch(error => {
        //window.alert(String(error));
        notifi.warn('You already received 100000000 microtea. No more.');
      });
  };

  handleAlias = e => {
    this.setState({ aliasErr: '', alias: e.target.value });
  };

  registerUpdateAliasEvent = () => {
    const { alias } = this.state;
    const { address } = this.props;
    if (!alias) {
      this.setState({ aliasErr: 'Alias field is required' });
      return;
    }

    tweb3
      .contract('system.alias')
      .methods.register(alias, address)
      .sendCommit({ from: address })
      .then(r => {
        this.loadAlias(address);
        notifi.info('Success');
      })
      .catch(error => {
        console.error(error);
        window.alert(String(error));
      });
  };

  loadAlias = targetAddress => {
    tweb3
      .contract('system.alias')
      .methods.byAddress(targetAddress)
      .call()
      .then(alias => {
        this.setState({
          alias,
        });
      });
  };

  handleTagsName = e => {
    this.setState({ tagsNameErr: '', tagsName: e.target.value });
  };

  handleTagsValue = e => {
    this.setState({ tagsValueErr: '', tagsValue: e.target.value });
  };

  registerAddTagEvent = () => {
    const { address } = this.props;
    const name = this.state.tagsName;
    const value = this.state.tagsValue;
    if (!name || !value) {
      this.setState({ tagsNameErr: 'Err', tagsValueErr: 'Err' });
      return;
    }
    tweb3
      .contract('system.did')
      .methods.setTag(address, name, value)
      .sendCommit({ from: address })
      .then(r => {
        this.loadDid(address);
        notifi.info('Success');
      })
      .catch(error => {
        console.error(error);
        window.alert(String(error));
      });
  };

  registerRemoveTagEvent = tag => {
    const { address } = this.props;
    tweb3
      .contract('system.did')
      .methods.removeTag(address, tag)
      .sendCommit({ from: address })
      .then(r => {
        this.loadDid(address);
        notifi.info('Success');
      })
      .catch(error => {
        console.error(error);
        window.alert(String(error));
      });
  };

  loadDid = targetAddress => {
    tweb3
      .contract('system.did')
      .methods.query(targetAddress)
      .call()
      .then(props => {
        if (props) {
          const { tags, owners, threshold, inheritors } = props;
          if (threshold) {
            this.setState({ threshold: threshold });
          }
          if (tags && Object.keys(tags).length) {
            this.setState({ tagsList: Object.assign({}, tags) });
          } else {
            this.setState({ tagsList: {} });
          }
          if (owners && Object.keys(owners).length) {
            this.setState({ ownersList: Object.assign({}, owners) });
          } else {
            this.setState({ ownersList: {} });
          }
          if (inheritors && Object.keys(inheritors).length) {
            this.setState({ inheritorList: Object.assign({}, inheritors) });
          } else {
            this.setState({ inheritorList: {} });
          }
        }
      });
  };

  handleThreshold = e => {
    this.setState({ thresholdErr: '', threshold: e.target.value });
  };

  registerUpdateThresholdEvent = () => {
    const { address } = this.props;
    const { threshold } = this.state;
    if (!threshold) {
      this.setState({ thresholdErr: 'threshold field is required' });
      return;
    }
    tweb3
      .contract('system.did')
      .methods.setThreshold(address, +threshold)
      .sendCommit({ from: address })
      .then(r => {
        this.setState({ threshold: r.result });
        notifi.info('Success');
      })
      .catch(error => {
        console.error(error);
        window.alert(String(error));
      });
  };

  handleOwner = e => {
    this.setState({ ownerErr: '', owner: e.target.value });
  };

  handleWeight = e => {
    this.setState({ weightErr: '', weight: e.target.value });
  };

  registerAddOwnerEvent = () => {
    const { address } = this.props;
    let { owner, weight } = this.state;
    weight = parseInt(weight);
    if (!owner || !weight) {
      this.setState({ ownerErr: 'err', weightErr: 'err' });
      return;
    }

    tweb3
      .contract('system.did')
      .methods.addOwner(address, owner, weight)
      .sendCommit({ from: address })
      .then(r => {
        this.loadDid(address);
        notifi.info('Success');
      })
      .catch(error => {
        console.error(error);
        window.alert(String(error));
      });
  };

  registerRemoveOwnerEvent = owner => {
    const { address } = this.props;
    if (!window.confirm('Sure to delete ' + owner + '?')) {
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
  };

  handleInheritor = e => {
    this.setState({ inheritorErr: '', inheritor: e.target.value });
  };

  handleWaitdays = e => {
    this.setState({ waitDaysErr: '', waitDays: e.target.value });
  };

  handleLockdays = e => {
    this.setState({ lockDaysErr: '', lockDays: e.target.value });
  };

  registerAddInheEvent = () => {
    const { address } = this.props;
    const { inheritor } = this.state;
    let { waitDays, lockDays } = this.state;
    waitDays = parseInt(waitDays);
    lockDays = parseInt(lockDays);
    if (!inheritor || !waitDays || !lockDays) {
      this.setState({
        inheritorErr: 'err',
        waitDaysErr: 'err',
        lockDaysErr: 'err',
      });
      return;
    }

    tweb3
      .contract('system.did')
      .methods.addInheritor(address, inheritor, waitDays, lockDays)
      .sendCommit({ from: address })
      .then(r => {
        this.loadDid(address);
        notifi.info('Success');
      })
      .catch(error => {
        console.error(error);
        window.alert(String(error));
      });
  };

  registerRemoveInheEvent = inheritor => {
    const { address } = this.props;
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
  };

  render() {
    const { privateKey, address } = this.props;
    privateKey && tweb3.wallet.importAccount(privateKey);
    const options = [{ value: address, label: address }];
    const {
      selectedWallet,
      isHidden,
      alias,
      tagsName,
      tagsValue,
      tagsList,
      threshold,
      owner,
      weight,
      ownersList,
      inheritor,
      waitDays,
      lockDays,
      inheritorList,
      // error
      aliasErr,
      tagsNameErr,
      tagsValueErr,
      thresholdErr,
      ownerErr,
      weightErr,
      inheritorErr,
      waitDaysErr,
      lockDaysErr,
    } = this.state;

    return (
      <BaseLayout>
        <Container>
          <ProfileWrap>
            <PageTitle>Profile</PageTitle>
            <div className="signin-groups">
              {/* <Label>Signin as:</Label>
              <div className="select">
                <Select
                  value={selectedWallet}
                  onChange={this.handleWalletAddress}
                  options={options}
                  isSearchable={false}
                />
              </div> */}
              <div className="set-profile">
                <p>
                  <LabelPro className="lTitle">{address ? `Signed-in address: ${address}` : 'Signed-in address:'}</LabelPro>
                </p>
              </div>
            </div>
            <div className="orther-groups" hidden={isHidden}>
              <ItemsTitle>Faucet</ItemsTitle>
              <Button className="get-tea" onClick={this.registerFaucetEvent}>
                <span>GET 100 TEA</span>
              </Button>
              <FormGroups className="form-groups">
                <ItemsTitle>Alias</ItemsTitle>
                <InputText
                  className={aliasErr ? 'one-field error' : 'one-field'}
                  type="text"
                  value={alias || ''}
                  placeholder="no alias"
                  onChange={this.handleAlias}
                />
                {aliasErr && <Error>{aliasErr}</Error>}
                <Button className="btn btn-upadte" onClick={this.registerUpdateAliasEvent}>
                  <span>UPDATE</span>
                </Button>
              </FormGroups>

              <FormGroups className="form-groups">
                <ItemsTitle>Tags</ItemsTitle>
                <Label>These tags are NOT encrypted and public. Private tags are not supported yet.</Label>
                {Object.keys(tagsList).length > 0 &&
                  Object.keys(tagsList).map((tags, index) => {
                    return (
                      <List key={index}>
                        {`${tags} : ${tagsList[tags]}`}
                        <span onClick={() => this.registerRemoveTagEvent(tags)}>x</span>
                      </List>
                    );
                  })}
                <InputText
                  type="text"
                  className={tagsNameErr && !tagsName.length ? 'two-field error' : 'two-field'}
                  value={tagsName}
                  placeholder="name"
                  onChange={this.handleTagsName}
                />
                <InputText
                  type="text"
                  className={tagsValueErr && !tagsValue.length ? 'two-field error' : 'two-field'}
                  value={tagsValue}
                  placeholder="value"
                  onChange={this.handleTagsValue}
                />
                {(tagsNameErr || tagsValueErr) && <Error>Name and Value field is required </Error>}
                <Button className="btn btn-add" onClick={this.registerAddTagEvent}>
                  <span>ADD</span>
                </Button>
              </FormGroups>

              <FormGroups className="form-groups">
                <ItemsTitle>Owner settings</ItemsTitle>
                <Label>Threshold: </Label>
                <InputText
                  className={thresholdErr ? 'one-field error' : 'one-field'}
                  type="number"
                  placeholder="threshold"
                  value={threshold}
                  onChange={this.handleThreshold}
                />
                {thresholdErr && <Error>{thresholdErr}</Error>}
                <Button className="btn btn-upadte" onClick={this.registerUpdateThresholdEvent}>
                  <span>UPDATE</span>
                </Button>
                <Label>Owner list</Label>
                {Object.keys(ownersList).length > 0 &&
                  Object.keys(ownersList).map((own, index) => {
                    return (
                      <List key={index}>
                        {`${own} : ${ownersList[own]}`}
                        <span onClick={() => this.registerRemoveOwnerEvent(own)}>x</span>
                      </List>
                    );
                  })}
                <InputText
                  className={ownerErr && !owner.length ? 'two-field error' : 'two-field'}
                  type="text"
                  value={owner}
                  placeholder="owner address or alias"
                  onChange={this.handleOwner}
                />
                <InputText
                  className={weightErr && !weight.length ? 'two-field error' : 'two-field'}
                  type="number"
                  value={weight}
                  placeholder="weight"
                  onChange={this.handleWeight}
                />
                {(ownerErr || weightErr) && <Error>Owner and weight field is required </Error>}
                <Button className="btn btn-add" onClick={this.registerAddOwnerEvent}>
                  <span>ADD</span>
                </Button>
              </FormGroups>

              <FormGroups className="form-groups">
                <ItemsTitle>Inheritance settings</ItemsTitle>
                <Label>Inheritance list </Label>
                {Object.keys(inheritorList).length > 0 &&
                  Object.keys(inheritorList).map((iht, index) => {
                    return (
                      <List key={index}>
                        {`${iht} - wait: ${inheritorList[iht].waitPeriod} - lock: ${inheritorList[iht].lockPeriod}`}
                        <span onClick={() => this.registerRemoveInheEvent(iht)}>x</span>
                      </List>
                    );
                  })}
                <InputText
                  className={inheritorErr && !inheritor.length ? 'three-field error' : 'three-field'}
                  type="text"
                  placeholder="inheritor address or alias"
                  value={inheritor}
                  onChange={this.handleInheritor}
                />
                <InputText
                  className={waitDaysErr && !waitDays.length ? 'three-field error' : 'three-field'}
                  type="number"
                  placeholder="wait days"
                  value={waitDays}
                  onChange={this.handleWaitdays}
                />
                <InputText
                  className={lockDaysErr && !lockDays.length ? 'three-field error' : 'three-field'}
                  type="number"
                  placeholder="lock days"
                  value={lockDays}
                  onChange={this.handleLockdays}
                />
                {(inheritorErr || waitDaysErr || lockDaysErr) && (
                  <Error>Inheritor, Wait Days and Lock Days field is required</Error>
                )}
                <Button className="btn btn-add" onClick={this.registerAddInheEvent}>
                  <span>ADD</span>
                </Button>
              </FormGroups>
            </div>
          </ProfileWrap>
        </Container>
      </BaseLayout>
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
)(Profile);
