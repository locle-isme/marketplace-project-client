<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <!-- LEFT BAR -->
            <div class="filter-search d-none d-xl-block col-xl-3 border-right">
              <div class="row">
                <!-- DANH MUC SAN PHAM-->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">DANH MỤC SẢN PHẨM</h6>
                  <ul class="nav">
                    <li>Quạt điện</li>
                    <li>Tủ lạnh</li>
                    <li>Máy hút bụi</li>
                  </ul>
                </div>
                <!-- END DANH MUC SAN PHAM-->

                <!-- DANH GIA-->
                <div class="box rating col-12 border-bottom">
                  <h6 class="text-uppercase">ĐÁNH GIÁ</h6>
                  <div class="d-flex flex-column list-rate">
                    <div class="form-check filter-rate">
                      <label class="form-check-label">
                        <input v-model="queryData.ratings" class="form-check-input" value="5" type="checkbox">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <span>(từ 5 sao)</span>
                      </label>
                    </div>
                    <div class="form-check filter-rate">
                      <label class="form-check-label">
                        <input v-model="queryData.ratings" class="form-check-input" value="4" type="checkbox">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="far fa-star text-warning"></i>
                        <span>(từ 4 sao)</span>
                      </label>
                    </div>
                    <div class="form-check filter-rate">
                      <label class="form-check-label">
                        <input v-model="queryData.ratings" class="form-check-input" value="3" type="checkbox">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="far fa-star text-warning"></i>
                        <i class="far fa-star text-warning"></i>
                        <span>(từ 3 sao)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- END DANH GIA-->

                <!-- MIEN PHI GIAO HANG-->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">Miễn phí giao hàng</h6>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" value="1">
                      <span>Có</span>
                    </label>
                  </div>
                </div>
                <!-- END MIEN PHI GIAO HANG-->

                <!-- GIÁ-->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">Giá</h6>
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="input-group">
                        <input v-model="tempPrice.min" type="number" class="form-control w-25">
                        <div class="input-group-append">
                          <div class="input-group-text">.000 <sup>đ</sup></div>
                        </div>
                      </div>
                      <span
                          style="width: 20px; height: 1px; font-size: 0px; display: inline-block; background: rgb(154, 154, 154); margin: 0px 4px; vertical-align: middle;">-</span>
                      <div class="input-group">
                        <input v-model="tempPrice.max" type="number" class="form-control w-25">
                        <div class="input-group-append">
                          <div class="input-group-text">.000 <sup>đ</sup></div>
                        </div>
                      </div>
                    </div>
                    <button class="btn-sm btn-primary my-2 w-25" @click="setPrices()">Áp dụng</button>
                  </div>
                </div>
                <!-- END GIÁ-->

                <!-- THUONG HIEU -->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">THƯƠNG HIỆU</h6>
                  <ul class="nav">
                    <li>Nokia</li>
                    <li>Samsung</li>
                    <li>OEM</li>
                  </ul>
                </div>
                <!-- END THUONG HIEU-->

                <!-- NHA CUNG CAP -->
                <div class="box col-12">
                  <h6 class="text-uppercase">NHÀ CUNG CẤP</h6>
                  <ul class="nav">
                    <li>TNZ Trade</li>
                    <li>Lorem</li>
                    <li>Ipsum</li>
                  </ul>
                </div>
                <!-- END NHA CUNG CAP-->
              </div>
            </div>
            <!-- END LEFT BAR -->
            <!-- RIGHT BAR -->
            <div class="col-xl-9 col-lg-12">
              <div class="row py-3">
                <div class="col">
                  <div class="sort d-flex align-items-center">
                    <div class="mr-3">Sắp xếp theo:</div>
                    <div class="btn-group btn-group-sm">
                      <button @click="queryData.sortBy = 'default'" class="btn mr-2"
                              :class="{active: sortBy == 'default'}">Bán chạy
                      </button>
                      <button @click="queryData.sortBy = 'new_products'" class="btn mr-2" :class="{active: sortBy == 'new'}">Hàng
                        mới
                      </button>
                      <button @click="queryData.sortBy = 'low_price'" class="btn mr-2" :class="{active: sortBy == 'low'}">Giá
                        thấp
                      </button>
                      <button @click="queryData.sortBy = 'high_price'" class="btn mr-2" :class="{active: sortBy == 'high'}">
                        Giá cao
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-item-result row row-cols-lg-5-md-3-xs-2" style="margin: 0px -18px">
                <template v-for="(product, index) in listProducts.products">
                  <ProductComponent :key="index" :product="product"></ProductComponent>
                </template>
              </div>
              <div class="my-4 d-flex float-right">
                <PaginateComponent :currentPage="1" :pages="45"></PaginateComponent>
              </div>
            </div>
            <!-- END RIGHT BAR -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductComponent from "../components/ProductComponent";
import PaginateComponent from "../components/PaginateComponent";
import {FETCH_PRODUCTS} from "../store/actions.type";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      limit: 20,
      tempPrice: {min: 0, max: 0},
      queryData: {
        q: "",
        ratings: [],
        prices: {min: 0, max: 0},
        sortBy: 'default'
      }
    }
  },

  created() {
    this.loadingData();
  },

  methods: {
    loadingData() {
      this.$store.dispatch(FETCH_PRODUCTS, this.listConfigs)
          .then(() => {
          })
          .catch(() => {
          })
    },

    resetQueryData() {
      this.currentPage = 1;
      this.queryData.ratings = [];
      this.queryData.prices.min = 0;
      this.queryData.prices.max = 0;
      this.queryData.sortBy = "default";
    },

    setPrices() {
      const {min, max} = this.tempPrice;
      if (min > max) return;
      this.queryData.prices.min = parseInt(min) * 1000;
      this.queryData.prices.max = parseInt(max) * 1000;
    }
  },

  computed: {
    ...mapGetters(["listProducts"]),
    listConfigs() {
      const {currentPage} = this;
      const {q, ratings, prices, sortBy} = this.queryData;
      const filters = {};
      if (currentPage > 1) {
        filters.page = currentPage;
      }
      if (q) {
        filters.q = q;
      }

      if (ratings.length) {
        filters.stars = this.stars;
      }

      if (prices.min && prices.max) {
        filters.price = this.price;
      }

      if (sortBy) {
        filters.sortBy = sortBy;
      }

      return filters;
    },

    stars() {
      const {ratings} = this.queryData;
      return ratings.join(",");
    },

    price() {
      const {prices} = this.queryData;
      console.log(prices);
      return `${prices.min},${prices.max}`;
    },

    sortBy() {
      const {sortBy} = this.queryData;
      return sortBy;
    }
  },


  watch: {
    '$route.query.q'(keyword) {
      this.resetQueryData();
      const {queryData} = this;
      queryData.q = keyword;
    },

    listConfigs() {
      this.loadingData();
    }
  },

  components: {
    ProductComponent,
    PaginateComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.box {
  padding: 10px 10px;

  h6 {
    font-weight: 600;
    padding: 4px 0px;
  }

  ul {
    &.nav {
      flex-direction: column;

      li {
        padding: 4px 0px;
        cursor: pointer;
      }
    }
  }
}

.sort {
  .btn-group {
    .btn {
      &.active {
        background-color: rgb(13, 92, 182);
        color: #fff;
        font-weight: 500;
      }

      &:hover {
        @extend .active;
      }
    }
  }
}


</style>


