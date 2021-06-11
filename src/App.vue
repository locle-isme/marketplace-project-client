<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <div class="container" style="padding-top: 3.2rem">
      <router-view></router-view>
    </div>
    <VFooter></VFooter>
  </div>
</template>

<script>
import HeaderComponent from "./components/Header/HeaderComponent";
import VFooter from './components/VFooter'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    VFooter
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgba(191, 190, 190, 0.1) !important;

}

@media (max-width: 900px) {
  #app {
    margin-top: 60px;
  }
}


</style>
