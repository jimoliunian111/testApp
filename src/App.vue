<template>
  <div id="app">
    <div>起始页App</div>
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
