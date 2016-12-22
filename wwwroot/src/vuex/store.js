import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

// const user = {
//   name: 'test'
// }

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      name: window.localStorage.getItem('user.name') || `guest-${parseInt(Math.random() * 1000)}`,
      list: []
    },
    messages: [
      // {
      //   date: new Date().getTime(),
      //   broadcast: true,
      //   user: user,
      //   msg: '这是一个广播',
      //   type: 'TextMessage'
      // },
      // {
      //   date: new Date().getTime(),
      //   local: true,
      //   user: user,
      //   msg: '自己发出的消息',
      //   type: 'TextMessage'
      // },
      // {
      //   date: new Date().getTime(),
      //   broadcast: true,
      //   user: user,
      //   href: '#',
      //   msg: '这是一个连接',
      //   type: 'LinkMessage'
      // },
      // {
      //   date: new Date().getTime(),
      //   local: true,
      //   user: user,
      //   type: 'ProgressMessage',
      //   msg: '进度消息',
      //   progress: 90
      // },
      // {
      //   date: new Date().getTime(),
      //   local: true,
      //   user: user,
      //   type: 'ErrorMessage',
      //   msg: '这是一个错误消息'
      // }
    ],
    room: {}
  },
  getters: getters,
  actions: actions,
  mutations: {
    [types.UPDATE_CONNECT_ID] (state, id) {
      state.user.id = id
    },
    [types.SET_LOGIN_DATA] (state, data) {},
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
