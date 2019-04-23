import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import { Home, NewWallet, UnlockWallet} from './components/Page';
=======
import { Home, NewWallet, UnlockWallet } from './components/page';
>>>>>>> master

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
          </Switch>
        </Router>
      </span>
    );
  }
}

export default App;
