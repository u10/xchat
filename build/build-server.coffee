require 'shelljs/global'
paths = require('../lib/common/paths')(__dirname + '/..')
webpack = require 'webpack'
ora = require 'ora'
fs = require 'fs'
spinner = ora('building for production...')

pkgSrc = require '../package.json'

spinner.start()

pkg =
  dependencies: {}

pkg[k] = pkgSrc[k] for k in [
  'version'
  'name'
  'description'
  'author'
  'main'
]

deps = [
  'serve-favicon'
  'express'
  'argparse'
  'lodash'
  'uuid-js'
  'binaryjs'
  'socket.io'
]

dist = paths.root('dist', true)
node_modules = dist('node_modules', true)
rm '-rf', dist('bin')
rm '-rf', dist('lib')
rm '-rf', node_modules()
mkdir '-p', node_modules()
cp '-R', paths.root('bin'), dist('bin')

nodeModules =
  '../../package.json': 'commonjs ../package.json'
  path: 'commonjs path'
  http: 'commonjs http'
  fs: 'commonjs fs'

for mod in deps
  pkg.dependencies[mod] = pkgSrc.dependencies[mod]
  nodeModules[mod] = 'commonjs ' + mod
  cp '-R', paths.root('node_modules', mod), node_modules(mod)

fs.writeFileSync dist('package.json'), JSON.stringify(pkg, null, '  ')

webpack {
  entry:
    main: paths.root('lib', 'main.coffee')
  output:
    path: dist('lib')
    filename: '[name].js'
  node:
    __filename: false
    __dirname: false
  externals: nodeModules
  module:
    loaders: [
      {
        test: /\.coffee/
        loader: 'coffee'
      }
    ]
  resolve:
    extensions: ['', '.coffee']
  plugins: [
    new webpack.optimize.UglifyJsPlugin(
      compress:
        warnings: false
    )
  ],
  eslint:
    formatter: require('eslint-friendly-formatter')
}, (err, stats) ->
  spinner.stop()
  throw err if err
  process.stdout.write stats.toString(
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    ) + '\n'
  return
