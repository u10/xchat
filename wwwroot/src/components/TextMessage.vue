<template>
  <pre class="card-panel {{model.local?'local-msg':''}}">{{model.msg}}</pre>
</template>

<script>
  export default {
    props: {
      model: Object
    },
    methods: {
      copyText: function (event) {
        document.execCommand('copy')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  pre {
    white-space: pre-line;
  }
</style>
