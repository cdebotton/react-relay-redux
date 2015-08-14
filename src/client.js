import React from 'react';
import ReactDOM from 'react-dom';
import Application from './containers/Application';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import HashHistory from 'react-router/lib/HashHistory';

import Relay from 'react-relay';
import DefaultNetworkLayer from 'react-relay/lib/RelayDefaultNetworkLayer';
Relay.injectNetworkLayer(new DefaultNetworkLayer('/graphql'));

let history;
try {
  history = new BrowserHistory();
} catch (ex) {
  history = new HashHistory();
}

ReactDOM.render((
  <Application history={history} />
), document.getElementById('mount'));
