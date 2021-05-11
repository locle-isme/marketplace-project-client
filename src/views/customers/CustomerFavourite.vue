<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Sản phẩm yêu thích</div>
      <div class="card-body">
        <div class="row row-cols-lg-4-sm-2" style="margin: 0px -18px">
          <template v-for="(favourite) in listFavourites">
            <FavouriteItem @removeFavourite="handleRemoveFavourite" :key="favourite.id"
                           :favourite="favourite"></FavouriteItem>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import FavouriteItem from "../../components/FavouriteItem";
import {mapGetters} from "vuex";
import {FAVOURITE_DELETE, FETCH_FAVOURITES} from "../../store/actions.type";

export default {
  data() {
    return {}
  },
  created() {
    this.loadingData();
  },
  methods: {
    loadingData() {
      this.$store.dispatch(FETCH_FAVOURITES);
    },

    handleRemoveFavourite(id) {
      this.$store.dispatch(FAVOURITE_DELETE, {product_id: id})
          .then(() => {
            this.$toast.success('Đã bỏ thích', {
              duration: 5000,
              position: 'top-left'
            })
          });
    }
  },
  computed: {
    ...mapGetters(["listFavourites"]),

  },

  components: {
    FavouriteItem
  },
  name: "CustomerFavourite"
}
</script>

<style scoped>

</style>