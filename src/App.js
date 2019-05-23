import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from '../src/history';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants/styles';
import routes from './router';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Switch>{this.showContentMenu(routes)}</Switch>
        </Router>
      </ThemeProvider>
    );
  }

  showContentMenu = routes => {
    var res = null;
    if (routes.length > 0) {
      res = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
      });
    }
    return res;
  };
}

export default App;
