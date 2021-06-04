<template>
  <!--  <div>
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
                <PaginateComponent></PaginateComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
  <div class="row">
    <div class="col">

      <div class="card">
        <div class="card-body">
          <div class="row">

            <!-- LEFT BAR d-none d-xl-block  -->
            <div class="filter-search col-sm-12 col-xl-3 border-right">
              <div class="row">
                <!-- DANH MUC SAN PHAM-->
                <div class="box col-12 border-bottom">
                  <h6 class="text-uppercase">DANH MỤC SẢN PHẨM</h6>
                  <ul class="nav">
                    <template v-for="category in supplierCategories">
                      <li :class="classCategory(category)" :key="'ct' + category.id"
                          @click.prevent="changeIsShowCategoryChilds(category.id)">
                        {{ category.name }}
                        <ol v-if="isShowCategoryChilds == category.id">
                          <template v-for="childCategory in category.childs">
                            <li :class="classCategory(childCategory)" v-if="compareCategory(category,childCategory)"
                                :key="'child_ct' + childCategory.id"
                                @click.stop="changeCategoryParentID(childCategory.id)">
                              {{ childCategory.name }}
                            </li>
                          </template>
                        </ol>
                      </li>
                    </template>
                  </ul>
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
                <button class="btn btn-sm btn-info btn-block" style="width: 260px;" @click="loadMorePage()">Xem thêm
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
import ProductComponent from "../../components/ProductComponent";
import {mapGetters} from "vuex";
import {
  FETCH_SUPPLIER_CATEGORIES,
  //FETCH_SUPPLIER_CATEGORY_CHILDS,
  FETCH_SUPPLIER_PRODUCTS
} from "../../store/actions.type";

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
      isShowCategoryChilds: null,
      queryDataCategory: {
        supplier: "",
        parent_id: "",
        old_parent_id: "",
      },
      queryDataProduct: {
        suppliers: "",
        sortBy: 'default',
        category: ""
      }
    }
  },

  created() {
    this.queryDataProduct.suppliers = this.slug;
    this.queryDataCategory.supplier = this.slug;
    this.loadingData();
  },
  methods: {
    async loadingData() {
      return Promise.all([
        this.loadingDataCategories(),
        //this.loadingDataChildsCategories(),
        this.loadingDataProducts(),
      ])
    },
    async loadingDataProducts() {
      return this.$store.dispatch(FETCH_SUPPLIER_PRODUCTS, this.listProductConfigs);
    },

    async loadingDataCategories() {
      return this.$store.dispatch(FETCH_SUPPLIER_CATEGORIES, this.listOldCategoryConfigs);
    },
    // async loadingDataChildsCategories() {
    //   return this.$store.dispatch(FETCH_SUPPLIER_CATEGORY_CHILDS, this.listCategoryConfigs);
    // },


    changeIsShowCategoryChilds(_id) {
      this.isShowCategoryChilds = _id;
      this.changeCategoryParentID(_id);
    },
    changeCategoryParentID(_id) {
      // this.queryDataCategory.old_parent_id = this.queryDataCategory.parent_id;
      // this.queryDataCategory.parent_id = _id;
      this.queryDataProduct.category = _id;

    },

    changeSortBy(_key) {
      this.queryDataProduct.sortBy = _key;
    },

    compareCategory(parentCategory, childCategory) {
      const {parent} = childCategory;
      return parent && parent.id == parentCategory.id;
    },

    classCategory(_category) {
      return {
        active: _category.id == this.categoryID || _category.id == this.oldParentCategoryID,
      }
    },
  },
  computed: {
    ...mapGetters(["currentSupplier", "supplierCategories",
      "supplierCategoryChilds", "supplierProducts", "filters"]),
    sortSettings() {
      const {sort_settings} = this.filters;
      return sort_settings;
    },

    sortBy() {
      const {sortBy} = this.queryDataProduct;
      return sortBy;
    },

    categoryID() {
      const {category} = this.queryDataProduct;
      return category;
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
      const {offset, sortBy, categoryID} = this;
      if (this.slug) {
        filters.suppliers = this.slug;
      }
      if (sortBy) {
        filters.sortBy = sortBy;
      }

      if (categoryID) {
        filters.category = categoryID;
      }

      if (offset) {
        filters.offset = offset;
      }
      return filters;
    },

    // listCategoryConfigs() {
    //   let filters = {};
    //   const {categoryID, slug} = this;
    //
    //   if (slug) {
    //     filters.supplier = slug;
    //   }
    //
    //   filters.parent_id = categoryID;
    //   return filters;
    // },
    listOldCategoryConfigs() {
      let filters = {};
      const {slug, oldParentCategoryID} = this;
      if (slug) {
        filters.supplier = slug;
      }

      filters.parent_id = oldParentCategoryID;
      return filters;
    },

    oldParentCategoryID() {
      const {old_parent_id} = this.queryDataCategory;
      return old_parent_id;
    },
    description() {
      const {categoryID} = this;
      if (!categoryID) {
        return "Tất cả sản phẩm: ";
      }

      let category;
      this.supplierCategories.some((c) => {
        if (c.id == categoryID) {
          category = c;
          return true;
        }
        category = c.childs.find((e) => e.id == categoryID);
        return category ? true : false;
      });

      if (!category) {
        return "Tất cả sản phẩm: ";
      }
      return `${category.name}: `;
    },
  },

  watch: {
    sortBy() {
      this.resetCurrentPage();
      this.loadingDataProducts();
    },
    categoryID() {
      this.resetCurrentPage();
      this.loadingDataProducts();
      //this.loadingData();
    },
    currentPage() {
      this.loadingDataProducts();
    }
  }
  ,
  components: {
    //PopularCategory,
    ProductComponent,
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