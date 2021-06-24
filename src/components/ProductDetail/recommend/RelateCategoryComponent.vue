<template>
  <div class="relate-category col-lg-12">
    <div class="card position-relative">
      <div class="card-title text-uppercase">SẢN PHẨM CÙNG DANH MỤC</div>
      <div class="suggestion-today card-body" style="padding: 0 1.25rem;min-height: 200px;">
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
        <transition-group name="fade" tag="div" class="row row-cols-lg-5-md-3-xs-2" style="margin: 0 -18px">
          <template v-for="(product) in relateCategoryProducts.data">
            <ProductComponent :key="'rlctprd' + product.id" :product="product"></ProductComponent>
          </template>
        </transition-group>
        <div class="my-4 d-flex justify-content-center">
          <button v-show="isShowViewMoreBtn" class="btn btn-sm btn-info btn-block btn-view-more"
                  @click="loadMorePage">Xem thêm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {PageMixin} from "../../../mixins/page.mixin";
import {FETCH_RELATE_CATEGORY_PRODUCTS} from "../../../store/actions.type";
import ProductComponent from "../../ProductComponent";

export default {
  mixins: [PageMixin],
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {limit: 10}
  },

  created() {
    this.loadingData();
  },

  methods: {
    loadingData() {
      this.loadingRelateProducts();
    },

    loadingRelateProducts() {
      const {offset} = this;
      const {id} = this.category;
      this.$store.dispatch(FETCH_RELATE_CATEGORY_PRODUCTS, {offset, category: id})
    }
  },
  computed: {
    ...mapGetters(["relateCategoryProducts", "isLoading"]),
    totalCount() {
      const {total_count} = this.relateCategoryProducts;
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

    category: {
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

<style>

</style>