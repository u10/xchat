<template>
  <div v-once :class="'card-panel ' + (model.local?'local-msg':'')">{{model.msg}}</div>
</template>

<script>
  export default {
    props: {
      model: Object
    }
  }
</script>

<style scoped>
  .error {
    color: white;
    background: lightcoral;
  }
</style>

