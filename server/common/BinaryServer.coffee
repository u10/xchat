_ = require 'lodash'
UUID = require 'uuid-js'
BinaryServer = require('binaryjs').BinaryServer

module.exports = (messageServer, options) ->
  peers = {}
  # 二进制数据传输服务
  new BinaryServer(_.extend server: messageServer.httpServer, options)
  .on 'connection', (client) ->
    # 连接请求进入
    client.on 'stream', (stream, meta) ->
      # 收到数据流
      tid = meta.tid
      peer = peers[tid]
      delete peers[tid]

      unless peer
        client.close()
        return
      clearTimeout(peer.timeout)

      peer.onStart(meta)
      tx = 0
      stream.on 'data', (data) ->
        # 传输进度返回
        tx += data.length
        stream.write({tx: tx / meta.size})
        return
      stream.on 'error', ->
        peer.onError()
        return
      # 管道连接到文件的发送者
      peer.onPipe(stream)
      return
    return

  connect: (config)->
    id = UUID.create().hex
    peers[id] = config
    config.timeout = setTimeout ->
      delete peers[id]
      config.onTimeout()
      return
    , config.timeout || 5000
    messageServer.to(config.room).emit('file', fid: config.fileId, tid: id)
    return
