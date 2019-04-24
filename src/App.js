import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Home,
  NewWallet,
  UnlockWallet,
  Balances,
  Transaction,
  TransactionHistory,
  BotStore
} from './components/page';
import Layout from './components/layout';

class App extends Component {
  render() {
    return (
      <span>
        <Router>
          <Switch>
            <Route exact path='/' component={NewWallet} />
            <Route path={`/create`} component={NewWallet} />
            <Route path={`/unlock`} component={UnlockWallet} />
            <Layout>
              <Route path={`/Home`} component={Home} />
              <Route path={`/sentTransaction`} component={Transaction} />
              <Route path={`/transactionHistory`} component={TransactionHistory} />
              <Route path={`/botStore`} component={BotStore} />
              <Route path={`/balances`} component={Balances} />
            </Layout>
          </Switch>
        </Router>
      </span>
    );
  }
}

export default App;
