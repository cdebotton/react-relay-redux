import {getValue} from './helpers/utilities';

export default {
  name: getValue('name'),
  devtool: getValue('devtool'),
  target: getValue('target'),
  externals: getValue('externals'),
  entry: {
    bundle: getValue('entry.bundle'),
  },
  output: {
    path: getValue('output.path'),
    publicPath: getValue('output.publicPath'),
    filename: getValue('output.filename'),
    chunkFilename: getValue('output.chunkFilename'),
    libraryTarget: getValue('output.libraryTarget'),
  },
  module: {
    resolve: getValue('module.resolve'),
    loaders: getValue('module.loaders'),
  },
  plugins: getValue('plugins'),
  babel: getValue('babel'),
  stylus: getValue('stylus'),
  url: getValue('url'),
  file: getValue('file'),
};
