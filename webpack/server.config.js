import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

export default {
  name: 'Server',
  target: 'node',
  externals: fs.readdirSync(path.join(__dirname, '..', 'node_modules'))
    .reduce((memo, dir) => {
      if (['.bin'].indexOf(dir) === -1) {
        memo[dir] = dir;
      }
      return memo;
    }, {}),
  entry: {
    bundle: path.join(__dirname, '..', 'src', 'routes.js'),
  },
  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: undefined,
    filename: 'routes-compiled.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        BROWSER: false,
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
    }),
  ],
};
