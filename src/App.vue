<template>
  <div id="app">
<!--    <vue-element-loading :active="isLoading" :is-full-screen="true"/>-->
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
//import VueElementLoading from 'vue-element-loading'
import {mapGetters} from "vuex";
export default {
  name: 'App',
  computed:{
    ...mapGetters(["isLoading"]),
  },
  components: {
    //VueElementLoading,
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
