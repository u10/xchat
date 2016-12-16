import 'pure-css'
import Vue from 'vue'
import Chat from './Chat'
import store from './vuex/store'
import './i18n'

/* eslint-disable no-new */
new Vue({
  el: 'app',
  store,
  render: h => h(Chat)
})

let lang = /(?:\?|&)lang=(\w+)(?:$|&)/.exec(window.location.search)
if (lang) {
  lang = lang[1]
} else {
  lang = 'chs'
}

Vue.config.lang = lang
