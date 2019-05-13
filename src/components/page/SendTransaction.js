import React, { PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';
import {
  WrapperSend,
  OutBox,
  Title,
  WrapperTab,
  DisplayTab,
  Tab,
  ButtonCus
} from "./StyledTransaction";
import {
  ButtonWrapper,
} from './StyledSTOne';
import {
  WrapperBtnClose,
  Icon,
} from './../elements//utils';

import SendTransactionOne from './SendTransactionOne';
import SendTransactionTwo from './SendTransactionTwo';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from './../elements/Button';
import tweb3 from './../../service/tweb3';
import Notification from 'rc-notification';
import '../../assets/styles/notification.css';
import successIc from '../../assets/img/success-icon.png';

let notification = null;
Notification.newInstance({}, (n) => notification = n);

class SendTransaction extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      asset: null,
      to: '',
      step: "one",
      amount: '',
      memo: '',
    }
  }

  _next = (e) => {
    this.setState(Object.assign({}, 
      { step: "two"},e))

    console.log('State CK',this.state);
    console.log('Props CK',this.props);
  }

  _gotoStepOne =  () => {
    this.setState({
      step: "one"
    })
  }

  _transfer = async () => {
    tweb3.wallet.importAccount('CJUPdD38vwc2wMC3hDsySB7YQ6AFLGuU6QYQYaiSeBsK')

    // var answer = window.confirm("Are you sure to transfer?")

    // if (answer) {
    //     await tweb3.transfer(this.props.to, this.props.amount);
    //     window.alert("Transfer Success")
    // } else { return false; }

    await tweb3.transfer(this.props.to, this.props.amount);

    notification.notice({
      content: 
        <span className="notification">
          <img width={25} height={25} src={successIc} alt="" />Send successful!
        </span>,
      onClose() {
        console.log('notify  close');
      },
    });

    var balanceofVip = await tweb3.getBalance(this.props.fromAdd);
    this.props.onSendSuccess();
    this.props.close();
  }

  render() {
    var { step, to, amount, asset, memo, isSending } = this.state;
    var { close, assets, address, bncClient, sendingAsset } = this.props;
    console.log('State CK',this.state);
    console.log('Props CK',this.props);

    return (
      <QueueAnim animConfig={{ opacity: [1, 0] }}>
        <WrapperSend key={1}>
          <QueueAnim leaveReverse={true} delay={100} type={["top", "bottom"]} >
            <OutBox key={2}>
              <Title>{"one" === step ? "Send Asset" : "Confirm Transaction"}</Title>
              <WrapperTab>
                <DisplayTab>
                  <Tab bg={"one" === step ? "" : "#DFE2E7"}  ></Tab>
                  <Tab bg={"two" === step ? "" : "#DFE2E7"}  ></Tab>
                </DisplayTab>
                <div>
                  {
                    "one" === step &&
                    <SendTransactionOne
                      bncClient={bncClient}
                      assets={assets}
                      defaultAsset={sendingAsset || asset}
                      to={to}
                      amount={amount}
                      memo={memo}
                      next={this._next}
                    >
                    </SendTransactionOne>
                  }
                  {
                    "two" === step &&
                    <SendTransactionTwo
                      bncClient={bncClient}
                      to={to}
                      // from={address}
                      from={this.props.fromAdd}
                      amount={amount}
                      asset={sendingAsset || asset}
                      memo={memo}
                      gotoPrevious={this._gotoStepOne}
                      transfer={this._transfer}
                    >
                    </SendTransactionTwo>
                  }
                </div>
                <WrapperBtnClose onClick={close}>
                  <Icon type="close" size="16"></Icon>
                </WrapperBtnClose>
                {
                  "two" === step &&
                  <ButtonWrapper style={{ justifyContent: "flex-end", marginTop: "20px" }}>
                    <ButtonCus onClick={this._gotoStepOne}>
                      <span>Previous</span>
                    </ButtonCus>
                    <Button
                      loading={isSending}
                      onClick={this._transfer}
                      width= "150px"
                      height="34px"
                    >
                      <span>Send Transaction</span>
                    </Button>
                  </ButtonWrapper>
                }
              </WrapperTab>
            </OutBox>
          </QueueAnim>
        </WrapperSend>
      </QueueAnim>
    )
  }
}


SendTransaction.defaultProps = {
  close: function () { },
  assets: [],
  address: "",
  privateKey: "",
  sendingAsset: {}
};

const mapStateToProps = state => {
  return {
    fromAdd: state.account.fromAdd,
    to: state.account.to,
    amount: state.account.amount,
    memo: state.account.memo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccount1: (data) => {
      dispatch(actions.setAccount1(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SendTransaction));