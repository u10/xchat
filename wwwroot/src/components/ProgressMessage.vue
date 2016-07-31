<template>
  <div class="card-panel progress">{{model.msg}} {{model.progress}}%</div>
</template>

<script>
  export default {
    props: {
      model: Object
    }
  }
</script>

<style></style>
