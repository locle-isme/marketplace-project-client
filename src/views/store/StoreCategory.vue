<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="card position-relative">
          <div class="card-title text-uppercase">Danh mục sản phẩm</div>
          <div class="feature-category card-body">
            <div class="row row-cols-lg-4-sm-2">
              <template v-for="i in 5">
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
          <div class="card-title text-uppercase">Tất cả sản phẩm: <span style="color: #3e3e3e; font-size: 1.2rem">34 kết quả</span></div>
          <div class="suggestion-today card-body" style="padding: 0rem 1.25rem">
            <div class="row row-cols-lg-5-md-3-xs-2" style="margin: 0px -18px">
              <template v-for="product in []">
                <ProductComponent :key="product" :product="product"></ProductComponent>
              </template>
            </div>
            <div class="my-4 d-flex float-right">
              <VPagination></VPagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PopularCategory from "@/components/PopularCategory";
import ProductComponent from "../../components/ProductComponent";
import VPagination from "@/components/VPagination";
export default {
  components:{
    PopularCategory,
    ProductComponent,
    VPagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>