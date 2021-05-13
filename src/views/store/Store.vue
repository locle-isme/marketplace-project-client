<template>
  <div>
    <StoreHeader :slug_store="slug_store"></StoreHeader>
    <router-view></router-view>
  </div>
</template>
<script>

import StoreHeader from "../../components/StoreHeader";

export default {
  data() {
    return {}
  },

  props: {
    slug_store: String
  },

  methods: {},

  components: {
    StoreHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>