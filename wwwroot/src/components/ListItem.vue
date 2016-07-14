<template>
  <div @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      model: Object
    },
    computed: {},
    methods: {
      onItemClick: function () {
        this.$dispatch('click-item', this.model)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
