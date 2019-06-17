import React, { PureComponent } from 'react';
import { SupportMnemonic } from './styled';

class ByPrivateKey extends PureComponent {
  render() {
    return (
      <div>
        <SupportMnemonic>
          <span>Current version only support Mnemonic Phase.</span>
        </SupportMnemonic>
      </div>
    );
  }
}

ByPrivateKey.propTypes = {};

export default ByPrivateKey;
