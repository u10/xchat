<template>
  <div class="pure-form pure-g">
    <div class="pure-u-1">
      <div class="l-box">
        <input title="User Name" :placeholder="$t('UI.UserName')" class="pure-u-1" v-model="model.name" success-msg="Success" error-msg="Error"/>
      </div>
      <div class="l-box">
        <input title="User Password" :placeholder="$t('UI.UserPassword')" class="pure-u-1" v-model="password" type="password" success-msg="Success"
               error-msg="Error"/>
      </div>
      <div class="l-box">
        <button class="pure-u-1 pure-button pure-button-primary" @click="login">{{$t('UI.Login')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      model: Object
    },
    data: function () {
      return {
        password: ''
      }
    },
    methods: {
      login () {
        this.$emit('action', 'login',
          {
            name: this.model.name,
            password: this.password
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
