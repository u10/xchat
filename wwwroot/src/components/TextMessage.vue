<template>
  <pre v-once :class="'card-panel ' + (model.local?'local-msg':'')" @click="copyText">{{model.msg}}</pre>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      model: Object
    },
    methods: {
      copyText () {
        document.execCommand('copy')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
