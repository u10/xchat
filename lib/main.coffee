fs = require 'fs'
_ = require 'lodash'
http = require 'http'
express = require('express')
favicon = require('serve-favicon')
paths = require('./common/paths')(__dirname + '/..')
BinaryServer = require './common/BinaryServer'
MeServerServer = require './common/MessageServer'
DownloadRouter = require './common/DownloadRouter'

args = require('./common/parser').parseArgs()

rest = express()
server = http.createServer(rest)

rest.use favicon(paths.wwwroot('static', 'img', 'favicon.ico'))
rest.use express.static(paths.wwwroot())

# 通信用websocket
ms = MeServerServer(server: server)

# 二进制数据传输服务
bs = BinaryServer(ms, path: '/binary')

# 配置子文件下载路由
rest.use '/download', DownloadRouter(bs)

server.listen args.port, args.addr, (err) ->
  if err
    console.log(err)
    return

  console.log("XChat at http://#{args.addr}:#{args.port}")
