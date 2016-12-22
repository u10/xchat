<template>
  <div v-once :class="'card-panel error ' + (model.local?'local-msg':'')">{{model.msg}}</div>
</template>

<script type="text/ecmascript-6">
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

