import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, 
  NewWallet, 
  UnlockWallet,
  Balances,
  Transaction,
  TransactionHistory,
  BotStore
} from './components/page';

class App extends Component {
  render() {
    return (
      <span>
        <Router>
          <Switch>
            <Route exact path='/' component={NewWallet} />
            <Route path={`/Home` } component={Home} />
            <Route path={`/create` } component={NewWallet} />
            <Route path={`/unlock` } component={UnlockWallet} />
            <Route path={`/balances` } component={Balances} />
            <Route path={`/sentTransaction` } component={Transaction} />
            <Route path={`/transactionHistory` } component={TransactionHistory} />
            <Route path={`/botStore` } component={BotStore} />
          </Switch>
        </Router>
      </span>
    );
  }
}

export default App;
