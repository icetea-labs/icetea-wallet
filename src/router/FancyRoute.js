import React from 'react';
import { Route } from 'react-router-dom';
import nprogress from 'nprogress';
// import 'nprogress/nprogress.css';
import './FancyRoute.css';

class FancyRoute extends React.Component {
  componentWillMount() {
    nprogress.start();
    // nprogress.set(0.0); // To set a progress percentage, call .set(n), where n is a number between 0..1
    nprogress.inc(0.5); // To increment the progress bar, just use .inc(). This increments it with a random amount. This will never get to 100%: use it for every image load (or similar).If you want to increment by a specific value, you can pass that as a parameter
    nprogress.configure({ ease: 'ease', speed: 500 }); // Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: ease and 200)
    nprogress.configure({ trickleRate: 0.1, trickleSpeed: 800 }); // Adjust how often to trickle/increment, in ms.
    nprogress.configure({ showSpinner: false }); // Turn off loading spinner by setting it to false. (default: true)
    nprogress.configure({ parent: 'body' }); // specify this to change the parent container. (default: body)
  }

  componentDidMount() {
    nprogress.done(true);
  }

  render() {
    return <Route {...this.props} />;
  }
}

export default FancyRoute;
