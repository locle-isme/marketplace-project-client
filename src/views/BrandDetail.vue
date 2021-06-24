<template>
  <div class="row">
    <div class="col">

      <div class="card">

        <div class="card-body">
          <div class="row">
            <!-- LEFT BAR d-none d-xl-block  -->
            <div class="filter-search col-sm-12 col-xl-3 border-right">
              <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
              <div class="row">
                <!-- THUONG HIEU -->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">THƯƠNG HIỆU</h6>
                  <div class="d-flex flex-column list-brand">
                      <div class="form-check filter-brand mb-2">
                        <label class="form-check-label">
                          {{ currentBrand.name }}
                        </label>
                      </div>
                  </div>
                </div>
                <!-- END THUONG HIEU-->

<!--                 DANH MUC SAN PHAM
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">DANH MỤC SẢN PHẨM</h6>
                  <ul class="nav">
                    <template v-for="category in currentCategory.childs">
                      <li :key="'ct' + category.id" @click="redirect('category', {slug: category.slug})">
                        {{ category.name }}
                      </li>
                    </template>
                  </ul>
                </div>
                 END DANH MUC SAN PHAM-->

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
                    <span class="keyword">{{ currentBrand.name }}: </span>
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
import {
  FETCH_BRAND_PRODUCTS,
  GET_CURRENT_BRAND,
} from "../store/actions.type";
import {mapGetters} from "vuex";
import {HandleRedirect} from "../mixins/redirect.handle";
import {PageMixin} from "../mixins/page.mixin";
import {SearchMixin} from "../mixins/search.mixin";
import _ from "lodash"

export default {
  mixins: [HandleRedirect, PageMixin, SearchMixin],
  props: {
    slug: {
      type: [String, Number],
      required: true,
    }
  },
  data() {
    return {
      queryData: {
        ratings: [],
        prices: {min: 0, max: 0},
        sortBy: 'default',
        suppliers: []
      },
    }
  },

  created() {
    this.syncQueryData();
    this.runPromises();
  },

  methods: {
    async runPromises() {
      try {
        await this.loadingBrand();
        await this.loadingData();
      } catch (e) {
        console.log(e)
        await this.$router.replace({name: 'error.404'});
      }
    },

    async loadingBrand() {
      return this.$store.dispatch(GET_CURRENT_BRAND, this.slug)
    },

    
    async loadingData() {
      return this.$store.dispatch(FETCH_BRAND_PRODUCTS, this.listConfigs);
    },
    
    goSearchBrand() {
      const {slug} = this;
      this.redirect('brand', {slug}, this.configs)
    },
  },

  computed: {
    ...mapGetters(["brandProducts", "filters", "currentBrand"]),

    products() {
      return this.brandProducts;
    },

    listConfigs() {
      const {configs, currentBrand} = this;
      const {id} = currentBrand;
      return {...configs, brands: id};
    },

    configs() {
      const {currentPage, price, sortBy} = this;
      const {ratings, suppliers} = this.queryData;
      const result = {
        stars: this.formatDataQuery(ratings),
        suppliers: this.formatDataQuery(suppliers),
        price: price,
        sortBy: sortBy,
        page: currentPage,
      }
      return _.pickBy(result);
    },
  },


  watch: {
    slug() {
      this.resetQueryData();
      this.goSearchBrand();
    },

    ratings() {
      this.resetCurrentPage();
      this.goSearchBrand();
    },

    suppliers() {
      this.resetCurrentPage();
      this.goSearchBrand();
    },

    sortBy() {
      this.resetCurrentPage();
      this.goSearchBrand();
    },

    price() {
      this.resetCurrentPage();
      this.goSearchBrand();
    },

    currentPage() {
      this.goSearchBrand();
    },

    '$route.query': {
      deep: true,
      handler() {
        this.loadingData();
      }
    },
  },

  components: {
    ProductComponent,
    PaginateComponent,
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

