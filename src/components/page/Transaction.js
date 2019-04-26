import React, { Component } from 'react';
import './Transaction.css';
import tweb3 from './../../service/tweb3';
import QRCode from 'qrcode.react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import './../../assets/styles/dropdown.css'


class Transaction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amountText: '',
      addressText: '',
      balance: ''
    };
  }
  componentWillMount = async () => {
    var balanceofVip = '';
    balanceofVip = await tweb3.getBalance('tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx');
    console.log("I want to see BL:", balanceofVip)
    this.setState({
      balance: balanceofVip.balance
    })
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    console.log("Check value", value)
    this.setState({
      [name]: value
    })
  }

  sendTransaction = async () => {
    if (this.state.addressText === '') {
      window.alert("Please input To Address")
      return
    } else if (this.state.amountText === '') {
      window.alert("Please input amount to send")
      return
    }

    tweb3.wallet.importAccount('CJUPdD38vwc2wMC3hDsySB7YQ6AFLGuU6QYQYaiSeBsK')

    var answer = window.confirm("Are you sure to transfer?")

    if (answer == true) {
      await tweb3.transfer(this.state.addressText, this.state.amountText);
      window.alert("Transfer Success")
    } else { return false; }

    var balanceofVip = await tweb3.getBalance('tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx');
    console.log("I want to see BL:", balanceofVip);
    this.props.onSendSuccess();
    this.props.closePoup();
  }

  onSelect({ key }) {
    console.log(`${key} selected`);
  }

  onVisibleChange = (visible) => {
    console.log(visible);
  }

  menu = () => (
    <Menu onSelect={this.onSelect}>
      <MenuItem key="0" disabled className="search-box" >
        <i className="fa fa-search iiYHFz" aria-hidden="true" size="16" ></i>
        <input placeholder="Search Asset"></input>
      </MenuItem>
      <MenuItem key="1">ICETEA</MenuItem>
      <Divider />
      <MenuItem key="2">BTC</MenuItem>
    </Menu>
  );

  closeClick() {
    this.props.onChangePopup('');
  }

  render() {
    return (
      <div className="sc-cQFLBn kViODF">
        <div>
          <div className="sc-iVOTot kWvvtK" >
            <div className="sc-kOCNXg esTWxZ">Send Transaction</div>
            <div className="sc-hZhUor hQTvNh">
              <div className="sc-iysEgW kOhtc">
                <div className="sc-fxgLge cDKtWs"></div>
                <div className="sc-fxgLge ibjfRk"></div>
              </div>
              <div>
                <div>
                  <div className="sc-eTyWNx hoKJiD">
                    <p className="">Select Asset</p>
                    <div width="100%" className="select  sc-dHmInP iBVLYA">
                      <div>
                        {/* <div className="selectValue"><span class="sc-evWYkj eUyRlB">ICETEA</span>&nbsp;&nbsp;</div> */}
                        <Dropdown
                          trigger={['click']}
                          overlay={this.menu}
                          animation="slide-up"
                          onVisibleChange={this.onVisibleChange}
                        >
                          <div className="selectValue"><span className="sc-evWYkj eUyRlB">ICETEA</span>&nbsp;&nbsp;</div>
                        </Dropdown>
                        <i className="sc-hZSUBg kpQUwp" onClick={() => this.menu} ></i>
                      </div>
                    </div>
                  </div>
                  <div className="sc-eTyWNx hoKJiD">
                    <div className="sc-cLxPOX cyWHjc">
                      <p className="">To Address</p>
                      <div>
                        <input type="text" placeholder="To Address" name="addressText"
                          onChange={this.handleChange} />
                        <div className="border-bottom"></div>
                      </div>
                    </div>
                  </div>
                  <div className="sc-eTyWNx hoKJiD">
                    <div className="sc-cLxPOX cyWHjc">
                      <p className="">Amount to send</p>
                      <div><input type="number" placeholder="Amount to send" name="amountText" onChange={this.handleChange} />
                        <div className="border-bottom"></div>
                      </div>
                    </div>
                  </div>
                  <div className="sc-eTyWNx hoKJiD">
                    <p className="titleM">Memo</p>
                    <textarea className="textarea"></textarea>
                  </div>
                  <div className="sc-eTyWNx hoKJiD">
                    <div className="sc-bsVVwV bkSpCY">
                      <div className="sc-kbGplQ clrIxQ">
                        <span className="fee-title">Fee:</span>
                        <span className="fee-value">
                          <span className="sc-tilXH yKCJu">0.000000</span> ICETEA</span>
                      </div>
                      <div className="sc-exdmVY iRFfLO">
                        <span className="Available-title">Available:</span>
                        <span className="Available-value">
                          <span className="sc-tilXH yKCJu">{this.state.balance}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sc-jDwBTQ cPxcHa">
                    <button className="sc-bZQynM sc-fHlXLc jNKIKp" onClick={() => this.sendTransaction()}>
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sc-lkqHmb jPpgi">
              <i className="fa fa-times dJRkzW" aria-hidden="true" onClick={() => this.props.closePoup()} ></i></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.wallet
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePopup: (puNo) => {
      dispatch(actions.changePopup(puNo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);