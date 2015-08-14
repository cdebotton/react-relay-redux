import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {DebugPanel, DevTools, LogMonitor} from 'redux-devtools/lib/react';
import {Router} from 'react-router';
import Relay from 'react-relay';
import store from '../store';
import routes from '../routes';
import * as relayRoutes from '../routes/index';

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = (ENV === 'development') && process.env.BROWSER;

export default class Application extends Component {
  static propTypes = {
    children: PropTypes.any,
    history: PropTypes.object,
    router: PropTypes.object,
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  static getState() {
    return store.getState();
  }

  renderRouter() {
    let router;
    if (process.env.BROWSER) {
      router = (
        <Router
          createElement={(Route, props) => {
            if (Relay.isContainer) {
              const relayRouteElements = Object.keys(relayRoutes)
                .filter((route) => {
                  return (route !== '__esModule') &&
                    (relayRoutes[route].path === props.route.path);
                })
                .map((route) => {
                  return relayRoutes[route];
                });

              if (relayRouteElements.length) {
                const RelayRoute = relayRouteElements[0];

                return (
                  <Relay.RootContainer
                    Component={Route}
                    route={new RelayRoute()} />
                );
              }

              console.error(
                `ERROR: Path ${props.route.path} does not match any ` +
                `Relay Rouetes`
              );

              return false;
            }
            return (
              <Route {...props} />
            );
          }}
          children={routes}
          history={this.props.history} />
      );
    } else {
      ({router} = this.props);
    }

    return router;
  }

  renderDebugPanel() {
    if (DEBUG && this.state.mounted) {
      return (
        <DebugPanel top right bottom>
          <DevTools
            store={store}
            monitor={LogMonitor}
            select={(state) => state} />
        </DebugPanel>
      );
    }
  }

  render() {
    const {children, ...props} = this.props;
    const router = this.renderRouter();
    const debugPanel = this.renderDebugPanel();

    return (
      <Provider store={store}>
        {() => {
          return (
            <span>
              {router}
              {debugPanel}
            </span>
          );
        }}
      </Provider>
    );
  }

  state = {mounted: false}
}
