import * as types from './mutation-types'

export const setLoginData = ({commit}, data) => {
  commit(types.SET_LOGIN_DATA, data)
}

export const clearMessage = ({commit}) => {
  commit(types.CLEAR_MESSAGE)
}

export const clearUserList = ({commit}) => {
  commit(types.UPDATE_USER_LIST, [])
}

export const appendMessage = ({commit}, data) => {
  commit(types.APPEND_MESSAGE, data)
}

export const setSendTo = ({commit}, data) => {
  commit(types.SET_SEND_TO, data)
}

