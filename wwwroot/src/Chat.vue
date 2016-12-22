<template>
  <div class="flex v-flex fill">
    <!--<div>Menu</div>-->
    <div class="flex-box">
      <div class="flex-ctrl">
        <div class="flex-content">
          <div id="top" class="split">
            <div id="top-left" class="split split-horizontal">
              <transition name="vs-fade" mode="out-in">
                <component :is="left" :model="user" @action="onAction"></component>
              </transition>
            </div>
            <div id="top-right" class="split split-horizontal">
              <div class="flex-box v-flex">
                <div class="pure-form pure-g">
                  <div class="pure-u-1">
                    <div class="l-box">
                      <button class="pure-u-1 pure-button button-secondary" @click="clearMessage">
                        {{$t('UI.ClearMessage')}}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex-ctrl">
                  <div class="flex-content pure-form pure-g msg-scroll">
                    <div class="pure-u-1">
                      <div class="pure-u-1 message-list">
                        <transition-group name="vs-fade" tag="div">
                          <div v-for="item in messages" :key="item.date">
                            <message-item :model="item"></message-item>
                          </div>
                        </transition-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="bottom" class="split">
            <div class="flex v-flex fill">
              <div class="pure-form">
                <div class="pure-g">
                  <div class="pure-u-1-5">
                    <div class="l-box">
                      <label for="sendTo" class="pure-u-1">{{$t('UI.SendTo')}}</label>
                    </div>
                  </div>
                  <div class="pure-u-3-5">
                    <div class="l-box">
                      <input id="sendTo" class="pure-u-1" type="text" readonly v-model="roomName"/>
                    </div>
                  </div>
                  <div class="pure-u-1-5">
                    <div class="l-box">
                      <button class="pure-u-1 pure-button button-secondary" @click="onAction('set-broadcast')"
                              :disabled="!isLogin">
                        {{$t('UI.Broadcast')}}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <div class="flex-ctrl margin-s">
                  <div class="flex-content pure-form pure-g">
                    <drop-box class="fill" @drop-files="dropFiles">
                      <textarea title="Message" class="pure-input-1 text-message" v-model="textMessage"
                                :placeholder="$t('UI.DefaultText')"
                                :disabled="!isLogin"></textarea>
                    </drop-box>
                  </div>
                </div>
              </div>
              <div class="pure-form">
                <div class="pure-g">
                  <div class="pure-u-2-5 pure-u-md-1-5">
                    <div class="l-box">
                      <file class="pure-u-1" @change="sendFile">
                        <button class="pure-u-1 pure-button button-secondary" :disabled="!isLogin">
                          {{$t('UI.SendFile')}}
                        </button>
                      </file>
                    </div>
                  </div>
                  <div class="pure-u-3-5 pure-u-md-4-5">
                    <div class="l-box">
                      <button class="pure-u-1 pure-button button-secondary" @click="sendText"
                              :disabled="!isLogin">
                        {{$t('UI.SendText')}}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div>State</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import MessageItem from './components/MessageItem'
  import DropBox from './components/DropBox'
  import File from './components/File'
  import Login from './components/Login'
  import UserList from './components/UserList'

  // noinspection JSFileReferences
  import Split from 'split.js'
  import ws from './lib/ws'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        textMessage: ''
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'room',
        'messages'
      ]),
      left () {
        return this.isLogin ? 'UserList' : 'Login'
      },
      roomName () {
        if (this.room.name) {
          return this.room.name
        } else {
          return this.$t('UI.EveryOne')
        }
      },
      isLogin () {
        for (let user of this.user.list) {
          if (user.id === this.user.id) {
            return true
          }
        }
        return false
      }
    },
    methods: {
      ...mapActions([
        'setSendTo',
        'clearMessage',
        'appendMessage'
      ]),
      onAction (action, data) {
        switch (action) {
          case 'login':
            ws.login(data)
            break
          case 'logout':
            ws.logout()
            break
          case 'select-user':
            this.setSendTo(data)
            break
          case 'set-broadcast':
            this.setSendTo({})
            break
        }
      },
      sendText () {
        ws.sendText(this.room, this.textMessage)
      },
      sendFile (files) {
        ws.sendFile(this.room, files[0])
      },
      dropFiles (files) {
        if (files.length > 0) {
          const room = this.room
          files.forEach(function (file) {
            ws.sendFile(room, file)
          })
          return
        }
        this.appendMessage({
          local: true,
          type: 'ErrorMessage',
          msg: this.$t('Error.FileTypeNotSupported'),
          date: new Date().getTime()
        })
      }
    },
    watch: {
      'user.name': function (name) {
        window.localStorage.setItem('user.name', name)
      },
      messages: function () {
        $('.msg-scroll').animate({scrollTop: Number.MAX_VALUE}, 500)
      }
    },
    mounted () {
      Split(['#top', '#bottom'], {
        sizes: [70, 30],
        direction: 'vertical',
        gutterSize: 6,
        cursor: 'row-resize',
        minSize: 200
      })
      Split(['#top-left', '#top-right'], {
        sizes: [25, 75],
        gutterSize: 6,
        cursor: 'col-resize',
        minSize: 150
      })
    },
    components: {
      MessageItem,
      DropBox,
      File,
      Login,
      UserList
    }
  }
</script>

<style>
  html, body {
    height: 100%;
  }

  body {
    padding: 8px;
    background-color: #F6F6F6;
    box-sizing: border-box;
  }

  textarea {
    resize: none;
    padding: 0;
    margin: 0;
  }

  .split {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    overflow-y: auto;
    overflow-x: hidden;
  }

  .content {
    border: 1px solid #C0C0C0;
    box-shadow: inset 0 1px 2px #e4e4e4;
    background-color: #fff;
    height: 100%;
  }

  .gutter {
    background: transparent no-repeat 50%;
  }

  .gutter.gutter-horizontal {
    cursor: col-resize;
    background-image: url('assets/img/grips/vertical.png');
  }

  .gutter.gutter-vertical {
    cursor: row-resize;
    background-image: url('assets/img/grips/horizontal.png');
  }

  .split.split-horizontal, .gutter.gutter-horizontal {
    height: 100%;
    float: left;
  }

  .flex {
    display: -webkit-flex;
  }

  .v-flex {
    flex-direction: column;
  }

  .flex-box {
    display: -webkit-flex;
    height: 100%;
  }

  .flex-box .flex-ctrl {
    -webkit-flex: 1;
    position: relative;
  }

  .flex-ctrl .flex-content {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: auto;
  }

  .margin-s {
    margin: 3px;
  }

  .fill {
    width: 100%;
    height: 100%;
  }

  .vs-fade-enter {
    opacity: 0;
  }

  .vs-fade-enter-active {
    transition: all .35s ease;
  }

  .vs-fade-leave-active {
    transition: all .35s ease;
    opacity: 0;
  }

  .l-box {
    padding: 0.2em;
  }

  .pure-button {
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }

  .button-success {
    background: rgb(28, 184, 65); /* this is a green */
  }

  .button-error {
    background: rgb(202, 60, 60); /* this is a maroon */
  }

  .button-warning {
    background: rgb(223, 117, 20); /* this is an orange */
  }

  .button-secondary {
    background: rgb(66, 184, 221); /* this is a light blue */
  }

  .text-message {
    height: 100%;
  }
</style>
