<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Sản phẩm yêu thích</div>
      <div class="card-body">
        <div class="row row-cols-lg-4-sm-2" style="margin: 0px -18px">
          <template v-for="i in 5">
            <FavouriteItem :key="i"></FavouriteItem>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import FavouriteItem from "../../components/FavouriteItem";
export default {
  data() {
    return {}
  },

  components: {
    FavouriteItem
  },
  name: "CustomerFavourite"
}
</script>

<style scoped>

</style>