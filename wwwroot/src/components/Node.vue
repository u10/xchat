<template>
  <g>
    <circle :cx="x" :cy="y" :r="cr / 4.5" :style="node.style || 'fill: grey'"></circle>
    <text :x="x" :y="y" style="fill: black">{{node.text}}</text>
    <template v-for="item in node.children">
      <node :node="item" :cx="x" :cy="y" :ca="$index * 2 * Math.PI / node.children.length" :cr="cr / 2" :m="node.m"></node>
    </template>
  </g>
</template>

<script>
  export default {
    name: 'node',
    props: {
      node: Object,
      cx: Number,
      cy: Number,
      ca: Number,
      cr: Number,
      m: Number
    },
    computed: {
      x: function () {
        if (this.ca < 0) {
          return this.cx
        } else {
          return Math.sin(this.ca + this.m) * this.cr + this.cx
        }
      },
      y: function () {
        if (this.ca < 0) {
          return this.cy
        } else {
          return Math.cos(this.ca + this.m) * this.cr + this.cy
        }
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
