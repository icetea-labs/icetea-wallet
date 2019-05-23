import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import { browserHistory } from '../src/history';
import { theme } from './constants/styles';
import routes from './router';

class App extends Component {
  showContentMenu = routes => {
    var res = null;
    if (routes.length > 0) {
      res = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
      });
    }
    return res;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>{this.showContentMenu(routes)}</Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
