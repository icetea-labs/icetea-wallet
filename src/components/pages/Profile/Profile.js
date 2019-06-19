import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Select, { Option, SelectPropTypes } from 'rc-select';
import 'rc-select/assets/index.css';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import tweb3 from '../../../service/tweb3';
import { toTEA } from '../../../utils/utils';
import General from './General';

import { H1, H2, Wrapper, MediaContent, WrapperContent, RadioGroup } from './Styled';
// import '../assets/index.less';
import { setNeedAuth } from '../../../store/actions/account';

const Item = styled.div`
  font-size: 16px;
  color: #212833;
  font-weight: bold;
`;
const Text = styled.div`
  font-size: 12px;
  color: #848e9c;
`;

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'one',
      childAddress: props.childKey || [],
      selectedAddress: props.address,
      balance: toTEA(
        props.childKey.filter(child => {
          return child.address === props.address;
        })[0].balance || 0
      ),
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    const { address, childKey } = this.props;

    // console.log('componentWillReceiveProps', address, '-----', nextProps.address);
    if (address !== nextProps.address) {
      this.setState({
        selectedAddress: address,
        balance: toTEA(
          childKey.filter(child => {
            return child.address === nextProps.address;
          })[0].balance || 0
        ),
      });
    }
  }

  radioOnChange = async value => {
    const { radioValue } = this.state;
    const { address } = this.props;
    const { balance } = await tweb3.getBalance(address);
    // console.log('balance', balance, value);

    if (radioValue !== value) {
      this.setState({
        radioValue: value,
        selectedAddress: address,
        balance: toTEA(balance),
      });
    }
  };

  onChange = async value => {
    console.log(`selected ${value}`);
  };

  selectOnChange = async value => {
    console.log(`selected ${value}`);
    const { balance } = await tweb3.getBalance(value);
    this.setState({
      selectedAddress: value,
      balance: toTEA(balance),
    });
  };

  render() {
    const { radioValue, childAddress, selectedAddress, balance } = this.state;
    const { address } = this.props;
    const Options = childAddress.map(el => {
      // console.log(el);
      return (
        <Option key={el.index} value={el.address} desc={el.address}>
          {el.address}
        </Option>
      );
    });
    // console.log('childKey', childKey);
    // const balance = toTEA(
    //   childKey.filter(child => {
    //     return child.address === address;
    //   })[0].balance
    // );

    // console.log('balance', balance);

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
                  // allowClear
                  placeholder="Please input address"
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
                onChange={this.onChange}
              >
                <TabPane tab="General" key="1" placeholder="loading 1">
                  <General address={selectedAddress} balance={balance} />
                </TabPane>
                <TabPane tab="Owners" key="2" placeholder="loading 2">
                  <General address={selectedAddress} balance={110} />
                </TabPane>
                <TabPane tab="Inheritance" key="3" placeholder="loading 3">
                  <General address={selectedAddress} balance={110} />
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
Profile.defaultProps = {
  assets: [],
  to: '',
  amount: '',
  memo: '',
  defaultAsset: {},
  next() {},
};
const mapStateToProps = state => {
  const { account } = state;
  return {
    address: account.address,
    privateKey: account.privateKey,
    cipher: account.cipher,
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
