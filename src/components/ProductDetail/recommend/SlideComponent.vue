<template>
  <div class="recommend col-lg-12">
    <div class="card position-relative">
      <div class="card-title text-uppercase">Gợi ý cho bạn</div>
      <div class="card-body">
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
        <carousel :perPage="5" :navigationEnabled="true" :navigationPrevLabel="prevBtn" :navigationNextLabel="nextBtn">
          <template v-for="product in listRecommends">
            <slide :key="'rcm' + product.id">
              <ProductComponent :product="product"></ProductComponent>
            </slide>
          </template>
        </carousel>
        <div v-if="lengthListRecommends == 0" class="not-available">
          <img src="/images/actions/sad_tuzki.gif" alt="">
          <span class="my-3">Chưa có sản phẩm phù hợp để đề xuất tới bạn!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import "vue-carousel/"
import {FETCH_RECOMMEND_PRODUCTS} from "../../../store/actions.type";
import ProductComponent from "../../ProductComponent";
import {mapGetters} from "vuex";

export default {
  props: {
    currentProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nextBtn: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
      prevBtn: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
    }
  },

  created() {
    this.$store.dispatch(FETCH_RECOMMEND_PRODUCTS)
  },

  methods: {},

  computed: {
    ...mapGetters(["recommendProducts", "isLoading"]),
    listRecommends() {
      const {currentProduct, recommendProducts} = this;
      return recommendProducts.filter(product => product.id != currentProduct.id) || [];
    },
    lengthListRecommends() {
      const {listRecommends} = this;
      return listRecommends.length;
    }
  },

  components: {
    Carousel,
    Slide,
    ProductComponent,
  }
}
</script>

<style lang="scss">
.recommend {
  .card-body {
    min-height: 200px;
    padding: 0;
  }
}

.not-available {
  height: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    user-select: none;
    width: 100px;
    height: auto;
  }
}

</style>