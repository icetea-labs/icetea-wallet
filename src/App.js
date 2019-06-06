import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import Layout from './components/layout';
import routes from './router';
import { theme } from './constants/styles';
import { GlobaLoading } from './components/elements';

const RouteLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

class App extends PureComponent {
  componentDidMount() {
    window.addEventListener('resize', this._resizeWindow);
    this.hideProgressive();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeWindow);
  }

  showContentMenu = values => {
    let routeNotLayout = [];
    let routesLayout = [];

    if (values.addheader) {
      routesLayout = values.addheader.map(route => {
        return <RouteLayout key={route.path} path={route.path} exact={route.exact} component={route.component} />;
      });
    }

    if (values.noheader) {
      routeNotLayout = values.noheader.map(route => {
        return <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />;
      });
    }

    return routesLayout.concat(routeNotLayout);
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
