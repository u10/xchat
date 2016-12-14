<template>
  <div class="flex-box v-flex">
    <div class="pure-form pure-g">
      <div class="pure-u-1">
        <div class="l-box">
          <button class="pure-u-1-1 pure-button button-error" @click="logout">
            {{$t('UI.Logout')}}({{model.name}})
          </button>
        </div>
      </div>
    </div>
    <div class="flex-ctrl margin-s">
      <div class="flex-content pure-form pure-g">
        <div class="pure-u-1">
          <div class="l-box">
            <div class="pure-u-1 user-list">
              <template v-for="item in model.list">
                <li @click="selectUser(item)">{{item.name}}{{item.id===model.id?'('+$t('UI.Me')+')':''}}</li>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      model: Object
    },
    methods: {
      logout () {
        this.$emit('action', 'logout')
      },
      selectUser (item) {
        this.$emit('action', 'select-user', item)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
