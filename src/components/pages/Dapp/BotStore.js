import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import BotShow from './BotShow';
import tweb3 from '../../../service/tweb3'

const BotContent = styled.div`
  background: #232937;
  color: #ffffff;
  position: absolute;
  width: 100%;
  margin-top: -10px;
  min-height: calc(100vh - 100px);
  @media(max-width: 768px) {
    margin-top: -20px;
  }
`

const BotContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
  @media(max-width: 1200px) {
    max-width: 960px;
  }
  @media(max-width: 991px) {
    max-width: 768px;
  }
  @media(max-width: 768px) {
    max-width: 670px;
  }
  @media(max-width: 640px) {
    max-width: 480px;
  }
`

const BotItems = styled.div`
  background: #323a4c;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.23);
  margin: 0 20px 20px 0;
  padding: 20px;
  width: calc(100% / 4 - 60px);
  float: left;
  border: 1px solid #323a4c;
  border-radius: 3px;
  cursor: pointer;
  &:nth-child(4n + 1) {
    margin-right: 0;
  }
  &:hover{
    transition: border-color .6s ease;
    border: 1px solid rgb(240,185,11);
  }
  .bot_header{
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #4d576d
  }
  .icon{
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border-radius: 50%;
    overflow: hidden;
    img{
      max-width: 100%;
    }
  }
  .pri_info{
    width: calc(100% - 141px);
  }
  .name{
    font-size: 16px;
  }
  .description {
    position: relative;
    p{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &:hover {
      .sc-iGrrsa{
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  @media(max-width: 1200px) {
    width: calc(100% / 3 - 60px);
    &:nth-child(4n + 1){
      margin: 0 20px 20px 0;
    }
    &:nth-child(3n + 1) {
      margin-right: 0;
    }
  }
  @media(max-width: 991px) {
    width: calc(100% / 2 - 60px);
    &:nth-child(4n + 1){
      margin: 0 20px 20px 0;
    }
    &:nth-child(3n + 1) {
      margin: 0 20px 20px 0;
    }
    &:nth-child(2n + 1) {
      margin-right: 0;
    }
  }
  @media(max-width: 640px) {
    width: calc(100% - 42px);
    float: none;
    margin-right: 0 !important;
  }
`

const ButtonConnect = styled.button`
  font-size: 13px;
  width: 65px;
  line-height: 22px;
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  &:focus{
    outline: none;
  }
  &:hover{
    background-color: #ffffff;
    color: #232937;
  }
`

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  background: #ffffff;
  color: rgba(35,41,55, .8);
  line-height: 15px;
  text-align: justify;
  padding: 7px;
  border-radius: 5px;
  transition: opacity .5s ease;
  visibility: hidden;
  opacity: 0;
`

const CategoryTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  @media(max-width: 640px) {
    width: calc(100% - 30px);
    padding: 0 15px;
  }
`
class BotStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: [],
      botStore: [],
      isRunBot: false,
      botAddress: ''
    }
  }

  componentDidMount() {
    this.setBotStore()
  }

  setBotStore = async () => {
    var arrBot = await this.getBotList()
    var storeBots = await this.getBotInfo(arrBot)
    this.setState({ bots: storeBots })
  }

  getBotList = async () => {
    var address = 'system.botstore'
    const contract = tweb3.contract(address)
    const arrbots = await contract.methods.query().call()
    return arrbots
  }

  getBotInfo = async (bots) => {
    var resInfo = []
    var keys = Object.keys(bots)
    for (let bot of keys) {
      var botInfo = { address: '', category: 'category', name: 'name', icon: 'icon', description: 'description' }
      const contract = tweb3.contract(bot)
      const info = await contract.methods.botInfo().callPure()
      botInfo.address = bot
      botInfo.category = bots[bot].category
      botInfo.icon = bots[bot].icon
      botInfo.name = info.name
      botInfo.alias = bot.split('.', 2)[1]
      botInfo.description = info.description || ''
      if (botInfo.description.length > 36) {
        botInfo.description = botInfo.description.substring(0, 36) + '…'
      }
      resInfo.push(botInfo)
    }
    return resInfo
  }

  connectBot = (botAddress) => {
    this.setState({
      isRunBot: true,
      botAddress: botAddress
    })
    console.log(this.state)
  }

  _onCloseBot = (e) => {
    this.setState({
      isRunBot: false,
      botAddress: ''
    })
  }

  showBots = () => {
    const { bots } = this.state;
    const botsList = bots && bots.map((bot, i) => {
      return <BotItems key={i}>
        <div className="bot_header">
          <div className="icon"><img src={bot.icon} alt={bot.alias} /></div>
          <div className="pri_info">
            <p className="name">{bot.name}</p>
            <span className="alias">@{bot.alias}</span>
          </div>
          <ButtonConnect onClick={() => this.connectBot(bot.address)}>Open</ButtonConnect>
        </div>
        <div className="description">
          <p>{bot.description}</p>
          <Tooltip>{bot.description}</Tooltip>
        </div>
      </BotItems>
    })
    return botsList;
  }

  render() {
    console.log(this.state.bots);
    return (
      <BotContent>
        <BotContainer>
          <Wrap>
            <CategoryTitle>All Store Bots</CategoryTitle>
            {this.showBots()}
          </Wrap>
        </BotContainer>
        { this.state.isRunBot && <BotShow onClose={this._onCloseBot} botAddress={this.state.botAddress} address={this.props.address} /> }
      </BotContent>
    );
  }
}

const mapStateToProps = state => {
  var address = state.account.address
  return {
    address: address,
  }
}

export default connect(mapStateToProps, null)(BotStore)