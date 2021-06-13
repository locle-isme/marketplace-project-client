<template>
  <div class="recommend col-lg-12">
    <div class="card position-relative">
      <div class="card-title text-uppercase">Có thể bạn quan tâm</div>
      <div class="card-body">
        <carousel :perPage="5" :navigationEnabled="true" :navigationPrevLabel="prevBtn" :navigationNextLabel="nextBtn">
          <template v-for="product in listRecommends">
            <slide :key="'rcm' + product.id">
              <ProductComponent :product="product"></ProductComponent>
            </slide>
          </template>
        </carousel>
        <div v-if="lengthListRecommends == 0" class="not-available">
          <span>Sản phẩm chưa sẵn có</span>
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
    ...mapGetters(["recommendProducts"]),
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

.not-available{
  height: auto;
  padding: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>