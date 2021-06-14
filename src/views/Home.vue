<template>
  <div>
    <CategoryOverview></CategoryOverview>
    <div class="row">
      <div class="col">
        <div class="card position-relative">
          <div class="card-title text-uppercase">SẢN PHẨM BÁN CHẠY</div>
          <div class="suggestion-today card-body" style="padding: 0 1.25rem">
            <div class="row row-cols-lg-5-md-3-xs-2" style="margin: 0 -18px">
              <template v-for="(product, index) in homeProducts.data">
                <ProductComponent :key="index" :product="product"></ProductComponent>
              </template>
            </div>
            <div class="my-4 d-flex justify-content-center">
              <button v-show="isShowViewMoreBtn" class="btn btn-sm btn-info btn-block btn-view-more" @click="loadMorePage">Xem thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryOverview from "../components/Home/category/CategoryOverview";
import ProductComponent from "../components/ProductComponent";
import {mapGetters} from "vuex";
import {FETCH_HOME_PRODUCTS} from "../store/actions.type";
import {PageMixin} from "../mixins/page.mixin";

export default {
  mixins: [PageMixin],
  created() {
    this.loadingData();
  },
  data() {
    return {}
  },
  methods: {
    loadingData() {
      Promise.all([
        this.loadingProducts(),
      ])
          .then(() => {
          })
          .catch(() => {
          })
    },


    loadingProducts() {
      const {offset} = this;
      this.$store.dispatch(FETCH_HOME_PRODUCTS, {offset});
    }
  },
  computed: {
    ...mapGetters(["homeProducts"]),
    totalCount() {
      const {total_count} = this.homeProducts;
      return total_count;
    },
    isShowViewMoreBtn() {
      const {offset, totalCount} = this;
      return offset < totalCount;
    }
  },

  watch: {
    currentPage() {
      this.loadingProducts();
    },
  },

  components: {
    CategoryOverview,
    ProductComponent,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.btn-view-more {
  width: 260px;
}

.feature-category {
  overflow-y: auto;
  max-height: 300px;
  position: relative;
}

.feature-search {
  max-height: 130px;
  overflow-y: auto;
  overflow-x: auto;
}


</style>