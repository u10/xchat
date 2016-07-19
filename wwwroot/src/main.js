import 'pure-css'
import './lib/polyfills'
import Vue from 'vue'
import Chat from './Chat'
import store from './vuex/store'
import './i18n'

/* eslint-disable no-new */
window.vm = new Vue({
  el: 'body',
  store,
  components: {Chat}
})

let lang = /(?:\?|&)lang=(\w+)(?:$|&)/.exec(window.location.search)
if (lang) {
  lang = lang[1]
} else {
  lang = 'chs'
}

Vue.config.lang = lang
