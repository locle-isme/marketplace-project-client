<template>
  <div>
    <StoreHeader></StoreHeader>
    <router-view></router-view>
  </div>
</template>
<script>

import StoreHeader from "../../components/StoreHeader";
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
    StoreHeader
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