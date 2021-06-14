<template>
  <div>
    <CategoryOverview></CategoryOverview>
    <div class="row">
      <div class="col">
        <div class="card position-relative">
          <div class="card-title text-uppercase">SẢN PHẨM BÁN CHẠY</div>
          <div class="suggestion-today card-body" style="padding: 0 1.25rem">
            <div class="row row-cols-lg-5-md-3-xs-2" style="margin: 0 -18px">
              <template v-for="(product, index) in products.data">
                <ProductComponent :key="index" :product="product"></ProductComponent>
              </template>
            </div>
            <div class="my-4 d-flex justify-content-center">
              <button class="btn btn-sm btn-info btn-block" style="width: 260px">Xem thêm</button>
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
import { FETCH_PRODUCTS} from "../store/actions.type";

export default {
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
      this.$store.dispatch(FETCH_PRODUCTS, {});
    }
  },
  computed: {
    ...mapGetters(["products"])
  },

  components: {
    CategoryOverview,
    ProductComponent,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

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