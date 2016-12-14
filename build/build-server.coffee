require 'shelljs/global'
paths = require('../server/common/paths')(__dirname + '/..')
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

dist = paths.root('dist', true)
node_modules = dist('node_modules', true)
rm '-rf', dist('bin')
rm '-rf', dist('server')
rm '-rf', node_modules()
mkdir '-p', node_modules()
cp '-R', paths.root('bin'), dist('bin')

nodeModules =
  '../../package.json': 'commonjs ../package.json'
  path: 'commonjs path'
  http: 'commonjs http'
  fs: 'commonjs fs'

for mod of pkgSrc.dependencies
  pkg.dependencies[mod] = pkgSrc.dependencies[mod]
  nodeModules[mod] = 'commonjs ' + mod
  cp '-R', paths.root('node_modules', mod), node_modules(mod)

fs.writeFileSync dist('package.json'), JSON.stringify(pkg, null, '  ')

webpack {
  entry:
    main: paths.root('server', 'main.coffee')
  output:
    path: dist('server')
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
