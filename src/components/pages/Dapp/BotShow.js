/* eslint-disable */ 
import React, { Component } from 'react';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
// import 'botui/build/botui.min.css';
import './botui.min.css';
import './botui-theme-default.css';
import { connectBot, disConnectBot } from './bot';
import { PuLayout, PuHeader, PuContent, WrapperBtnClose, Icon } from '../../elements/utils';

const PuContainer = styled.div`
  min-width: 320px;
  max-width: 650px;
  height: 750px;
  width: 100%;
  #my-botui-app:first-child {
    position: relative;
    height: 100%;
  }
  // icon menu
  .menu-icon {
    position: fixed;
    top: 60px;
    right: 30px;
    z-index: 10;
    width: 50px;
    height: 50px;
    font-size: 30px;
    color: rgb(90, 90, 90);
  }
  //background-sidebar
  .background-sidebar {
    position: fixed;
    z-index: 4;
    width: 0px;
    height: 100%;
    background-color: #28635a;
    overflow: none;
    // display: none;
  }
  //side-bar
  .sidebar {
    width: 0px;
    height: 0px;
    position: fixed;
    top: 0px;
    z-index: 3;
  }

  // side-bar_right
  .side-bar_right {
    z-index: 100;
    position: fixed;
    right: 17px;
    top: 57px;
    height: 648px;
    background-color: #28635a;
    transition: 300ms;

    .content-sidebar {
      width: 100%;
      height: 92%;
      position: absolute;
      top: 8%;
      color: whitesmoke;
      color: white;
      padding: 10px;
    }

    .bot-menu-items {
      padding-top: 60px;
    }
    .bot-menu-items a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s;
    }

    .bot-menu-items a:hover {
      color: #f1f1f1;
    }
  }
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;
  background: ${props => props.theme.popupBg};
  box-shadow: ${props => props.theme.boxShadow};
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    width: 100%;
    min-width: 300px;
    max-width: 300px;
    padding: 15px;
    top: 10%;
  }
`;
const WrapperBtnCloseCus = styled(WrapperBtnClose)`
  line-height: 20px;
`;
class BotShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this._start();
    }, 150);
  }

  componentWillUnmount() {
    disConnectBot();
  }

  _start = async () => {
    const { botAddress, privateKey } = this.props;
    if (botAddress) {
      try {
        await connectBot(botAddress, privateKey);
      } catch (error) {
        console.log(error);
        window.alert(String(error));
      }
    } else {
      window.alert('No bot to connect!');
    }
  };

  openBar = () => {
    this.setState({
      showMenu: true,
    });
  };

  hiddenSibar = () => {
    this.setState({
      showMenu: false,
    });
  };

  render() {
    const { showMenu } = this.state;
    const { onClose, address } = this.props;
    return (
      <QueueAnim animConfig={{ opacity: [1, 0] }}>
        <PuLayout key={1}>
          <QueueAnim leaveReverse delay={100} type={['top', 'bottom']}>
            <PuContainer key={2}>
              <PuHeader style={{ color: '#232937' }}>Your Address: {address}</PuHeader>
              <PuContent style={{ height: '90%' }}>
                <div id="my-botui-app">
                  <bot-ui />
                </div>
                <div className="sidebar" id="sidebar">
                  <div className="background-sidebar" />
                  <div className="menu-icon phone">
                    <i className="fa fa-bars" onClick={this.openBar} />
                  </div>
                  <div
                    className="side-bar_right"
                    id="side-bar_right"
                    style={{ width: showMenu === true ? '15pc' : '0px' }}
                    onBlur={this.hiddenSibar}
                  >
                    <WrapperBtnCloseCus
                      id="btnClose"
                      onClick={this.hiddenSibar}
                      style={{ display: showMenu === true ? 'block' : 'none' }}
                    >
                      <Icon type="close" size="18" color="inherit" />
                    </WrapperBtnCloseCus>
                    <div
                      className="content-rsideba"
                      id="content-rsideba"
                      style={{ display: showMenu === true ? 'block' : 'none' }}
                      // onBlur={this.hiddenSibar}
                    >
                      <div className="bot-menu-items" id="bot-menu-items">
                        <a href="#">About</a>
                        <a href="#">Services</a>
                        <a href="#">Clients</a>
                        <a href="#">Contact</a>
                      </div>
                    </div>
                  </div>
                </div>
              </PuContent>
              <WrapperBtnCloseCus onClick={onClose}>
                <Icon type="close" size="18" color="inherit" />
              </WrapperBtnCloseCus>
            </PuContainer>
          </QueueAnim>
        </PuLayout>
      </QueueAnim>
    );
  }
}

BotShow.defaultProps = {
  botAddress: '',
  address: '',
  privateKey: '',
  onClose() {},
};

export default BotShow;
