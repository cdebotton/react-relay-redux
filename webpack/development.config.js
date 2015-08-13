import webpack from 'webpack';
import path from 'path';
import {WriteStatsPlugin} from './helpers/plugins';

const WEBPACK_PORT = process.env.WEBPACK_PORT || 3001;
const PUBLIC_PATH = `http://localhost:${WEBPACK_PORT}`;

export default {
  name: 'Development',
  devtool: '#eval',
  entry: {
    bundle: [
      `webpack-dev-server/client?${PUBLIC_PATH}`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, '..', 'src', 'client.js'),
    ],
  },
  output: {
    publicPath: PUBLIC_PATH,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        BROWSER: true,
        NODE_ENV: 'development',
      }),
    }),
    new WriteStatsPlugin({
      target: path.join(__dirname, '..', 'build'),
      publicPath: PUBLIC_PATH,
    }),
  ],
};
