const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(`../${ENV}.config`);
const baseConfig = require('../defaults.config');

const findValue = (parts, config) => parts.reduce((memo, part) => {
  if (memo && memo[part]) {
    return memo[part];
  }

  return false;
}, config);

export function getValue(path) {
  const parts = path.split('.');

  let value = findValue(parts, envConfig);

  if (!value) {
    value = findValue(parts, baseConfig);
  }

  return value;
}
