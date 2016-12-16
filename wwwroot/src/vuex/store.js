import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import * as getters from './getters'
import * as actions from './actions'

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
  getters: getters,
  actions: actions,
  mutations: {
    [types.SET_LOGIN_DATA] (state, data) {
      state.user.id = data.id
      if (!data.id) {
        state.user.list = []
        state.room = {}
      }
    },
    [types.UPDATE_USER_LIST] (state, data) {
      state.user.list = data
    },
    [types.CLEAR_MESSAGE] (state) {
      state.messages = []
    },
    [types.APPEND_MESSAGE] (state, data) {
      data.user = data.user || state.user
      data.type = data.type || 'TextMessage'
      state.messages.push(data)
    },
    [types.SET_SEND_TO] (state, data) {
      state.room = data
    }
  }
})
