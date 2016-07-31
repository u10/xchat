socketIo = require 'socket.io'

module.exports = (options) ->
  ms = socketIo.listen(options.server)
  getUserList = -> (val.user for key, val of ms.sockets.connected)

  broadcastUserList = ->
    ms.emit('broadcast', getUserList())

  sendTo = (socket, data) ->
    data.user = socket.user
    room = data.room
    if room
      # 定向消息
      ms.to(room).emit('msg', data)
    else
      # 广播消息
      data.broadcast = true
      ms.emit('msg', data)
    return

  ms.on 'connect', (socket) ->
    console.log 'connected.' + socket.id

    socket
    .on 'login', (user = {}) ->
      socket.user = user
      user.id = socket.id
      broadcastUserList()
      socket.emit 'login', user
      return
    .on 'join', (data = {}) ->
      room = data.room
      return unless room
      socket.join room
      ms.to(room).emit('sys', 'new user')
      return
    .on 'leave', (data = {}) ->
      room = data.room
      return unless room
      ms.to(room).emit('sys', 'user leave')
      setTimeout (->
        socket.leave room
        return
      ), 0
      return
    .on 'msg', (data = {}) ->
      sendTo socket, data
      return
    .on 'list', ->
      console.log socket.rooms
      return
    .on 'file', (data = {}) ->
      sendTo socket,
        room: data.room
        type: 'LinkMessage'
        href: "download/#{socket.id}/#{data.fid}"
        msg: "#{decodeURIComponent(data.name)}(#{parseInt(data.size/1024/10.24)/100||'<0.01'}MB)"
      return
    .on 'disconnect', ->
      broadcastUserList()
      console.log 'disconnected.'
      return
    return
  ms
