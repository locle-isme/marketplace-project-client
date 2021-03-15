<template>
  <div>
    <StoreHead :slug_store="slug_store"></StoreHead>
    <router-view></router-view>
  </div>
</template>
<script>
import StoreHead from "@/components/StoreHead";
export default {
  data() {
    return {}
  },

  props:{
    slug_store: String
  },

  methods: {

  },

  components:{
    StoreHead,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>