<template>
  <BasicScene msg="Welcome to Your Vue.js App"/>
</template>

<script>
import BasicScene from './components/basicScene.vue'

export default {
  name: 'App',
  components: {
    BasicScene
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: black;
}
</style>
