import React, { PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';
import {
  WrapperSend,
  OutBox,
  Title,
  WrapperTab,
  DisplayTab,
  Tab
} from "./StyledTransaction";
import SendTransactionOne from './SendTransactionOne';

export default class SendTransaction extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      asset: null,
      to: "",
      step: "one"
    }
  }

  render() {
    var { step } = this.state;
    return (
      <QueueAnim animConfig={{ opacity: [1, 0] }}>
        <WrapperSend key={1}>
          <QueueAnim leaveReverse={true} delay={100} type={["top", "bottom"]} >
            <OutBox key={2}>
              <Title>{"one" === step ? "Send Asset" : "Confirm Transaction"}</Title>
              <WrapperTab>
                <DisplayTab>
                  <Tab bg = {"one" === step ? "" : "#DFE2E7"}  ></Tab>
                  <Tab bg = {"two" === step ? "" : "#DFE2E7"}  ></Tab>
                  <div>
                    <SendTransactionOne>

                    </SendTransactionOne>
                  </div>
                </DisplayTab>
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