require('babel/register')({
  stage: 0,
  loose: ['all'],
  optional: ['runtime'],
});

module.exports = require('./webpack');
