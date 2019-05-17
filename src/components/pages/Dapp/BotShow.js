import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import QueueAnim from 'rc-queue-anim'
// import 'botui/build/botui.min.css';
import './botui.min.css'
import './botui-theme-default.css'
import { connectBot } from './bot.js'
import {
  PuLayout,
  PuHeader,
  PuContent,
  WrapperBtnClose,
  Icon
} from '../../elements/utils'

const PuContainer = styled.div`
  min-width:320px;
  max-width:450px;
  height:550px;
  width:100%;
  #my-botui-app:first-child {
    height: 100%;
  };
  border-radius: 15px;
  padding:15px;
  box-sizing:border-box;
  background:${props => props.theme.popupBg};
  box-shadow:${props => props.theme.boxShadow};
  position:absolute;
  top:10%;
  left:50%;
  transform:translate(-50%,-50%);
  @media (max-width:768px){
    width:100%;
    min-width:300px;
    max-width:300px;
    padding:15px;
    top:10%;
  }
`
const WrapperBtnCloseCus = styled(WrapperBtnClose)`
  line-height: 20px;
`
class BotShow extends Component {
  componentDidMount () {
    setTimeout(() => {
      this._start()
    }, 150)
  }

  _start = async () => {
    var { botAddress } = this.props
    console.log('_start', botAddress)
    if (botAddress) {
      try {
        await connectBot(botAddress)
      } catch (error) {
        console.log(error)
        window.alert(String(error))
      }
    } else {
      window.alert('No bot to connect!')
    }
  }

  render () {
    var { onClose, address } = this.props
    return (
      <QueueAnim animConfig={{ opacity: [1, 0] }} >
        <PuLayout key={1} >
          <QueueAnim
            leaveReverse
            delay={100}
            type={['top', 'bottom']}
          >
            <PuContainer key={2} >
              <PuHeader style={{color:'#232937'}}>
              Your Address: {address}
              </PuHeader>
              <PuContent style={{ height: '85%' }} >
                <div id='my-botui-app'>
                  <bot-ui />
                </div>
              </PuContent>
              <WrapperBtnCloseCus onClick={onClose}>
                <Icon type='close' size='18' color='inherit' />
              </WrapperBtnCloseCus>
            </PuContainer>
          </QueueAnim>
        </PuLayout>
      </QueueAnim>
    )
  }
}

BotShow.defaultProps = {
  botAddress: '',
  address: '',
  onClose: function () { }
}

export default BotShow
