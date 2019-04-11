import React, { Component } from 'react';
import Layout from '../Layout';

class Home extends Component {

  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    return (
      <Layout>
        <div className="home">
          {/* <Banner /> */}
          <div className="blocks_transactions_view">
            <div className="container">
              {/* <BlocksBox /> */}
              {/* <TransactionsBox /> */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;