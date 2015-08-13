export function WriteStatsPlugin({target, publicPath}) {
  return function writeStats() {
    this.plugin('done', () => {
      console.log(target, publicPath);
    });
  };
}

export function BabelRelayPlugin() {

}
