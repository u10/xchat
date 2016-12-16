<template>
  <div @click="onClick"><slot></slot></div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  export default {
    mounted: function () {
      const self = this
      const $file = $('<input type="file" />').on('change', function () {
        self.$emit('change', $file[0].files)
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
