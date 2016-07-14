<template>
  <div @drop="drop"
       @dragover="dragover"
       @dragenter="dragenter">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      model: Object
    },
    methods: {
      dragenter (evevt) {
        const transfer = evevt.dataTransfer
        if (transfer.types.indexOf('Files') !== -1) {
          evevt.stopPropagation()
          evevt.preventDefault()
        }
      },
      dragover (evevt) {
        const transfer = evevt.dataTransfer
        if (transfer.types.indexOf('Files') !== -1) {
          evevt.stopPropagation()
          evevt.preventDefault()
        }
      },
      drop (evevt) {
        const transfer = evevt.dataTransfer
        if (transfer.types.indexOf('Files') !== -1) {
          evevt.stopPropagation()
          evevt.preventDefault()
          let files = []
          for (let i = 0, n = transfer.files.length; i < n; i++) {
            let webkitGetAsEntry
            const item = transfer.items[i]
            if (typeof item.webkitGetAsEntry === 'function') {
              if ((webkitGetAsEntry = item.webkitGetAsEntry(item)) && webkitGetAsEntry.isDirectory) {
                continue
              }
            }
            files.push(transfer.files[i])
          }
          this.$dispatch('drop-files', files)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
