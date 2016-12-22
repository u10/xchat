<template>
  <div>
    <div class="pure-g">
      <div v-once class="pure-u-1">
        <div :class="'l-box ' + (model.local?'local':'remote')">
          <div class="msg-sender">
            [{{model.user.id===user.id?$t('UI.Me'):model.user.name}}{{model.broadcast?'('+$t('UI.Broadcast')+')':''}}]
            <span class="msg-time">{{format(model.date)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pure-g">
      <div class="pure-u-1">
        <div :class="'l-box msg-box ' + (model.local?'local':'remote')">
          <component :is="msgComponent" :model="model"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import TextMessage from './TextMessage'
  import ErrorMessage from './ErrorMessage'
  import LinkMessage from './LinkMessage'
  import ProgressMessage from './ProgressMessage'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      model: Object,
      components: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      msgComponent () {
        return this.components[this.model.type] || this.$options.components[this.model.type] || {
          render (h) {
            return h('div', 'Unknown Message Type')
          }
        }
      }
    },
    methods: {
      format (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    components: {
      TextMessage,
      ErrorMessage,
      LinkMessage,
      ProgressMessage
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .l-box {
    padding: 0.2em;
  }

  .msg-sender {
    color: grey;
  }

  .msg-time {
    font-size: 40%;
  }

  .msg-box {
    max-width: 90%;
  }

  .local {
    float: right;
  }

  .remote {
    float: left;
  }

  .card-panel {
    border-radius: 8px;
    color: black;
    background: white;
    padding: 0.4em;
    margin: 0.2em;
  }

  .local-msg {
    background: lightgreen;
  }
</style>
