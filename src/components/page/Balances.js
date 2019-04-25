import React, { Component } from 'react';
import './Balances.css';

class Balances extends Component {
  render() {
    return (
      <div className="sc-lnrBVv kvEeOF">
        <div className="sc-kIWQTW jfuazO">
          <div className="sc-hMjcWo jvYfux">
            <div className="sc-gCwZxT iWYAnd">
              <div><span>Balances</span><span className="text-address"><i>tbnb1ll03gn7gkmuzaygs3kv6x3uswh4nep5u3r5tua</i></span>
              </div>
              <div className="sc-jDwBTQ cPxcHa">
                <div className="sc-fATqzn cNStFF">
                <i class="fa fa-qrcode sc-dnqmqq dJRkzW" aria-hidden="true" size="18"></i>
                  <div className="qrCode">
                    <div size="174" className="qrcode-box sc-iSDuPN iulYhq"><canvas height="174" width="174"
                      style={{height: '174px', width: '174px' }}></canvas></div>
                  </div>
                </div>
                <div className="sc-fATqzn cNStFF">
                <i class="fa fa-clone" aria-hidden="true" size="18"></i>
                </div>
              </div>
            </div>
            <div>
              <div className="sc-hvvHee cOshIS">
                <table className="sc-fQejPQ sc-cPuPxo dcZana">
                  <thead className="sc-eSePXt byspTh">
                    <tr>
                      <th>Asset</th>
                      <th>Name</th>
                      <th>Total Balance</th>
                      <th>Available Balance</th>
                      <th>Frozen</th>
                      <th>In Order</th>
                      <th>BTC Value</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="sc-fvLVrH gjcHsq">
                    <tr>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM">007-749</div>
                      </td>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM">007 Token</div>
                      </td>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0.193</span></div>
                      </td>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0.193</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0.03573549</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ sc-hqGPoI feIRPa"><button
                          className="sc-bZQynM sc-MYvYT sc-jbWsrJ ircCEl">Send</button></div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM">BNB</div>
                      </td>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM">Binance Chain Native Token</div>
                      </td>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">172.274412</span></div>
                      </td>
                      <td style={{width: '15%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">168.274412</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">4</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ jvVxXM"><span className="sc-tilXH yKCJu">0.79744963</span></div>
                      </td>
                      <td style={{width: '10%'}}>
                        <div className="sc-hkaZBZ sc-hqGPoI feIRPa"><button
                          className="sc-bZQynM sc-MYvYT sc-jbWsrJ ircCEl">Send</button></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Balances;