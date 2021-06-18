<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" @click.prevent="goHome">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">
              <a href="#" style="pointer-events: none;">Từ khóa: `{{ $route.query.q }}`</a>
            </li>
          </ol>
        </nav>
        <div class="card-body">
          <div class="row">
            <!-- LEFT BAR -->
            <div class="filter-search col-xl-3 border-right">
              <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
              <div class="row">
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
                        <small class="ml-1">(5 sao)</small>
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
                        <small class="ml-1">(4 sao)</small>
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
                        <small class="ml-1">(3 sao)</small>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- END DANH GIA-->

                <!-- MIEN PHI GIAO HANG-->
                <!--                <div class="box col-12 border-bottom">
                                  <h6 class="text-uppercase">Miễn phí giao hàng</h6>
                                  <div class="form-check">
                                    <label class="form-check-label">
                                      <input class="form-check-input" type="checkbox" value="1">
                                      <span>Có</span>
                                    </label>
                                  </div>
                                </div>-->
                <!-- END MIEN PHI GIAO HANG-->

                <!-- GIÁ-->
                <div class="box box-price col-12 border-bottom">
                  <h6 class="text-uppercase">Giá</h6>
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="input-group">
                        <input v-model="tempPrice.min" type="number" class="input-price form-control w-25">
                        <!--                        <div class="input-group-append">-->
                        <!--                          <div class="input-group-text">.000 <sup>đ</sup></div>-->
                        <!--                        </div>-->
                      </div>
                      <span class="line-between">-</span>
                      <div class="input-group">
                        <input v-model="tempPrice.max" type="number" class="input-price form-control w-25">
                        <!--                        <div class="input-group-append">-->
                        <!--                          <div class="input-group-text">.000 <sup>đ</sup></div>-->
                        <!--                        </div>-->
                      </div>
                    </div>
                    <button class="btn-sm btn-primary my-2 w-25" @click.prevent="approvalPrice()">Áp dụng</button>
                  </div>
                </div>
                <!-- END GIÁ-->

                <!-- THUONG HIEU -->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">THƯƠNG HIỆU</h6>
                  <div class="d-flex flex-column list-brand">
                    <template v-for="brand in listBrands.data">
                      <div :key="'brand' + brand.id" class="form-check filter-brand mb-2">
                        <label class="form-check-label">
                          <input v-model="queryData.brands" class="form-check-input" :value="brand.id" type="checkbox">
                          {{ brand.name }}
                        </label>
                      </div>
                    </template>
                  </div>
                </div>
                <!-- END THUONG HIEU-->

                <!-- NHA CUNG CAP -->
                <div class="box col-12">
                  <h6 class="text-uppercase">NHÀ CUNG CẤP</h6>
                  <div class="d-flex flex-column list-brand">
                    <template v-for="supplier in listSuppliers.data">
                      <div :key="'supplier' + supplier.id" class="form-check filter-brand mb-2">
                        <label class="form-check-label">
                          <input v-model="queryData.suppliers" class="form-check-input" :value="supplier.id"
                                 type="checkbox">
                          {{ supplier.nameOfShop }}
                        </label>
                      </div>
                    </template>
                  </div>
                </div>
                <!-- END NHA CUNG CAP-->
              </div>
            </div>
            <!-- END LEFT BAR -->
            <!-- RIGHT BAR -->
            <div class="right-bar col-xl-9 col-lg-12">
              <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
              <div class="row py-3">
                <div class="col">
                  <div class="title my-2">
                    <span class="keyword">Kết quả tìm kiếm cho `{{ $route.query.q }}`: </span>
                    <span class="quality">{{ products.total_count }} kết quả</span></div>
                  <div class="sort d-flex align-items-center">
                    <div class="mr-3">Sắp xếp theo:</div>
                    <div class="btn-group btn-group-sm">
                      <template v-for="(item, index) in sortSettings.data">
                        <button :key="'sort'+index" @click="queryData.sortBy = item.key" class="btn mr-2"
                                :class="{active: sortBy == item.key}">{{ item.value }}
                        </button>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <transition-group name="fade" tag="div" class="list-item-result row row-cols-lg-5-md-3-xs-2" style="margin: 0px -18px">
                <template v-for="(product, index) in products.data">
                  <ProductComponent :key="index" :product="product"></ProductComponent>
                </template>
              </transition-group>
              <div class="my-4 d-flex float-right">
                <PaginateComponent :currentPage.sync="currentPage" :pages="pages"></PaginateComponent>
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
import {HandleRedirect} from "../mixins/redirect.handle";
import {PageMixin} from "../mixins/page.mixin";
import {SearchMixin} from "../mixins/search.mixin";
import _ from "lodash";

export default {
  mixins: [PageMixin, HandleRedirect, SearchMixin],
  data() {
    return {
      queryData: {
        ratings: [],
        prices: {min: 0, max: 0},
        sortBy: 'default',
        brands: [],
        suppliers: []
      },
    }
  },

  created() {
    this.syncQueryData();
    this.loadingData();
  },

  methods: {
    loadingData() {
      this.$store.dispatch(FETCH_PRODUCTS, this.listConfigs);
    },

    goSearch() {
      this.redirect('search', {}, this.listConfigs);
    }
  },

  computed: {
    ...mapGetters(["products", "filters"]),
    listConfigs() {
      const {currentPage, q, price, sortBy, ratings, brands, suppliers} = this;
      const result = {
        q: q,
        price: price,
        sortBy: sortBy,
        stars: this.formatDataQuery(ratings),
        brands: this.formatDataQuery(brands),
        suppliers: this.formatDataQuery(suppliers),
        page: currentPage,
      };
      return _.pickBy(result);
    },

    q() {
      return this.$route.query.q || "";
    },

  },


  watch: {
    ratings() {
      this.resetCurrentPage();
      this.goSearch();
    },

    brands() {
      this.resetCurrentPage();
      this.goSearch();
    },

    suppliers() {
      this.resetCurrentPage();
      this.goSearch();
    },

    sortBy() {
      this.resetCurrentPage();
      this.goSearch();
    },

    price() {
      this.resetCurrentPage();
      this.goSearch();
    },

    currentPage() {
      this.goSearch();
    },

    '$route.query.q'() {
      this.resetQueryData();
    },

    '$route.query': {
      deep: true,
      handler() {
        this.syncQueryData();
        this.loadingData();
      }
    },
  },

  components: {
    ProductComponent,
    PaginateComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$breadcrumbColor: rgba(255, 32, 30, 0.73);
$white: #fff;
$black: #000;
.breadcrumb {
  background: var(--danger);
  border-radius: unset;

  .breadcrumb-item {
    a {
      font-weight: 600;
      color: $white;
    }

    &.active {
      font-weight: 550;

      a {
        cursor: unset;
        color: $black;
      }
    }
  }

  .breadcrumb-item + .breadcrumb-item::before {
    float: left;
    padding-right: 0.5rem;
    color: #f4ffe6;
    content: "/";
  }
}

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

.right-bar {
  .title {
    .keyword {
      font-weight: 300;
      font-size: 1.35em;
    }

    .quality {
      font-weight: 300;
      color: rgb(137, 137, 137);
      font-size: 1.2em;
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
}


.box-price {
  .input-price {
    height: 2rem;
    font-size: 0.85rem;
  }
}

</style>


