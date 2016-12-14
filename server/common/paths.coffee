fs = require 'fs'
path = require 'path'

# 拼接路径
createPathMaker = (base...) ->
  base = path.resolve(path.join(base...))
  (args...) ->
    if args[args.length - 1] is true
      args.length--
      createPathMaker base, args...
    else
      path.resolve(path.join(base, args...))

module.exports = (rootPath) ->
  root = createPathMaker(rootPath)

  node_modules = root()
  while fs.readdirSync(node_modules).indexOf('node_modules') is -1
    parent = path.resolve(node_modules + '/..')
    break if node_modules is parent
    node_modules = parent
  node_modules = createPathMaker(node_modules, 'node_modules')

  join: path.join
  normalize: (str) -> path.normalize(str.replace(/\\|\//g, path.sep))
  node_modules: node_modules
  root: root
  data: root('data', true)
  wwwroot: root('wwwroot', true)
