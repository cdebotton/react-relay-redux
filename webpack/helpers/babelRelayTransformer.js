import getBabelRelayPlugin from 'babel-relay-plugin';

let data;

try {
  ({data} = require('../../build/schema.json'));
} catch (ex) {
  data = {};
}

export default getBabelRelayPlugin(data);
