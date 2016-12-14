<template>
  <div v-once :class="'card-panel msg-link ' + (model.local?'local-msg':'')">
    <a v-once :href="model.href" target="_blank">{{model.msg}}</a>
  </div>
</template>

<script>
  export default {
    props: {
      model: Object
    }
  }
</script>

<style scoped>
  .msg-link {
    background: gold;
    padding: 12px;
  }
  .msg-link a {
    color: red;
    font-style: italic;
  }
</style>

