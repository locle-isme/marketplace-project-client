<template>
  <div class="row">
    <div class="col">

      <div class="card">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" @click.prevent="redirect('home')">
              <a href="#">Home</a>
            </li>
            <li v-if="currentCategory.parent" class="breadcrumb-item"
                @click.prevent="redirect('category', {slug: currentCategory.parent.id})">
              <a href="#">{{ currentCategory.parent.name }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ currentCategory.name }}</li>
          </ol>
        </nav>
        <div class="card-body">
          <div class="row">

            <!-- LEFT BAR d-none d-xl-block  -->
            <div class="filter-search col-sm-12 col-xl-3 border-right">
              <div class="row">
                <!-- DANH MUC SAN PHAM-->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">DANH MỤC SẢN PHẨM</h6>
                  <ul class="nav">
                    <template v-for="category in currentCategory.childs">
                      <li :key="'ct' + category.id" @click="redirect('category', {slug: category.id})">
                        {{ category.name }}
                      </li>
                    </template>
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
                    <button class="btn-sm btn-primary my-2 w-25" @click.prevent="approvalPrice()">Áp dụng</button>
                  </div>
                </div>
                <!-- END GIÁ-->

                <!-- THUONG HIEU -->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">THƯƠNG HIỆU</h6>
                  <div class="d-flex flex-column list-brand">
                    <template v-for="brand in brands.data">
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
                    <template v-for="supplier in suppliers.data">
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
              <div class="row py-3">
                <div class="col">
                  <div class="title my-2">
                    <span class="keyword">{{ currentCategory.name }}: </span>
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
              <div class="list-item-result row row-cols-lg-5-md-3-xs-2" style="margin: 0px -18px">
                <template v-for="(product, index) in products.data">
                  <ProductComponent :key="index" :product="product"></ProductComponent>
                </template>
              </div>
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
import {FETCH_PRODUCTS, GET_CURRENT_CATEGORY} from "../store/actions.type";
import {mapGetters} from "vuex";
import {HandleRedirect} from "../mixins/redirect.handle";
import {PageMixin} from "../mixins/page.mixin";

export default {
  mixins: [HandleRedirect, PageMixin],
  props: {
    slug: {
      type: [String, Number],
      required: true,
    }
  },
  data() {
    return {
      tempPrice: {min: 0, max: 0},
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
    this.initQueryData();
    this.runPromises();
  },

  methods: {
    runPromises() {
      Promise.all([
        this.loadingCategory(),
        this.loadingData()
      ]).catch((err) => {
        console.log(err)
      })
    },
    async loadingData() {
      return this.$store.dispatch(FETCH_PRODUCTS, this.listConfigs);
    },

    async loadingCategory() {
      return this.$store.dispatch(GET_CURRENT_CATEGORY, this.slug)
    },

    initQueryData() {
      if (this.$route.query.stars) {
        this.queryData.ratings = this.$route.query.stars.split(",");
      }

      if (this.$route.query.brands) {
        this.queryData.brands = this.$route.query.brands.split(",");
      }

      if (this.$route.query.suppliers) {
        this.queryData.suppliers = this.$route.query.suppliers.split(",");
      }

      if (this.$route.query.sortBy) {
        this.queryData.sortBy = this.$route.query.sortBy;
      }
    },

    resetCurrentPage() {
      this.currentPage = 1;
    },

    resetQueryData() {
      this.resetCurrentPage();
      this.queryData.ratings = [];
      this.queryData.prices.min = 0;
      this.queryData.prices.max = 0;
      this.queryData.sortBy = "default";
    },

    approvalPrice() {
      const {prices} = this.queryData;
      const {min, max} = this.tempPrice;
      if (parseInt(min) > parseInt(max)) {
        this.$toast.error("Giá không hợp lệ", {position: "top-left"});
        return;
      }

      prices.min = parseInt(min) * 1000;
      prices.max = parseInt(max) * 1000;
      this.resetCurrentPage();
      this.$router.push({name: 'search', query: this.listConfigs})
    },

    formatDataQuery(ar) {
      return ar.join(",");
    },
  },

  computed: {
    ...mapGetters(["products", "filters", "currentCategory"]),
    listConfigs() {
      const {currentPage} = this;
      const {ratings, sortBy, brands, suppliers} = this.queryData;
      const _filters = {};
      if (currentPage > 1) {
        _filters.page = currentPage;
      }
      if (this.slug) {
        _filters.category = this.slug;
      }

      if (ratings.length) {
        _filters.stars = this.formatDataQuery(ratings);
      }

      if (brands.length) {
        _filters.brands = this.formatDataQuery(brands);
      }

      if (suppliers.length) {
        _filters.suppliers = this.formatDataQuery(suppliers);
      }

      _filters.price = this.price;

      if (sortBy) {
        _filters.sortBy = sortBy;
      }

      return _filters;
    },

    price() {
      const {prices} = this.queryData;
      return `${prices.min},${prices.max}`;
    },

    sortBy() {
      const {sortBy} = this.queryData;
      return sortBy;
    },


    brands() {
      const {brands} = this.filters;
      return brands;
    },

    suppliers() {
      const {suppliers} = this.filters;
      return suppliers;
    },

    sortSettings() {
      const {sort_settings} = this.filters;
      return sort_settings;
    },

    q() {
      return this.$route.query.q || "";
    }
  },


  watch: {
    slug() {
      this.resetQueryData();
      this.runPromises();
    },

    'queryData.ratings'() {
      this.resetCurrentPage();
      this.loadingData();
      //this.redirect();
    },

    'queryData.brands'() {
      this.resetCurrentPage();
      this.loadingData();
      //this.redirect();
    },

    'queryData.suppliers'() {
      this.resetCurrentPage();
      this.loadingData();
      //this.redirect();
    },

    sortBy() {
      this.resetCurrentPage();
      this.loadingData();
      //this.redirect();
    },

    '$route.query'() {
      //this.loadingData();
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
$breadcrumbColor: rgba(255, 32, 30, 0.73);
$white: #fff;
$black: #000;
.breadcrumb {
  background: var(--danger);

  .breadcrumb-item {
    a {
      font-weight: 600;
      color: $white;
    }

    &.active {
      font-weight: 550;
      color: $black;
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


</style>

