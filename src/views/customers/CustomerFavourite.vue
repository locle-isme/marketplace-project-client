<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Sản phẩm yêu thích</div>
      <div class="card-body">
        <div class="row row-cols-lg-4-sm-2" style="margin: 0px -18px">
          <template v-for="(favourite) in listFavourites">
            <FavouriteComponent @removeFavourite="handleRemoveFavourite" :key="favourite.id"
                                :favourite="favourite"></FavouriteComponent>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import FavouriteComponent from "../../components/FavouriteComponent";
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
    FavouriteComponent
  },
  name: "CustomerFavourite"
}
</script>

<style lang="scss">

</style>