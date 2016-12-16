<template>
  <div @drop="drop"
       @dragover="dragover"
       @dragenter="dragenter">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      model: Object
    },
    methods: {
      dragenter (event) {
        const transfer = event.dataTransfer
        if (transfer.types.indexOf('Files') !== -1) {
          event.stopPropagation()
          event.preventDefault()
        }
      },
      dragover (event) {
        const transfer = event.dataTransfer
        if (transfer.types.indexOf('Files') !== -1) {
          event.stopPropagation()
          event.preventDefault()
        }
      },
      drop (event) {
        const transfer = event.dataTransfer
        if (transfer.types.indexOf('Files') !== -1) {
          event.stopPropagation()
          event.preventDefault()
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
          this.$emit('drop-files', files)
        }
      }
    }
  }
</script>

<style></style>
