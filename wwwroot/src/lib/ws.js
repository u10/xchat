import io from 'socket.io-client'
import {BinaryClient} from 'binaryjs-client'

import {APPEND_MESSAGE, UPDATE_CONNECT_ID, UPDATE_USER_LIST} from '../vuex/mutation-types'
import store from '../vuex/store'
import {t as $t} from 'vue'

const appName = `${window.location.pathname}`.replace(/\/$/, '')

const ws = io(`ws://${window.location.host}`, {
  path: `${appName}/socket.io`,
  autoConnect: false
})

const files = {}

ws.on('connect', () => {
  store.commit(UPDATE_CONNECT_ID, ws.id)
}).on('disconnect', () => {
  store.commit(UPDATE_USER_LIST, [])
}).on('broadcast', (data) => {
  store.commit(UPDATE_USER_LIST, data)
}).on('msg', (data) => {
  store.commit(APPEND_MESSAGE, data)
}).on('file', (data) => {
  const file = files[data.fid]
  if (!file || file.size === 0) {
    return
  }
  const send = (callback) => {
    const client = new BinaryClient(`ws://${window.location.host}${appName}/binary`)
    client.on('open', (stream) => {
      let chunkSize, offset
      stream = client.createStream({
        name: encodeURIComponent(file.name),
        size: file.size,
        type: file.type,
        tid: data.tid
      })
      stream.on('data', (data) => {
        data.name = file.name
        if (typeof callback === 'function') {
          callback(data)
        }
      })
      offset = 0
      chunkSize = 128 * 1024
      const fun = (e) => {
        stream.write(e.target.result)
        offset += chunkSize
        if (offset < file.size) {
          return seek()
        } else {
          return stream.end()
        }
      }
      const seek = () => {
        const blob = file.slice(offset, offset + chunkSize)
        const reader = new window.FileReader()
        reader.onloadend = fun
        reader.readAsArrayBuffer(blob)
      }
      return seek()
    })
  }
  const progress = {
    local: true,
    type: 'ProgressMessage',
    msg: `${$t('UI.SendingFile')}: ${file.name}`,
    progress: 0,
    date: new Date().getTime()
  }
  store.commit(APPEND_MESSAGE, progress)
  send((data) => {
    progress.progress = parseInt(data.tx * 100)
  })
})

export default {
  login (user) {
    if (ws.connected) {
      ws.emit('login', user)
    } else {
      ws.once('connect', () => {
        ws.emit('login', user)
      })
      ws.connect()
    }
  },
  logout () {
    ws.disconnect()
  },
  sendFile (room, file) {
    var date = new Date().getTime()
    store.commit(APPEND_MESSAGE, {
      local: true,
      msg: `${$t('UI.SendFile')}: ${file.name}(${parseInt(file.size / 1024 / 10.24) / 100 || '<0.01'} MB)`,
      date: date
    })
    const fid = new Date().getTime()
    files[fid] = file
    ws.emit('file', {
      fid: fid,
      room: room.id,
      name: file.name,
      size: file.size,
      date: date
    })
  },
  sendText (room, msg) {
    var date = new Date().getTime()
    store.commit(APPEND_MESSAGE, {
      local: true,
      msg: msg,
      date: date
    })
    ws.emit('msg', {
      room: room.id,
      msg: msg,
      date: date
    })
  }
}
