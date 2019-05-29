import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import routes from './router';
import { theme } from './constants/styles';
import { GlobaLoading } from './components/elements';

class App extends PureComponent {
  componentDidMount() {
    window.addEventListener('resize', this._resizeWindow);
    this.hideProgressive();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeWindow);
  }

  showContentMenu = list => {
    let res = null;
    if (list.length > 0) {
      res = list.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
      });
    }
    return res;
  };

  hideProgressive = () => {
    window.document.querySelector('.progressive-content').style.display = 'none';
  };

  render() {
    const { isLoading } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div>
          <BrowserRouter>
            <Switch>{this.showContentMenu(routes)}</Switch>
          </BrowserRouter>
          {isLoading && <GlobaLoading />}
        </div>
      </ThemeProvider>
    );
  }
}

App.defaultProps = {
  isLoading: false,
  isHardware: false,
};

const mapStateToProps = state => {
  return {
    isLoading: state.globalData.isLoading,
    isHardware: state.account.flags.isHardware,
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
