import * as types from './mutation-types'

export const clearMessage = ({dispatch}) => {
  dispatch(types.CLEAR_MESSAGE)
}

export const clearUserList = ({dispatch}) => {
  dispatch(types.UPDATE_USER_LIST, [])
}

export const appendMessage = ({dispatch}, data) => {
  dispatch(types.APPEND_MESSAGE, data)
}

export const setSendTo = ({dispatch}, data) => {
  dispatch(types.SET_SEND_TO, data)
}

