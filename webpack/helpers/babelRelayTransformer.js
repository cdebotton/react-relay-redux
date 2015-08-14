import getBabelRelayPlugin from 'babel-relay-plugin';

let data;

try {
  ({data} = require('../../data/schema.json'));
} catch (ex) {
  data = {};
}

export default getBabelRelayPlugin(data);
