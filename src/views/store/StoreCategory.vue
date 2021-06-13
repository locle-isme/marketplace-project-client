<template>
  <div class="row">
    <div class="col">

      <div class="card">
        <BreadCrumb :supplierCategories="supplierCategories"
                    :currentCategoryID="currentCategoryID"></BreadCrumb>
        <div class="card-body">

          <div class="row">

            <!-- LEFT BAR d-none d-xl-block  -->
            <div class="filter-search col-sm-12 col-xl-3 border-right">
              <div class="row">
                <!-- DANH MUC SAN PHAM-->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">DANH MỤC SẢN PHẨM</h6>
                  <ListCategory @changeCurrentCategoryID="changeCurrentCategoryID"
                                :categories="supplierCategories" :currentCategoryID.sync="currentCategoryID"></ListCategory>
                </div>
                <!-- END DANH MUC SAN PHAM-->
              </div>
            </div>
            <!-- END LEFT BAR -->
            <!-- RIGHT BAR -->
            <div class="right-bar col-xl-9 col-lg-12">
              <div class="row py-3">
                <div class="col">
                  <div class="title my-2">
                    <span class="description">{{ description }}</span>
                    <span class="quantity">{{ totalCount }} kết quả</span>
                  </div>
                  <div class="sort d-flex align-items-center">
                    <div class="mr-3">Sắp xếp theo:</div>
                    <div class="btn-group btn-group-sm">
                      <template v-for="(item, index) in sortSettings.data">
                        <button :key="'sort'+index" @click="changeSortBy(item.key)" class="btn mr-2"
                                :class="{active: sortBy == item.key}">{{ item.value }}
                        </button>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-item-result row row-cols-lg-5-md-3-xs-2" style="margin: 0px -18px">
                <template v-for="(product, index) in supplierProducts.data">
                  <ProductComponent :key="index" :product="product"></ProductComponent>
                </template>
              </div>
              <div v-if="isLoadMore" class="my-4 d-flex justify-content-center">
                <button class="btn btn-sm btn-info btn-block" style="width: 260px;" @click="loadMorePage()">
                  Xem thêm
                </button>
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
// import PopularCategory from "../../components/PopularCategory";
import {HandleRedirect} from "../../mixins/redirect.handle";
import {PageMixin} from "../../mixins/page.mixin";
import {mapGetters} from "vuex";
import {FETCH_SUPPLIER_CATEGORIES, FETCH_SUPPLIER_PRODUCTS} from "../../store/actions.type";
import ProductComponent from "../../components/ProductComponent";
import ListCategory from "../../components/Store/category/ListCategory";
import BreadCrumb from "../../components/Store/category/BreadCrumb";
export default {
  mixins: [HandleRedirect, PageMixin],
  props: {},
  data() {
    return {
      currentCategoryID: null,
      queryDataCategory: {
        supplier: "",
        parent_id: "null",
      },
      queryDataProduct: {
        suppliers: "",
        sortBy: 'default',
        category: ""
      }
    }
  },

  created() {
    this.loadingData();
  },
  methods: {
    async loadingData() {
      return Promise.all([
        this.loadingDataCategories(),
        this.loadingDataProducts(),
      ])
    },
    async loadingDataProducts() {
      return this.$store.dispatch(FETCH_SUPPLIER_PRODUCTS, this.listProductConfigs);
    },

    async loadingDataCategories() {
      return this.$store.dispatch(FETCH_SUPPLIER_CATEGORIES, this.listCategoryConfigs);
    },

    changeSortBy(_key) {
      this.queryDataProduct.sortBy = _key;
    },

    changeCurrentCategoryID(categoryID) {
      this.currentCategoryID = categoryID;
    }

  },
  computed: {
    ...mapGetters(["supplierCategories", "currentSupplier",
      "supplierProducts", "filters"]),
    sortSettings() {
      const {sort_settings} = this.filters;
      return sort_settings;
    },

    sortBy() {
      const {sortBy} = this.queryDataProduct;
      return sortBy;
    },

    products() {
      return this.supplierProducts;
    },

    totalCount() {
      const {total_count} = this.supplierProducts;
      return total_count;
    },

    listProductConfigs() {
      let filters = {};
      const {offset, sortBy, currentCategoryID, currentSupplierID} = this;
      filters.suppliers = currentSupplierID;
      if (sortBy) {
        filters.sortBy = sortBy;
      }

      filters.category = currentCategoryID;

      if (offset) {
        filters.offset = offset;
      }
      return filters;
    },


    listCategoryConfigs() {
      const {queryDataCategory, currentSupplierID} = this;
      return {
        ...queryDataCategory,
        supplier: currentSupplierID
      };
    },

    description() {
      const {currentCategoryID} = this;
      if (!currentCategoryID) {
        return "Tất cả sản phẩm: ";
      }

      let category;
      this.supplierCategories.some((c) => {
        if (c.id == currentCategoryID) {
          category = c;
          return true;
        }
        category = c.childs.find((e) => e.id == currentCategoryID);
        return category ? true : false;
      });

      if (!category) {
        return "Tất cả sản phẩm: ";
      }
      return `${category.name}: `;
    },

    currentSupplierID() {
      const {id} = this.currentSupplier;
      return id;
    }
  },

  watch: {
    sortBy() {
      this.resetCurrentPage();
      this.loadingDataProducts();
    },
    currentCategoryID() {
      this.resetCurrentPage();
      this.loadingDataProducts();
      //this.loadingData();
    },
    currentPage() {
      this.loadingDataProducts();
    },

    currentSupplierID() {
      this.resetCurrentPage();
      this.loadingData();
    }
  }
  ,
  components: {
    //PopularCategory,
    ProductComponent,
    ListCategory,
    BreadCrumb,
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

        &.active {
          font-weight: 550;
        }

        ol {
          list-style-type: none;
          padding-left: 1rem;

          li {
            font-weight: 500;

            &.active {
              font-weight: 550;
            }
          }
        }
      }
    }
  }
}

.right-bar {
  .title {
    .description {
      font-weight: 300;
      font-size: 1.35em;
    }

    .quantity {
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