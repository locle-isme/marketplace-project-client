<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <router-view :slug="slug"></router-view>
  </div>
</template>
<script>

import HeaderComponent from "../../components/Store/HeaderComponent";
import {GET_SUPPLIER} from "../../store/actions.type";

export default {
  props: {
    slug: {
      type: [String, Number],
      required: true,
    }
  },

  data() {
    return {}
  },

  created() {
    this.loadingData();
  },

  methods: {
    loadingData() {
      this.$store.dispatch(GET_SUPPLIER, this.slug)
    },
  },

  components: {
    HeaderComponent
  },

  watch: {
    "$route.params.slug"() {
      this.loadingData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>