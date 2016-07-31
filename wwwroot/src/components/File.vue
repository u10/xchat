<template>
  <div @click="onClick"><slot></slot></div>
</template>

<script>
  import $ from 'jquery'
  export default {
    ready: function () {
      const self = this
      const $file = $('<input type="file" />').on('change', function () {
        self.$dispatch('change', $file[0].files)
        $file.val('')
      })
      this.$file = $file
    },
    props: {
      model: Object
    },
    computed: {},
    methods: {
      onClick: function () {
        this.$file.trigger('click')
      }
    }
  }
</script>

<style></style>
