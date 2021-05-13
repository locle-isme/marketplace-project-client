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
                        <input class="form-check-input" value="5" type="checkbox">
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
                        <input class="form-check-input" value="4" type="checkbox">
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
                        <input class="form-check-input" value="3" type="checkbox">
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
                        <input type="number" class="form-control w-25" value="0">
                        <div class="input-group-append">
                          <div class="input-group-text">.000 <sup>đ</sup></div>
                        </div>
                      </div>
                      <span
                          style="width: 20px; height: 1px; font-size: 0px; display: inline-block; background: rgb(154, 154, 154); margin: 0px 4px; vertical-align: middle;">-</span>
                      <div class="input-group">
                        <input type="number" class="form-control w-25" value="0">
                        <div class="input-group-append">
                          <div class="input-group-text">.000 <sup>đ</sup></div>
                        </div>
                      </div>
                    </div>
                    <button class="btn-sm btn-primary my-2 w-25">Áp dụng</button>
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
                      <button class="btn active mr-2">Bán chạy</button>
                      <button class="btn mr-2">Hàng mới</button>
                      <button class="btn mr-2">Giá thấp</button>
                      <button class="btn mr-2">Giá cao</button>
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
                <VPagination></VPagination>
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
import VPagination from "../components/VPagination";
import {FETCH_PRODUCTS} from "../store/actions.type";
import {mapGetters} from "vuex";

export default {
  data() {
    return {}
  },

  created() {
    this.loadingData();
  },

  methods: {
    loadingData() {
      this.$store.dispatch(FETCH_PRODUCTS, this.$route.query)
          .then(() => {
          })
          .catch(() => {
          })
    }
  },

  computed: {
    ...mapGetters(["listProducts"])
  },

  watch: {
    '$route.query.q': {
      deep: true,
      handler() {
        this.loadingData();
      }
    }
  },

  components: {
    ProductComponent,
    VPagination
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


