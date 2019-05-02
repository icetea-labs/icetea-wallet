import React, { Component } from 'react';
import './Transaction.css';
import tweb3 from './../../service/tweb3';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import './../../assets/styles/dropdown.css'
import TransactionConfirm from './TransactionConfirm';

class Transaction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amountText: '',
      addressText: '',
      balance: '',
      memo: '',
      coins: [
        { name: 'Ice Tea Chain', symbol: 'ITEA' },
        { name: 'BTC Coin', symbol: 'BTC' },
        { name: 'ETH Coin', symbol: 'ETH' },
      ],
      showCFForm: false
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

  componentWillReceiveProps = () => {
    this.setState({
      addressText: this.props.wallet.toAdd

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


  confirmTrans = () => {
    if (this.state.addressText === '') {
      window.alert("Please input To Address")
      return
    } else if (this.state.amountText === '') {
      window.alert("Please input amount to send")
      return
    }

    this.props.onCallCFForm();

    // save to store
    var wallet = {
      fromAdd: 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx',
      toAdd: this.state.addressText,
      amount: this.state.amountText,
      memo: this.state.memo
    }

    this.props.onSaveWallet(wallet);

    console.log('Wallet check', wallet);
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
      <MenuItem key="1">
        <span className="sc-hORach chrZLH">ICETEA</span>&nbsp;&nbsp;
        <span className="sc-bMVAic kVNwVp">Ice Tea Chain</span>
      </MenuItem>
      <Divider />
      <MenuItem key="2">
        <span className="sc-hORach chrZLH">BTC</span>&nbsp;&nbsp;
        <span className="sc-bMVAic kVNwVp">BTC Coin</span>
      </MenuItem>
      <Divider />
      <MenuItem key="3">
        <span className="sc-hORach chrZLH">ETH</span>&nbsp;&nbsp;
        <span className="sc-bMVAic kVNwVp">ETH Coin</span>
      </MenuItem>
    </Menu>
  );

  closeViewForm = () => {
    this.setState({
      showCFForm: !this.state.showCFForm
    });

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
                        value={this.state.toAdd}
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
                    <textarea className="textarea" name="memo" onChange={this.handleChange}></textarea>
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
                    <button className="sc-bZQynM sc-fHlXLc jNKIKp" onClick={this.confirmTrans}>
                      <span>Next</span>
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
    onSaveWallet: (data) => {
      dispatch(actions.saveWallet(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);