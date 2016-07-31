<template>
  <div class="pure-g">
    <div class="pure-u-1 {{model.local?'local':''}}">
      <div class="l-box">
        <div class="msg-sender">
          [{{model.user.id===user.id?$t('UI.Me'):model.user.name}}{{model.broadcast?'('+$t('UI.Broadcast')+')':''}}]
          <span class="msg-time">{{* new Date().format('yyyy-MM-dd hh:mm:ss')}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="pure-g">
    <div class="pure-u-1">
      <div class="l-box">
        <component :is="model.type" :model="model"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import TextMessage from './TextMessage'
  import ErrorMessage from './ErrorMessage'
  import LinkMessage from './LinkMessage'
  import ProgressMessage from './ProgressMessage'
  import {user} from '../vuex/getters'
  export default {
    vuex: {
      getters: {
        user
      }
    },
    props: {
      model: Object
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

  .card-panel {
    border-radius: 4px;
    color: white;
    background: lightgreen;
    padding: 0.4em;
    margin: 0.2em;
  }

  .error {
    color: white;
    background: lightcoral;
  }

  .progress {
    color: white;
    background: lightblue;
  }

  .local {
    text-align: right;
  }

  .msg-sender {
    color: grey;
  }

  .msg-time {
    font-size: 40%;
  }

  .local-msg {
    color: dimgray;
    background: #eee;
  }
</style>
