import koa from 'koa';
import mount from 'koa-mount';
import statics from 'koa-static';
import compress from 'koa-compress';
import bodyparser from 'koa-bodyparser';
import proxy from 'koa-proxy';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Relay from 'react-relay';
import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import {green, red} from 'colors';
import Application from './containers/Application';
import Layout from './views/Layout';

const ENV = process.env.NODE_ENV || 'development';
const APP_PORT = process.env.PORT || 3000;
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 8080;
const WEBPACK_PORT = process.env.WEBPACK_PORT || 3001;

const app = koa();
const graphQLServer = express();

try {
  const Schema = require('../data/schema');

  graphQLServer.use(graphqlHTTP({
    schema: Schema,
    pretty: true,
  }));

  graphQLServer.listen(GRAPHQL_PORT, () => {
    console.log(
      green(`GraphQL Server running at http://localhost:${GRAPHQL_PORT}`)
    );
  });

  app.use(mount('/graphql', proxy({
    host: 'http://localhost:8080',
  })));
} catch (ex) {
  console.error(red('ERROR: Cannot find schema.json.'));
}

if (ENV === 'development') {
  app.use(mount('/build', proxy({
    host: `http://localhost:${WEBPACK_PORT}`,
  })));
}

app.use(compress());
app.use(bodyparser());
app.use(statics(path.join(__dirname, '..', 'public')));
app.use(function* render() {
  let stats;

  try {
    stats = require('../build/webpack-stats.json');
  } catch (ex) {
    stats = {};
    console.error(red('Could not find webpack-stats.json'));
  }

  // let markup;
  // try {
  //   const routerProps = yield new Promise((resolve, reject) => {
  //     const location = new Location(this.req.url);
  //     const routes = require('../build/routes-compiled');
  //     Router.run(routes, location, (err, initialState) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       resolve(initialState);
  //     });
  //   });

  //   const router = (
  //     <Router {...routerProps} />
  //   );

  //   markup = ReactDOM.renderToString(
  //     <Application router={router} />
  //   );
  // } catch (ex) {
  //   markup = '';
  // }

  const html = ReactDOM.renderToStaticMarkup(
    <Layout
      {...stats} />
  );

  this.body = `<!doctype>\n${html}`;
});

app.listen(APP_PORT, () => {
  console.log(green(`App is running at http://localhost:${APP_PORT}`));
});
