<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/common.scss';
  #app {
    width: 100%;
    min-height: 100vh;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: $color-page-background;
  }
</style>
