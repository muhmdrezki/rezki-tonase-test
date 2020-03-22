'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"5f96b1f0-6be8-11ea-bf87-2332b9e9a44d"'
})
