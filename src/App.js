import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants/Styles';
import {
  Home,
  NewWalletMaster,
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
      <ThemeProvider theme={ theme }>
        <Router>
          <Switch>
            <Route exact path='/' component={NewWalletMaster} />
            <Route path={`/create`} component={NewWalletMaster} />
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
      </ThemeProvider>
    );
  }
}

export default App;
