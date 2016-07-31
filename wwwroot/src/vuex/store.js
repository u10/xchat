import Vue from 'vue'
import Vuex from 'vuex'
import { UPDATE_USER_LIST, CLEAR_MESSAGE, SET_SEND_TO, APPEND_MESSAGE } from './mutation-types'

Vue.use(Vuex)

const user = {
  id: new Date().getTime() + '',
  name: window.localStorage.getItem('user.name') || `guest-${parseInt(Math.random() * 1000)}`,
  password: '123456'
}

const state = {
  user: user,
  userList: [],
  messageList: [
    // {
    //   broadcast: true,
    //   user: {
    //     name: 'test'
    //   },
    //   msg: '这是一个广播'
    // },
    // {
    //   local: true,
    //   user: user,
    //   msg: '自己发出的消息'
    // },
    // {
    //   broadcast: true,
    //   user: {
    //     name: 'test2'
    //   },
    //   type: 'link',
    //   href: '#',
    //   msg: '这是一个连接'
    // },
    // {
    //   local: true,
    //   user: user,
    //   type: 'progress',
    //   msg: '进度消息',
    //   progress: 90
    // },
    // {
    //   local: true,
    //   user: user,
    //   type: 'error',
    //   msg: '这是一个错误消息'
    // }
  ],
  room: {}
}

const mutations = {
  [UPDATE_USER_LIST] (state, data) {
    state.userList = data
  },
  [CLEAR_MESSAGE] (state) {
    state.messageList = []
  },
  [APPEND_MESSAGE] (state, data) {
    data.user = data.user || state.user
    data.type = data.type || 'TextMessage'
    state.messageList.push(data)
  },
  [SET_SEND_TO] (state, data) {
    state.room = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
