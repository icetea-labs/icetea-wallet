import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import BotShow from './BotShow';
import tweb3 from '../../../service/tweb3';
import Layout from '../../layout/Layout';
import { Icon } from '../../elements/utils';
import Pagination from '../../elements/PaginationPro';
import * as actions from '../../../store/actions/account';
import notifi from '../../elements/Notification';

const BotContent = styled.div`
  background: #232937;
  color: #ffffff;
  position: absolute;
  width: 100%;
  margin-top: -10px;
  min-height: calc(100vh - 100px);
  @media (max-width: 768px) {
    margin-top: -16px;
    padding-top: 20px;
  }
`;

const BotContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0 100px 0;
  @media (max-width: 1200px) {
    max-width: 960px;
  }
  @media (max-width: 991px) {
    max-width: 768px;
    padding: 30px 0;
  }
  @media (max-width: 768px) {
    max-width: 670px;
  }
  @media (max-width: 640px) {
    max-width: 480px;
    padding: 0 20px;
  }
`;

const BotItems = styled.div`
  background: #323a4c;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.23);
  margin: 0 20px 20px 0;
  padding: 20px;
  width: calc(100% / 4 - 57px);
  float: left;
  border: 1px solid #323a4c;
  border-radius: 3px;
  cursor: pointer;
  &:nth-child(4n) {
    margin-right: 0;
  }
  &:hover {
    transition: border-color 0.6s ease;
    border: 1px solid rgb(240, 185, 11);
  }
  .bot_header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #4d576d;
  }
  .icon {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border-radius: 50%;
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  .pri_info {
    width: calc(100% - 141px);
  }
  .name {
    font-size: 16px;
  }
  .description {
    position: relative;
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &:hover {
      .tooltip {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  .tooltip {
    position: absolute;
    bottom: 100%;
    background: #ffffff;
    color: rgba(35, 41, 55, 0.8);
    line-height: 15px;
    text-align: justify;
    padding: 7px;
    border-radius: 5px;
    transition: opacity 0.5s ease;
    visibility: hidden;
    opacity: 0;
  }

  @media (max-width: 1200px) {
    width: calc(100% / 3 - 56px);
    &:nth-child(4n) {
      margin: 0 20px 20px 0;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 991px) {
    width: calc(100% / 2 - 52px);
    &:nth-child(4n) {
      margin: 0 20px 20px 0;
    }
    &:nth-child(3n) {
      margin: 0 20px 20px 0;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (max-width: 640px) {
    width: calc(100% - 42px);
    float: none;
    margin-right: 0 !important;
  }
`;

const ButtonConnect = styled.button`
  font-size: 13px;
  width: 65px;
  line-height: 22px;
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #ffffff;
    color: #232937;
  }
`;

const CategoryTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  .botslist {
    width: 100%;
    display: inline-block;
  }
`;

const WrapFilter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #4d576d;
  position: relative;
  input {
    position: absolute;
    right: 0;
    width: calc(100% - 30px);
    border: none;
    outline: none;
    background: transparent;
    height: 30px;
    color: #ffffff;
  }
`;

class BotStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: [],
      botFilter: [],
      isRunBot: false,
      botAddress: '',
      current: 1,
      pageSize: 12,
    };
  }

  componentDidMount() {
    this.setBotStore();
  }

  setBotStore = async () => {
    const arrBot = await this.getBotList();
    const storeBots = await this.getBotInfo(arrBot);
    this.setState({ bots: storeBots });
  };

  getBotList = async () => {
    const address = 'system.botstore';
    const contract = tweb3.contract(address);
    const arrbots = await contract.methods.query().call();
    // console.log('All Bot', arrbots);
    return arrbots;
  };

  getBotInfo = async bots => {
    const resInfo = [];
    const keys = Object.keys(bots);
    for (let i = 0; i < keys.length; i += 1) {
      const botInfo = {
        address: '',
        category: 'category',
        name: 'name',
        icon: 'icon',
        description: 'description',
      };
      const bot = keys[i];
      const contract = tweb3.contract(bot);
      const info = await contract.methods.botInfo().callPure();
      botInfo.address = bot;
      botInfo.category = bots[bot].category;
      botInfo.icon = bots[bot].icon;
      botInfo.name = info.name;
      botInfo.alias = bot.split('.', 2)[1];
      botInfo.description = info.description || '';
      resInfo.push(botInfo);
    }
    return resInfo;
  };

  connectBot = botAddress => {
    const { privateKey, setNeedAuth, address } = this.props;

    if (!address) {
      notifi.warn('Please go to unlock wallet!');
      return;
    }
    if (!privateKey) {
      // show get password for get privatekey.
      setNeedAuth(true);
    }
    // show pu bot.
    this.setState({ isRunBot: true, botAddress });
    // return privateKey ? this.showBot(botAddress) : this.getKeyAndshowBot(botAddress);
  };

  // showBot = botAddress => {
  //   this.setState({
  //     isRunBot: true,
  //     botAddress,
  //   });
  // };

  // getKeyAndshowBot = botAddress => {
  //   const { props } = this;
  //   props.setNeedAuth(true);
  //   this.setState({ isRunBot: true, botAddress });
  // };

  _onCloseBot = () => {
    this.setState({
      isRunBot: false,
      botAddress: '',
    });
  };

  botStoreChange = name => {
    const { bots } = this.state;
    const value = name.currentTarget.value.trim();
    const filterBots = bots.filter(bot => {
      const botName = (bot.name && bot.name.toUpperCase()) || '';
      const filter = (value && value.toUpperCase()) || '';
      return botName.includes(filter) || botName.replace(/\.B/, '').includes(filter);
    });
    if (filterBots.length > 0) {
      this.setState({
        botFilter: filterBots,
      });
    }
    if (!value.length) {
      this.setState({
        botFilter: [],
      });
    }
  };

  showFilterBots = () => {
    const { botFilter } = this.state;
    const filter =
      botFilter &&
      botFilter.map((bot, index) => (
        <BotItems key={index}>
          <div className="bot_header">
            <div className="icon">
              <img src={bot.icon} alt={bot.alias} />
            </div>
            <div className="pri_info">
              <p className="name">{bot.name}</p>
              <span className="alias">@{bot.alias}</span>
            </div>
            <ButtonConnect onClick={() => this.connectBot(bot.address)}>Open</ButtonConnect>
          </div>
          <div className="description">
            <p>{bot.description}</p>
            <div className="tooltip">{bot.description}</div>
          </div>
        </BotItems>
      ));
    return filter;
  };

  showBots = () => {
    const { bots } = this.state;
    const total = bots.length;
    const { current, pageSize } = this.state;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    let b;
    if (total > 0) {
      if (to > total) to = total;
      b = bots.slice(from, to);
    }
    const botsList =
      b &&
      b.map((bot, index) => (
        <BotItems key={index}>
          <div className="bot_header">
            <div className="icon">
              <img src={bot.icon} alt={bot.alias} />
            </div>
            <div className="pri_info">
              <p className="name">{bot.name}</p>
              <span className="alias">@{bot.alias}</span>
            </div>
            <ButtonConnect onClick={() => this.connectBot(bot.address)}>Open</ButtonConnect>
          </div>
          <div className="description">
            <p>{bot.description}</p>
            <div className="tooltip">{bot.description}</div>
          </div>
        </BotItems>
      ));
    return botsList;
  };

  onChange = (current, pageSize) => {
    this.setState({
      current,
    });
  };

  onShowSizeChange = (current, pageSize) => {
    this.setState({
      pageSize,
    });
  };

  render() {
    const { bots, botFilter, current, pageSize, isRunBot, botAddress } = this.state;
    const { address, privateKey } = this.props;
    const total = bots.length;
    return (
      <Layout>
        <BotContent>
          <BotContainer>
            <WrapFilter>
              <Icon type="search" />
              <input type="text" onChange={this.botStoreChange} placeholder="Filtered by name" />
            </WrapFilter>
            <CategoryTitle>All Store Bots</CategoryTitle>
            <Wrap>
              {botFilter.length > 0 ? (
                this.showFilterBots()
              ) : (
                <div>
                  <div className="botslist">{this.showBots()}</div>
                  <Pagination
                    showQuickJumper
                    showSizeChanger
                    defaultPageSize={pageSize}
                    defaultCurrent={current}
                    onShowSizeChange={this.onShowSizeChange}
                    onChange={this.onChange}
                    total={total}
                  />
                </div>
              )}
            </Wrap>
          </BotContainer>
          {isRunBot && privateKey && (
            <BotShow onClose={this._onCloseBot} botAddress={botAddress} address={address} privateKey={privateKey} />
          )}
        </BotContent>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { address } = state.account;
  const { privateKey } = state.account;
  // const address = 'teat1al54h8fy75h078syz54z6hke6l9x232zq3j9st';
  // const privateKey = 'CJUPdD38vwc2wMC3hDsySB7YQ6AFLGuU6QYQYaiSeBsK';
  return {
    address,
    privateKey,
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
)(BotStore);
