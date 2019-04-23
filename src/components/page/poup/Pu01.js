import React, { Component } from 'react';
// css
import './Pu01.css'

class Pu01 extends Component {

  continueClick() {
    this.props.onChangeForm('04');
    this.closeClick()
  }

  closeClick() {
    this.props.onChangePopup('');
  }

  render() {
    return (
      <div className="sc-jnlKLf kSGfGW1">
        <div>
          <div className="sc-fYxtnH fahGvB1">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Pu01;