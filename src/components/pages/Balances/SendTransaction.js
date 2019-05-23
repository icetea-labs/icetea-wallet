import React, { PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';
import { WrapperSend, OutBox, Title, WrapperTab, DisplayTab, Tab, ButtonCus } from './StyledTransaction';
import { ButtonWrapper } from './StyledSTOne';
import { WrapperBtnClose, Icon } from '../../elements/utils';
import notifi from '../../elements/Notification';
import SendTransactionOne from './SendTransactionOne';
import SendTransactionTwo from './SendTransactionTwo';
import { Button } from '../../elements/Button';
import tweb3 from '../../../service/tweb3';
import Notification from 'rc-notification';
import '../../../assets/styles/notification.css';
import { toUNIT } from '../../../utils/utils';

class SendTransaction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      asset: null,
      to: '',
      step: 'one',
      // amount: '',
      // memo: '',
    };
  }

  _next = e => {
    this.setState(Object.assign({}, { step: 'two' }, e));
  };

  _gotoStepOne = () => {
    this.setState({
      step: 'one',
      amount: this.state.amount,
      memo: this.state.memo,
    });
  };

  _transfer = async () => {
    const { amount, to } = this.state;
    const { privateKey, address } = this.props;

    tweb3.wallet.importAccount(privateKey);
    console.log('privateKey', privateKey);
    let balanceofVip = await tweb3.getBalance(address);
    console.log('CK login balance:', balanceofVip);
    const amountToUnit = toUNIT(parseFloat(amount));
    console.log('CK amount:', amountToUnit);
    await tweb3.transfer(to, amountToUnit);
    notifi.info('Send successful!');

    this.props.onSendSuccess();
    this.props.close();
  };

  render() {
    const { step, to, amount, asset, memo, isSending } = this.state;
    const { close, assets, address, bncClient, sendingAsset } = this.props;
    console.log('Send Transaction State CK', this.state);
    return (
      <QueueAnim animConfig={{ opacity: [1, 0] }}>
        <WrapperSend key={1}>
          <QueueAnim leaveReverse delay={100} type={['top', 'bottom']}>
            <OutBox key={2}>
              <Title>{step === 'one' ? 'Send Asset' : 'Confirm Transaction'}</Title>
              <WrapperTab>
                <DisplayTab>
                  <Tab bg={step === 'one' ? '' : '#DFE2E7'} />
                  <Tab bg={step === 'two' ? '' : '#DFE2E7'} />
                </DisplayTab>
                <div>
                  {step === 'one' && (
                    <SendTransactionOne
                      bncClient={bncClient}
                      assets={assets}
                      defaultAsset={sendingAsset || asset}
                      to={to}
                      amount={amount}
                      memo={memo}
                      next={this._next}
                    />
                  )}
                  {step === 'two' && (
                    <SendTransactionTwo
                      bncClient={bncClient}
                      to={to}
                      from={address}
                      amount={amount}
                      asset={sendingAsset || asset}
                      memo={memo}
                      gotoPrevious={this._gotoStepOne}
                      transfer={this._transfer}
                    />
                  )}
                </div>
                <WrapperBtnClose onClick={close}>
                  <Icon type="close" size="16" />
                </WrapperBtnClose>
                {step === 'two' && (
                  <ButtonWrapper style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                    <ButtonCus onClick={this._gotoStepOne}>
                      <span>Previous</span>
                    </ButtonCus>
                    <Button loading={isSending} onClick={this._transfer} width="150px" height="34px">
                      <span>Send Transaction</span>
                    </Button>
                  </ButtonWrapper>
                )}
              </WrapperTab>
            </OutBox>
          </QueueAnim>
        </WrapperSend>
      </QueueAnim>
    );
  }
}

SendTransaction.defaultProps = {
  onSendSuccess: function() {},
  close: function() {},
  assets: [],
  address: '',
  privateKey: '',
  sendingAsset: {},
};

export default SendTransaction;
