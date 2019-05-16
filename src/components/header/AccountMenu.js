import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import add from '../../assets/img/add.png'
import imported from '../../assets/img/import.png'
import connected from '../../assets/img/connected.png'
import info from '../../assets/img/info.png'
import settings from '../../assets/img/settings.png'
import checked from '../../assets/img/checked.png'

const listAccount = [
  {
    username: 'Tài khoản 1',
    total: 1
  },
  {
    username: 'Tài khoản 2',
    total: 2
  },
  {
    username: 'Tài khoản 3',
    total: 3
  },
  {
    username: 'Tài khoản 4',
    total: 4
  }
]

class AccoutMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedAccount: 0
    }
  }

  showAccount = () => {
    const account = listAccount.map((item, index) => {
      const className = (index === this.state.selectedAccount) ? 'account-menu__check-mark checked' : 'account-menu__check-mark'
      return <div className='account-menu__account menu__item--clickable' key={index} onClick={() => this.setSelectedAccount(index)}>
        <div className={className}>
          <img className='account-menu__check-mark-icon' src={checked} alt='' />
        </div>
        <div className='identicon'><img src={logo} alt='' /></div>
        <div className='account-menu__account-info'>
          <div className='account-menu__name'>{item.username}</div>
          <div className='currency-display-component account-menu__balance'>
            <span className='currency-display-component__text'>{item.total} ETH</span>
          </div>
        </div>
      </div>
    })

    return account
  }

  setSelectedAccount = (id) => {
    this.setState({ selectedAccount: id })
  }

  render () {
    return (
      <div className='account-wrapper'>
        <i className='iconfont icon-account sc-dnqmqq iiYHFz' size='16' color='' />
        <div className='menu account-menu'>
          <div className='menu__close-area' />
          <div className='menu__item account-menu__header '>
            <span>Tài khoản của tôi</span>
            <button className='account-menu__logout-button'>Thoát</button>
          </div>
          <div className='menu__divider' />
          <div className='account-menu__accounts-container'>
            <div className='account-menu__accounts'>
              {this.showAccount()}
            </div>
          </div>
          <div className='menu__divider' />
          <div className='menu__item menu__item  menu__item--clickable'>
            <div className='menu__item__icon'>
              <img className='account-menu__item-icon' src={add} alt='' />
            </div>
            <div className='menu__item__text'>Tạo tài khoản</div>
          </div>
          <div className='menu__item menu__item  menu__item--clickable'>
            <div className='menu__item__icon'>
              <img className='account-menu__item-icon' src={imported} alt='' />
            </div>
            <div className='menu__item__text'>Nhập tài khoản</div>
          </div>
          <div className='menu__item menu__item  menu__item--clickable'>
            <div className='menu__item__icon'>
              <img className='account-menu__item-icon' src={connected} alt='' />
            </div>
            <div className='menu__item__text'>Connect Hardware Wallet</div>
          </div>
          <div className='menu__divider' />
          <div className='menu__item menu__item  menu__item--clickable'>
            <div className='menu__item__icon'>
              <img className='account-menu__item-icon' src={info} alt='' />
            </div>
            <div className='menu__item__text'>Thông tin và Trợ giúp</div>
          </div>
          <div className='menu__item menu__item  menu__item--clickable'>
            <div className='menu__item__icon'>
              <img className='account-menu__item-icon' src={settings} alt='' />
            </div>
            <div className='menu__item__text'>Cài đặt</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccoutMenu
