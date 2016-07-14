import Vue from 'vue'
import VueI18n from 'vue-i18n'
import LANG_EN from './lang/en'
import LANG_CHS from './lang/chs'

Vue.use(VueI18n)
Vue.locale('en', LANG_EN)
Vue.locale('chs', LANG_CHS)
