import React, { Component } from 'react';
import './BotStore.css';
import tweb3 from '../../service/tweb3';
import { callbackify } from 'util';


class BotStore extends Component {
  constructor() {
    super();
    this.state = {
      bots: [],
      botStore: []
    }
  }

  componentDidMount() {
    this.renderStore();
  }
  renderStore = async () => {
    var arrBot = await this.getBotList();
    var storeBots = await this.getBotInfo(arrBot);
    console.log(storeBots);
    this.setState({
      bots: storeBots,
      botStore: storeBots.map((bot, index) => {
        return (
          <div key={index} >
            <article color="#fff" data-testid="series" className="SeriesCard__Card-sedkn5-0 bWCvDb">
              <div className="SeriesCard__CardLayout-sedkn5-1 ePsksC">
                <div style={{ display: 'flex', }} >
                  <img className="float-left" style={{ width: '50px', height: '50px' }} src={bot.icon} alt="Material Dashboard" />
                  <div className="botName" >
                    <div>
                      <p>{bot.name}</p>
                      <p>@{bot.alias}</p>
                    </div>
                    <button className="sc-bZQynM sc-MYvYT sc-jbWsrJ ircCEl1" onClick={this.viewSendForm}>Get</button>
                  </div>
                </div>
                <hr></hr>
                <div>
                  <p className="SeriesCard__Title-sedkn5-5 cceqce" >{bot.description}</p>
                </div>
              </div>
            </article>
          </div>
        )
      })
    });
  }
  getBotList = async () => {
    var address = 'system.botstore';
    const contract = tweb3.contract(address);
    const arrbots = await contract.methods.query().call();
    return arrbots;
  }
  getBotInfo = async (bots) => {
    var resInfo = [];
    var keys = Object.keys(bots);
    for (let bot of keys) {
      var botInfo = { address: '', category: 'category', name: 'name', icon: 'icon', description: 'description' };
      const contract = tweb3.contract(bot);
      const info = await contract.methods.botInfo().callPure();
      botInfo.address = bot;
      botInfo.category = bots[bot].category;
      botInfo.icon = bots[bot].icon;
      botInfo.name = info.name;
      botInfo.alias = bot.split('.', 2)[1]
      botInfo.description = info.description || '';
      if (botInfo.description.length > 36) {
        botInfo.description = botInfo.description.substring(0, 36) + '…'
      }
      resInfo.push(botInfo);
    }
    return resInfo;
  }
  render() {
    return (
      <div className="Playlists__PlaylistsPageLayout-sc-17pexn-0 bUAaOS" >
        <section className="playlists-wrapper">
          <div data-testid="search-bar" className="SearchBar__SearchWrapper-sc-1xki62n-0 gGysvU">
            <svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
              <circle fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" cx="8.5" cy="8.5" r="8"></circle>
              <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="14.156"
                y1="14.156" x2="23.5" y2="23.5">
              </line>
            </svg>
            <input type="text" data-testid="search-bar-input" onChange={() => this.onChange()} value="" placeholder="Filter Series" />
            <div className="underline"></div>
          </div>
          <div className="Layouts__TutorialGrid-fbi9rv-11 jxllbm">
            {this.state.botStore}
          </div>
        </section>
      </div>
    );
  }
}

export default BotStore;
