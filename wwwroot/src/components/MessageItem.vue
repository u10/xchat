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
        <template v-if="isText">
          <pre class="card-panel {{model.local?'local-msg':''}}">{{model.msg}}</pre>
        </template>
        <template v-if="isLink">
          <div class="card-panel">
            <a :href="model.href" target="_blank">{{model.msg}}</a>
          </div>
        </template>
        <template v-if="isProgress">
          <div class="card-panel progress">{{model.msg}} {{model.progress}}%</div>
        </template>
        <template v-if="isError">
          <div class="card-panel error">{{model.msg}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
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
    computed: {
      isText: function () {
        return this.model.type === undefined
      },
      isError: function () {
        return this.model.type === 'error'
      },
      isLink: function () {
        return this.model.type === 'link'
      },
      isProgress: function () {
        return this.model.type === 'progress'
      }
    },
    methods: {
      copyText: function (event) {
        document.execCommand('copy')
      }
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

  pre {
    white-space: pre-line;
  }
</style>
