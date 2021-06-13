<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
  </div>
</template>
<script>

import HeaderComponent from "../../components/Store/HeaderComponent";
import {GET_SUPPLIER} from "../../store/actions.type";
import {mapGetters} from "vuex";

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
      return this.$store.dispatch(GET_SUPPLIER, this.slug)
    },
  },

  computed: {
    ...mapGetters(["currentSupplier"]),
  },

  components: {
    HeaderComponent,
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