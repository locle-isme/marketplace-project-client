<template>
  <div id="app">
    <!--    <vue-element-loading :active="isLoading" :is-full-screen="true"/>-->
    <HeaderComponent></HeaderComponent>
    <div class="container" style="padding-top: 3.2rem; padding-bottom: 5rem">
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
  computed: {
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

  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1em;
}

@media (max-width: 900px) {
  #app {
    margin-top: 60px;
  }
}


</style>
