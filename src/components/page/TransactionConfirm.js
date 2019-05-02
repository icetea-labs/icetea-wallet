import React, { Component } from 'react';
import './TransactionConfirm.css'
import tweb3 from './../../service/tweb3';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class TransactionConfirm extends Component {

    sendTransaction = async () => {

        tweb3.wallet.importAccount('CJUPdD38vwc2wMC3hDsySB7YQ6AFLGuU6QYQYaiSeBsK')

        var answer = window.confirm("Are you sure to transfer?")

        if (answer == true) {
            await tweb3.transfer(this.props.wallet.toAdd, this.props.wallet.amount);
            window.alert("Transfer Success")
        } else { return false; }

        var balanceofVip = await tweb3.getBalance('tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx');
        console.log("I want to see BL:", balanceofVip);
        this.props.onSendSuccess();
        this.props.closePoup();
    }

    sendTransForm = () => {
        this.props.onCallTransForm();
        var wallet = {
            fromAdd: this.props.wallet.fromAdd,
            toAdd: this.props.wallet.toAdd,
            amount: this.props.wallet.amount,
            memo: this.props.wallet.memo
          }
      
          this.props.onSaveWallet(wallet);
    }

    render() {

        if (this.props.wallet) var fromAdd = this.props.wallet.fromAdd;
        if (this.props.wallet) var toAdd = this.props.wallet.toAdd;
        if (this.props.wallet) var amount = this.props.wallet.amount;
        if (this.props.wallet) var memo = this.props.wallet.memo;

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
export default connect(mapStateToProps, mapDispatchToProps)(TransactionConfirm);