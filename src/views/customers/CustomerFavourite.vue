<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Sản phẩm yêu thích</div>
      <div class="card-body">
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
        <transition-group name="fade" tag="div" class="row row-cols-lg-4-sm-2" style="margin: 0px -18px">
          <template v-for="favourite in listFavourites.data">
            <FavouriteItem @removeFavourite="handleRemoveFavourite" :key="'fv'+favourite.id"
                                :favourite="favourite">
            </FavouriteItem>
          </template>
        </transition-group>

        <div v-if="total_count == 0" class="card-empty">
          <img class="bg-empty" src="/images/undraw/undraw_Wishlist_re_m7tv.png" alt="">
          <p class="description">Bạn chưa có sản phẩm yêu thích nào</p>
          <button class="btn btn-sm btn-danger" @click="redirect('home')">Thêm ngay</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import FavouriteItem from "../../components/Customer/favourite/FavouriteItem";
import {mapGetters} from "vuex";
import {FAVOURITE_DELETE, FETCH_FAVOURITES} from "../../store/actions.type";
import {HandleRedirect} from "../../mixins/redirect.handle";

export default {
  mixins: [HandleRedirect],
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
            this.loadingData();
          });
    }
  },
  computed: {
    ...mapGetters(["listFavourites", "isLoading"]),
    total_count() {
      const {total_count} = this.listFavourites;
      return total_count;
    }

  },

  components: {
    FavouriteItem
  },
  name: "CustomerFavourite"
}
</script>

<style lang="scss">

</style>