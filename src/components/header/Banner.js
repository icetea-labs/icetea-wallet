import React, { Component } from 'react'

class Banner extends Component {
  render () {
    return (
      <div className='banner'>
        <div className='container'>
          <div className='flex'>
            <div>
              <h3>ICETEA CHAIN EXPLORER</h3>
              <a className='direc_link' href='http://trada.tech' rel='noopener noreferrer' target='_blank'>Check out Icetea DEX →</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Banner
