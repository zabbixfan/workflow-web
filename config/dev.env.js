var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    LOCAL_HOST: '"http://192.168.6.120:8080"',
    AUTH_SERVER_HOST: '"http://192.168.7.60:6200"',
    APP_ID: '"7fa4ee1e5a7511e78254ac87a304fa2e"',
    API_HOST: '"http://192.168.6.120:6210"',
    APP_NAME: '"workflow"'

})
