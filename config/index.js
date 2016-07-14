// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/wwwroot/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/wwwroot'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {
      '/static/img/favicon.ico':'ws://localhost:8888',
      '/socket.io':'ws://localhost:8888',
      '/binary':'ws://localhost:8888',
      '/download':'http://localhost:8888'
    }
  }
}
