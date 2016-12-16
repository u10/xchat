<template>
  <div :class="'card-panel progress ' + (model.local?'local-msg':'')">{{model.msg}} {{model.progress}}%</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      model: Object
    }
  }
</script>

<style scoped>
  .progress {
    color: white;
    background: lightblue;
  }
</style>
