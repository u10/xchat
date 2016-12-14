fs = require 'fs'
http = require 'http'
express = require('express')
favicon = require('serve-favicon')
paths = require('./common/paths')(__dirname + '/..')
BinaryServer = require './common/BinaryServer'
MessageServer = require './common/MessageServer'
DownloadRouter = require './common/DownloadRouter'

args = require('./common/parser').parseArgs()
args.name = '/' + args.name if args.name

rest = express()
server = http.createServer(rest)

rest.use "#{args.name}/", favicon(paths.wwwroot('static', 'img', 'favicon.ico'))
rest.use "#{args.name}/", express.static(paths.wwwroot())

# 通信用websocket
ms = MessageServer(server: server, appName: args.name)

# 二进制数据传输服务
bs = BinaryServer(ms, path: "#{args.name}/binary")

# 配置子文件下载路由
rest.use "#{args.name}/download", DownloadRouter(bs)

server.listen args.port, args.addr, (err) ->
  if err
    console.log(err)
    return
  console.log("XChat at http://#{args.addr}:#{args.port}#{args.name}")
  return
