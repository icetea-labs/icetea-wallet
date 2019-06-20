import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Select, { Option, SelectPropTypes } from 'rc-select';
import 'rc-select/assets/index.css';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';

import General from './General';
import AccOwners from './AccOwners';
import Inheritance from './Inheritance';

import { H1, H2, Wrapper, MediaContent, WrapperContent, RadioGroup } from './Styled';
// import '../assets/index.less';
import { setNeedAuth } from '../../../store/actions/account';

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: props.address,
      radioValue: 'one',
      selectedValue: props.address,
    };
  }

  radioOnChange = async value => {
    const { radioValue, selectedValue } = this.state;
    const { address } = this.props;

    if (radioValue !== value) {
      this.setState({
        radioValue: value,
        currentAddress: value === 'one' ? address : selectedValue,
      });
      console.log('new');
    }
  };

  selectOnChange = value => {
    // console.log('selectOnChange', value);
    this.setState({
      selectedValue: value,
      currentAddress: value,
    });
  };

  onSelect = value => {
    // console.log('onSelect', value);
  };

  onKeyDown = value => {
    // console.log('onKeyDown', value);
  };

  tabOnChange = async value => {
    console.log(`selected ${value}`);
  };

  render() {
    const { radioValue, currentAddress } = this.state;
    const { address, childKey } = this.props;
    const Options = childKey.map(el => {
      // console.log(el);
      return (
        <Option key={el.index} value={el.address} desc={el.address}>
          {el.address}
        </Option>
      );
    });

    const child = childKey.filter(el => {
      return currentAddress === el.address;
    })[0];

    // console.log('render selectedValue', currentAddress);

    return (
      <Wrapper>
        <MediaContent>
          <H1>Profile</H1>
          <WrapperContent>
            <H2>Edit profile of</H2>
            <RadioGroup>
              <li
                className={radioValue === 'one' ? 'on' : ''}
                onClick={() => this.radioOnChange('one')}
                role="presentation"
              >
                <div className="selected" />
                <span>Current account ( {address} )</span>
              </li>
              <li
                className={radioValue === 'two' ? 'on' : ''}
                onClick={() => this.radioOnChange('two')}
                role="presentation"
              >
                <div className="selected" />
                <span>This account</span>
                <Select
                  className="custom-select"
                  optionFilterProp="desc"
                  onChange={this.selectOnChange}
                  onSelect={this.onSelect}
                  onInputKeyDown={this.onKeyDown}
                  notFoundContent=""
                  allowClear
                  placeholder="Please input address"
                  combobox
                  backfill
                >
                  {Options}
                </Select>
              </li>
            </RadioGroup>
            <div>
              <Tabs
                defaultActiveKey="1"
                destroyInactiveTabPane
                renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick} />}
                renderTabContent={() => <TabContent />}
                onChange={this.tabOnChange}
              >
                <TabPane tab="General" key="1" placeholder="loading 1">
                  <General
                    address={currentAddress}
                    privateKey={(child && child.privateKey) || ''}
                    balance={(child && child.balance) || ''}
                  />
                </TabPane>
                <TabPane tab="Owners" key="2" placeholder="loading 2">
                  <AccOwners address={currentAddress} privateKey={(child && child.privateKey) || ''} />
                </TabPane>
                <TabPane tab="Inheritance" key="3" placeholder="loading 3">
                  <Inheritance address={currentAddress} privateKey={(child && child.privateKey) || ''} />
                </TabPane>
              </Tabs>
            </div>
          </WrapperContent>
        </MediaContent>
      </Wrapper>
    );
  }
}
Profile.propTypes = SelectPropTypes;

const mapStateToProps = state => {
  const { account } = state;
  return {
    address: account.address,
    privateKey: account.privateKey,
    cipher: account.cipher,
    childKey: account.childKey,
    mnemonic: account.mnemonic,
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
