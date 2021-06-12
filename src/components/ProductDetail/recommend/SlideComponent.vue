<template>
  <div class="recommend col-lg-12">
    <div class="card position-relative">
      <div class="card-title text-uppercase">Có thể bạn quan tâm</div>
      <div class="card-body">
        <carousel :perPage="5" :navigationEnabled="true">
          <template v-for="product in listRecommends">
            <slide :key="'rcm' + product.id">
              <ProductComponent :product="product"></ProductComponent>
            </slide>
          </template>
        </carousel>
      </div>

    </div>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
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
    return {}
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
    padding: 0;
  }
}
</style>