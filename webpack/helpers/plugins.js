import path from 'path';
import fs from 'fs';

export function WriteStatsPlugin({target}) {
  return function writeStats() {
    this.plugin('done', (stats) => {
      const json = stats.toJson();
      let chunks = json.assetsByChunkName.bundle;

      if (!Array.isArray(chunks)) {
        chunks = [chunks];
      }

      const assets = chunks.filter((chunk) => {
        return ['.js', '.css'].indexOf(path.extname(chunk)) > -1;
      }).reduce((memo, chunk) => {
        const ext = path.extname(chunk).match(/\.(.+)$/)[1];

        memo[ext] = memo[ext] || [];
        memo[ext].push(chunk);

        return memo;
      }, {});

      fs.writeFileSync(
        target,
        JSON.stringify(assets, null, 2)
      );
    });
  };
}
