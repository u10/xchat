<template>
  <div class="card-panel">
    <a :href="model.href" target="_blank">{{model.msg}}</a>
  </div>
</template>

<script>
  export default {
    props: {
      model: Object
    }
  }
</script>

<style></style>

