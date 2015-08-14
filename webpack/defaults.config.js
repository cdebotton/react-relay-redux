import webpack from 'webpack';
import path from 'path';
import {WriteStatsPlugin} from './helpers/plugins';

export default {
  name: 'Webpack',
  devtool: undefined,
  target: 'web',
  externals: undefined,
  entry: {
    bundle: path.join(__dirname, '..', 'src', 'client.js'),
  },
  output: {
    path: path.join(__dirname, '..', 'public', 'build'),
    publicPath: '/build/',
    filename: '[hash].js',
    chunkFilename: '[chunkhash].js',
    libraryTarget: 'var',
  },
  module: {
    resolve: ['', '.js', '.json', '.styl', '.css'],
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
        BROWSER: true,
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
    }),
    new WriteStatsPlugin({
      target: path.join(__dirname, '..', 'build', 'webpack-stats.json'),
      publicPath: '/build/',
    }),
  ],
  babel: {
    stage: 0,
    loose: ['all'],
    optional: ['runtime'],
    plugins: [path.join(__dirname, 'helpers', 'babelRelayTransformer.js')],
  },
  stylus: {
    use: [
      require('nib')(),
      require('rupture')(),
    ],
  },
  url: undefined,
  file: undefined,
};
