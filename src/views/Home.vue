<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="card position-relative">
          <div class="card-title text-uppercase">Danh mục nổi bật</div>
          <div class="feature-category card-body">
            <div class="row row-cols-lg-10-md-6-xs-4">
              <template v-for="i in 20">
                <PopularCategory :key="i"></PopularCategory>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card position-relative">
          <div class="card-title text-uppercase">Tìm kiếm nổi bật</div>
          <div class="feature-search card-body">
            <div class="d-flex flex-wrap">
              <template v-for="i in 20">
                <TagKeyword :key="i"></TagKeyword>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col">
        <div class="card position-relative">
          <div class="card-title text-uppercase">Gợi ý hôm nay</div>
          <div class="suggestion-today card-body" style="padding: 0rem 1.25rem">
            <div class="row row-cols-lg-5-md-3-xs-2" style="margin: 0px -18px">
              <template v-for="(product, index) in listProducts.products">
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
import ProductComponent from "../components/ProductComponent";
import TagKeyword from "@/components/TagKeyword";
import PopularCategory from "@/components/PopularCategory";
import {mapGetters} from "vuex";

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters(["listProducts"])
  },

  components: {
    ProductComponent,
    TagKeyword,
    PopularCategory,
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