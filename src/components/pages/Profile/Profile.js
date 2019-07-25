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

import { H1, H2, Wrapper, MediaContent, WrapperPageContent, RadioGroup } from './Styled';
import { setNeedAuth } from '../../../store/actions/account';

const defaultTabKey = '1';

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: '',
      radioCurrentVal: 'one',
      comboBoxSelectedVal: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { address } = nextProps;
    if (address !== prevState.currentAddress && prevState.radioCurrentVal === 'one') {
      return {
        currentAddress: address,
      };
    }

    return null;
  }

  radioOnChange = value => {
    const { radioCurrentVal, comboBoxSelectedVal, currentAddress } = this.state;
    // console.log('state', this.state, 'new: ', value);
    // change address when radio change
    radioCurrentVal !== value &&
      this.setState({
        radioCurrentVal: value,
        currentAddress: value === 'one' ? currentAddress : comboBoxSelectedVal,
      });
  };

  selectOnChange = value => {
    // console.log('selectOnChange', value);
    const { radioCurrentVal } = this.state;
    const newObj = { comboBoxSelectedVal: value, currentAddress: value };

    // only combobox selected value change
    radioCurrentVal === 'one' && delete newObj.currentAddress;
    this.setState(newObj);
  };

  tabOnChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    const { radioCurrentVal, currentAddress } = this.state;
    const { address, privateKey, childKey } = this.props;
    const child = childKey.filter(el => {
      return currentAddress === el.address;
    })[0];
    const signers = { address, privateKey, isRepresent: currentAddress && !child };

    // console.log('currentAddress', child);
    return (
      <Wrapper>
        <MediaContent>
          <H1>Profile</H1>
          <WrapperPageContent>
            <H2>Edit profile of</H2>
            <RadioGroup>
              <li
                className={radioCurrentVal === 'one' ? 'on' : ''}
                onClick={() => this.radioOnChange('one')}
                role="presentation"
              >
                <div className="selected" />
                <span>Current account ( {address} )</span>
              </li>
              <li
                className={radioCurrentVal === 'two' ? 'on' : ''}
                onClick={() => this.radioOnChange('two')}
                role="presentation"
              >
                <div className="selected" />
                <span>This account</span>
                <Select
                  className="custom-select"
                  optionFilterProp="desc"
                  onChange={this.selectOnChange}
                  animation="slide-up"
                  notFoundContent=""
                  allowClear
                  placeholder="Please input address"
                  combobox
                  backfill
                >
                  {childKey.map(el => {
                    // console.log(el);
                    return (
                      <Option key={el.index} value={el.address} desc={el.address}>
                        {el.address}
                      </Option>
                    );
                  })}
                </Select>
              </li>
            </RadioGroup>
            <div>
              <Tabs
                defaultActiveKey={defaultTabKey}
                destroyInactiveTabPane
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
                onChange={this.tabOnChange}
              >
                <TabPane tab="General" key="1" placeholder="loading general">
                  <General
                    address={currentAddress}
                    signers={signers}
                    privateKey={(child && child.privateKey) || ''}
                    balance={(child && child.balance) || ''}
                  />
                </TabPane>
                <TabPane tab="Owners" key="2" placeholder="loading owners">
                  <AccOwners
                    signers={signers}
                    address={currentAddress}
                    privateKey={(child && child.privateKey) || ''}
                  />
                </TabPane>
                <TabPane tab="Inheritance" key="3" placeholder="loading inheritance">
                  <Inheritance
                    signers={signers}
                    address={currentAddress}
                    privateKey={(child && child.privateKey) || ''}
                  />
                </TabPane>
              </Tabs>
            </div>
          </WrapperPageContent>
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
    childKey: account.childKey,
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
