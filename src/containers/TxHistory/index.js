import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Transaction from './../../components/pages';

class index extends PureComponent {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

index.propTypes = {

};

const mapStateToProps = state => {
  var address = state.account.address
    , transactionHistory = state.transaction.transactionHistory;
  return {
    transactionHistory: transactionHistory.tx,
    total: transactionHistory.total,
    address: address
  }
}
export default connect(mapStateToProps, null)(withRouter(index));