<template>
  <div class="flex v-flex fill">
    <!--<div>Menu</div>-->
    <div class="flex-box">
      <div class="flex-ctrl">
        <div class="flex-content">
          <div id="top" class="split">
            <div id="top-left" class="split split-horizontal">
              <div v-if="isLogin" transition="vs-fade" class="flex-box v-flex">
                <div class="pure-form pure-g">
                  <div class="pure-u-1">
                    <div class="l-box">
                      <button class="pure-u-1-1 pure-button button-error" @click="logout">
                        {{$t('UI.Logout')}}({{user.name}})
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex-ctrl margin-s">
                  <div class="flex-content pure-form pure-g">
                    <div class="pure-u-1">
                      <div class="l-box">
                        <div class="pure-u-1 user-list">
                          <template v-for="item in userList">
                            <li @click="selectUser(item)">{{item.name}}{{item.id===user.id?'('+$t('UI.Me')+')':''}}</li>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="pure-form pure-g" transition="vs-fade">
                <div class="pure-u-1">
                  <div class="l-box">
                    <input class="pure-u-1" v-model="user.name" success-msg="Success" error-msg="Error"/>
                  </div>
                  <div class="l-box">
                    <input class="pure-u-1" v-model="user.password" type="password" success-msg="Success"
                           error-msg="Error"/>
                  </div>
                  <div class="l-box">
                    <button class="pure-u-1 pure-button pure-button-primary" @click="login">{{$t('UI.Login')}}
                    </button>
                  </div>
                </div>
              </div>
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
                        <div v-for="item in messageList" transition="vs-fade">
                          <message-item :model="item"></message-item>
                        </div>
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
                      <label class="pure-u-1">{{$t('UI.SendTo')}}</label>
                    </div>
                  </div>
                  <div class="pure-u-3-5">
                    <div class="l-box">
                      <input class="pure-u-1" type="text" readonly v-model="roomName"/>
                    </div>
                  </div>
                  <div class="pure-u-1-5">
                    <div class="l-box">
                      <button class="pure-u-1 pure-button button-secondary" @click="setBroadcast"
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
                      <textarea class="pure-input-1 text-message" v-model="textMessage"
                                placeholder="{{$t('UI.DefaultText')}}"
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

<script>
  import $ from 'jquery'
  import MessageItem from './components/MessageItem'
  import DropBox from './components/DropBox'
  import File from './components/File'

  import {setSendTo, clearMessage, appendMessage, clearUserList} from './vuex/actions'
  import {user, room, userList, messageList} from './vuex/getters'
  import Split from 'split.js'
  import ws from './lib/ws'

  export default {
    vuex: {
      getters: {
        user,
        room,
        userList,
        messageList
      },
      actions: {
        setSendTo,
        clearMessage,
        appendMessage,
        clearUserList
      }
    },
    data () {
      return {
        textMessage: ''
      }
    },
    computed: {
      roomName () {
        if (this.room.name) {
          return this.room.name
        } else {
          return this.$t('UI.EveryOne')
        }
      },
      isLogin () {
        return this.userList.length > 0
      }
    },
    methods: {
      login () {
        const user = this.user
        ws.login(user, function (id) {
          user.id = id
        })
      },
      logout () {
        ws.logout()
        this.clearUserList()
        this.setSendTo({})
      },
      setBroadcast () {
        this.setSendTo({})
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
          msg: this.$t('Error.FileTypeNotSupported')
        })
      },
      selectUser (user) {
        this.setSendTo(user)
      }
    },
    watch: {
      'user.name': function (name) {
        window.localStorage.setItem('user.name', name)
      },
      messageList: function () {
        $('.msg-scroll').scrollTop(9999)
      }
    },
    ready () {
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
      File
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
    background-color: transparent;

    background-repeat: no-repeat;
    background-position: 50%;
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

  .vs-fade-transition {
    transition: opacity 1.5s ease;
    opacity: 100;
  }

  .vs-fade-enter {
    opacity: 0;
  }

  .vs-fade-leave {
    display: none;
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
