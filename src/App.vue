<template>
  <div id="app">
    <VHeader></VHeader>
    <div class="container" style="padding-top: 3.2rem">
      <router-view></router-view>
    </div>
    <VFooter></VFooter>
  </div>
</template>

<script>
import VHeader from './components/VHeader'
import VFooter from "@/components/VFooter";
export default {
  name: 'App',
  components: {
    VHeader,
    VFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgba(191, 190, 190, 0.1) !important;
  margin-top: 60px;
}


</style>
