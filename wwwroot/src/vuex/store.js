import Vue from 'vue'
import Vuex from 'vuex'
import { SET_LOGIN_DATA, UPDATE_USER_LIST, CLEAR_MESSAGE, SET_SEND_TO, APPEND_MESSAGE } from './mutation-types'
import {user, room, messages} from './getters'
import {setLoginData, setSendTo, clearMessage, appendMessage, clearUserList} from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      name: window.localStorage.getItem('user.name') || `guest-${parseInt(Math.random() * 1000)}`,
      list: []
    },
    messages: [
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
  },
  getters: {
    user,
    room,
    messages
  },
  actions: {
    setLoginData,
    setSendTo,
    clearMessage,
    appendMessage,
    clearUserList
  },
  mutations: {
    [SET_LOGIN_DATA] (state, data) {
      state.user.id = data.id
      if (!data.id) {
        state.user.list = []
        state.room = {}
      }
    },
    [UPDATE_USER_LIST] (state, data) {
      state.user.list = data
    },
    [CLEAR_MESSAGE] (state) {
      state.messages = []
    },
    [APPEND_MESSAGE] (state, data) {
      data.user = data.user || state.user
      data.type = data.type || 'TextMessage'
      state.messages.push(data)
    },
    [SET_SEND_TO] (state, data) {
      state.room = data
    }
  }
})
