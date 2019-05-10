import React, { Component } from 'react';
import './TransactionConfirm.css'
import tweb3 from './../../service/tweb3';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class TransactionConfirm extends Component {

    componentDidMount = () => {
        console.log('CK props', this.props)
    }

    sendTransaction = async () => {

        tweb3.wallet.importAccount('CJUPdD38vwc2wMC3hDsySB7YQ6AFLGuU6QYQYaiSeBsK')

        var answer = window.confirm("Are you sure to transfer?")

        if (answer) {
            await tweb3.transfer(this.props.toAdd, this.props.amount);
            window.alert("Transfer Success")
        } else { return false; }

        var balanceofVip = await tweb3.getBalance('tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx');
        console.log("I want to see BL:", balanceofVip);
        this.props.onSendSuccess();
        this.props.closePoup();
    }

    sendTransForm = () => {
        this.props.onCallTransForm();
        var userInfo = {
            fromAdd: this.props.fromAdd,
            toAdd: this.props.toAdd,
            amount: this.props.amountText,
            memo: this.props.memo
          }
      
          this.props.sendInfo(userInfo);
    }

    render() {

        var fromAdd = this.props.fromAdd;
        var toAdd = this.props.toAdd;
        var amount = this.props.amount;
        var memo = this.props.memo;

        return (
            <div className="sc-cQFLBn kViODF">
                <div>
                    <div className="sc-gojNiO eOBWdQ">
                        <div className="sc-daURTG bXhOGH">Confirm Transaction</div>
                        <div className="sc-bXGyLb flEHgi">
                            <div className="sc-eLExRp OsgFE">
                                <div className="sc-cbkKFq BDdrA"></div>
                                <div className="sc-cbkKFq cMpCTv"></div>
                            </div>
                            <div>
                                <div>
                                    <div className="sc-GMQeP bXtjBe"><span className="name">ICETEA</span>
                                        <span className="fullName">Ice Tea Chain</span></div>
                                    <div className="sc-esOvli sc-exAgwC jeQarz">
                                        <div className="title">To:</div>
                                        <div className="value">{toAdd}</div>
                                    </div>
                                    <div className="sc-esOvli sc-exAgwC jeQarz">
                                        <div className="title">From:</div>
                                        <div className="value">{fromAdd}</div>
                                    </div>
                                    <div className="sc-esOvli sc-exAgwC jeQarz">
                                        <div className="title">Amount:</div>
                                        <div className="value"><span className="sc-dqBHgY igApRg">{amount}</span></div>
                                    </div>
                                    <div className="sc-esOvli sc-exAgwC jeQarz">
                                        <div className="title">Memo:</div>
                                        <div className="value">{memo}</div>
                                    </div>
                                    <div className="sc-esOvli sc-exAgwC jeQarz">
                                        <div className="title">Fee:</div>
                                        <div className="value"><span className="sc-dqBHgY igApRg">0.000000</span> ICETEA</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sc-lkqHmb jPpgi"><i className="fa fa-times dJRkzW" aria-hidden="true" onClick={() => this.props.closePoup()} ></i>
                        </div>
                        <div className="sc-hzDkRC iqQaYS">
                        <button
                            className="sc-bZQynM sc-krvtoX fzSklC" onClick={this.sendTransForm}>
                            <span>Previous</span>
                            </button>
                            <button width="150px" height="34px"
                                className="sc-bZQynM axcGx" onClick={this.sendTransaction}><span>Send Transaction</span></button></div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        fromAdd: state.account.fromAdd,
        toAdd: state.account.toAdd,
        amount: state.account.amount,
        memo: state.account.memo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendInfo: (data) => {
            dispatch(actions.setUserInfo(data))
          }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionConfirm);