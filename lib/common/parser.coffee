pkgObj = require('../../package.json')
ArgumentParser = require('argparse').ArgumentParser

parser = new ArgumentParser(
  version: pkgObj.version
  addHelp: true
  description: 'XChat'
  prog: 'xchat'
)

args = [
  ['-a', '--addr']
  help: '指定监听IP'
  defaultValue: '0.0.0.0'
  ['-p', '--port']
  help: '指定监听端口。'
  defaultValue: 8888
]

parser.addArgument(args[i * 2], args[i * 2 + 1]) for i in [0...args.length / 2]

module.exports = parser
