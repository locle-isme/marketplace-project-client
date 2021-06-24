<template>
  <div class="row">
    <div class="relate-category col-lg-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">SẢN PHẨM NỔI BẬT</div>
        <div class="suggestion-today card-body" style="padding: 0 1.25rem;min-height: 200px;">
          <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
          <transition-group name="fade" tag="div" class="row row-cols-lg-5-md-3-xs-2" style="margin: 0 -18px">
            <template v-for="(product) in supplierHomeProducts.data">
              <ProductComponent :key="'slhprd' + product.id" :product="product"></ProductComponent>
            </template>
          </transition-group>
          <div class="my-4 d-flex justify-content-center w-25 mx-auto">
            <button v-show="isShowViewMoreBtn" class="btn btn-sm btn-info btn-block btn-view-more"
                    @click="loadMorePage">Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import ProductComponent from "../../components/ProductComponent";
import {HandleRedirect} from "../../mixins/redirect.handle";
import {PageMixin} from "../../mixins/page.mixin";
import {FETCH_SUPPLIER_HOME_PRODUCTS} from "../../store/actions.type";

export default {
  mixins: [HandleRedirect, PageMixin],
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
      this.loadingSupplierProducts();
    },

    loadingSupplierProducts() {
      const {offset} = this;
      const {id} = this.currentSupplier;
      this.$store.dispatch(FETCH_SUPPLIER_HOME_PRODUCTS, {offset, suppliers: id})
    }
  },
  computed: {
    ...mapGetters(["isLoading", "supplierHomeProducts", "currentSupplier"]),
    totalCount() {
      const {total_count} = this.supplierHomeProducts;
      return total_count;
    },
    isShowViewMoreBtn() {
      const {offset, totalCount} = this;
      return offset < totalCount;
    }
  },

  watch: {
    currentPage() {
      this.loadingData();
    },

    currentSupplier: {
      deep: true,
      handler() {
        this.loadingData();
      }
    }
  },


  components: {
    ProductComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>