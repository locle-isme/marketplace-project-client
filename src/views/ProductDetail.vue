<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="user-action position-absolute d-flex">
          <div :class="classFavouritedProduct" @click="handleAddFavourite">
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="single-action share-product">
            <i class="fa fa-share-alt" aria-hidden="true"></i>
          </div>
        </div>
        <div class="card-body">
          <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
          <div class="row">
            <AlbumOverview :images="images"></AlbumOverview>
            <div class="product-content col-xl-8 col-lg-12 position-relative">
              <div class="d-flex flex-column">
                <div class="brand"><span>Thương hiệu:</span>&nbsp;<span class="text-info" style="cursor: pointer"
                                                                        @click="goBrand"> {{ brand.name }}</span></div>
                <div class="name-product">{{ currentProduct.name }}</div>

                <div class="row">
                  <div class="col-lg-8 col-sm-12">
                    <div class="card-price d-flex align-items-center">
                      <div class="current-price">{{ grandTotal | currency }}</div>
                      <div v-if="discount > 0" class="root-price">
                        {{ price | currency }}
                      </div>
                      <div v-if="discount > 0" class="decrease-discount">
                        -{{ discount }}%
                      </div>
                    </div>
                    <div v-if="isAuthenticated">
                      <div v-if="defaultAddress.id" class="card-address d-flex align-items-center">
                        <span>Giao đến:</span>
                        <span class="detail-address">{{ defaultAddress.address }}</span>
                        <button class="btn btn-sm btn-info" style="margin-left: auto"
                                @click="redirect('customer.address')">Đổi địa chỉ
                        </button>
                      </div>
                      <div v-else class="card-address d-flex align-items-center">
                        <span style="user-select: none; font-weight: 600">Giao đến:</span>
                        <button class="btn btn-sm btn-info" style="margin-left: auto"
                                @click="redirect('customer.address.create')">Thêm địa chỉ
                        </button>
                      </div>
                    </div>

                    <div class="card-buy d-flex flex-column">
                      <div class="detail-mount d-flex align-items-center flex-wrap">
                        <span>Số lượng:</span>
                        <div class="up-down-amount-group">
                          <button @click="changeQuantity(-1)"
                                  :disabled="isDisabledDownQuantity || isDisabledAddToCartBtn">
                            <i class="fa fa-minus"></i>
                          </button>
                          <input v-model="quantity" type="number" :disabled="isDisabledAddToCartBtn">
                          <button @click="changeQuantity(1)" :disabled="isDisabledAddToCartBtn">
                            <i class="fa fa-plus"></i>
                          </button>
                        </div>
                        <span v-if="isLimited" class="text-uppercase font-weight-bold"
                              style="color: #ff5113">CHỈ CÒN LẠI {{ currentProduct.amount }} SẢN PHẨM</span>
                      </div>
                      <div class="my-3">
                        <button class="btn btn-block btn-danger font-weight-bold"
                                @click="addToCart" :disabled="isDisabledAddToCartBtn">{{ textAddToCartBtn }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <SellerOverview :supplier="supplier"></SellerOverview>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InfoDetailComponent :infoDetails="infoDetails"></InfoDetailComponent>

    <div class="col-xl-9 col-lg-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Mô tả sản phẩm</div>
        <div class="card-body">
          <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
          <div class="product-description position-relative">
            <div :class="classContentToggle" style="white-space: pre-wrap">
              {{
                currentProduct.description
              }}
            </div>
            <div v-if="isShowMoreContent == false" class="gradient"></div>

          </div>
          <div class="d-flex my-3">
            <button v-if="isShowMoreContent == false" class="btn btn-sm btn-outline-primary mx-auto"
                    @click="isShowMoreContent = true">Xem thêm nội dung
            </button>
            <button v-else class="btn btn-sm btn-outline-primary mx-auto" @click="isShowMoreContent = false">Rút gọn nội
              dung
            </button>
          </div>
        </div>
      </div>
    </div>
    <SlideComponent v-if="isAuthenticated" :currentProduct="product"></SlideComponent>
    <RelateCategoryComponent :category="category"></RelateCategoryComponent>
    <ReviewComponent v-if="currentProduct.id" :productID="currentProduct.id" :supplier="supplier"
                     :ratings="ratings"></ReviewComponent>
  </div>
</template>
<script>
//import ReviewImage from "../components/ReviewImage";
import SellerOverview from "../components/ProductDetail/SellerOverview";
import AlbumOverview from "../components/ProductDetail/album_image/AlbumOverview";
import ReviewComponent from "../components/ProductDetail/review/ReviewComponent";
import SlideComponent from "../components/ProductDetail/recommend/SlideComponent";
import InfoDetailComponent from "../components/ProductDetail/info_detail/InfoDetailComponent";
import RelateCategoryComponent from "../components/ProductDetail/recommend/RelateCategoryComponent";
import {mapGetters} from "vuex";
import {CART_ADD, FETCH_ADDRESSES, GET_CART_COUNT_ITEMS, GET_PRODUCT} from "../store/actions.type";
import {HandleFavourite} from "../mixins/favourite.handle";
import {HandleRedirect} from "../mixins/redirect.handle";
import {ProductMixin} from "../mixins/product.mixin";

import firstError from '../common/filter.error'
import {toastError, toastSuccess} from "../common/toast";

export default {
  props: {},
  mixins: [HandleFavourite, HandleRedirect, ProductMixin],
  data() {
    return {
      minProducts: 25,
      id: "",
      isShowMoreContent: false,
      quantity: 1,
    }
  },

  created() {
    this.loadingData();
  },
  methods: {
    goBrand() {
      const {brand} = this;
      this.redirect('brand', {slug: brand.slug});
    },
    async loadingData() {
      try {
        await Promise.all([
          this.loadingProducts(),
        ])
        const {favourited} = this.currentProduct;
        this.favourite = favourited;
      } catch (e) {
        console.log(e)
        await this.$router.replace({name: 'error.404'});
      }

      try {
        this.loadingAddresses()
      } catch (e) {
        console.log(e)
      }
    },

    loadingProducts() {
      const {slug} = this.$route.params;
      return this.$store.dispatch(GET_PRODUCT, slug);
    },


    loadingAddresses() {
      return this.$store.dispatch(FETCH_ADDRESSES);
    },

    changeQuantity(n) {
      this.quantity += n;
    },

    async addToCart() {
      const {id} = this.product;
      if (!this.isAuthenticated) {
        toastError('Vui lòng đăng nhập để tiếp tục');
        return;
      }


      try {
        await this.$store.dispatch(CART_ADD, {product_id: id, quantity: this.quantity});
        await this.$store.dispatch(GET_CART_COUNT_ITEMS);
        toastSuccess('Thêm vào giỏ hàng hàng thành công');
      } catch (errs) {
        for (let name_err in errs) {
          toastError(firstError(errs[name_err]));
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      "currentProduct", "isAuthenticated",
      "defaultAddress", "isLoading",
    ]),


    product() {
      return this.currentProduct;
    },

    infoDetails() {
      const {info_details} = this.currentProduct;
      return info_details || [];
    },
    classContentToggle() {
      const {isShowMoreContent} = this;
      return {
        toggle: true,
        show: isShowMoreContent
      }
    },

    textAddToCartBtn() {
      const {isAvailable, amount} = this;
      if (amount <= 0) return "Hết hàng";
      if (!isAvailable) return "Tạm ngừng kinh doanh";
      return "Thêm vào giỏ hàng";
    },

    isDisabledAddToCartBtn() {
      const {isAvailable, amount} = this;
      return !isAvailable || amount <= 0;
    },

    isDisabledDownQuantity() {
      const {quantity} = this;
      return quantity <= 1 ? true : false;
    }


  },
  components: {
    //ProductReviewRating,
    //ReviewImage,
    //ProductReviewComment,
    SellerOverview,
    AlbumOverview,
    SlideComponent,
    ReviewComponent,
    InfoDetailComponent,
    RelateCategoryComponent,
  },
  watch: {
    '$route.params': {
      handler() {
        this.loadingData();
      }
    },

    quantity(v) {
      let tempValue = v;
      if (typeof v == "string") {
        tempValue = parseInt(v);
      }

      if (v === 0 || v === "0") {
        tempValue = 1;
      }

      if (!v) {
        tempValue = 1;
      }

      this.quantity = tempValue;
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.product-content {

  .name-product {
    font-weight: 100;
    font-size: 21px;
  }

  @media (min-width: 1200px) {
    .name-product {
      max-width: 615px;
    }
  }
}

.user-action {
  cursor: pointer;

  top: -35px;
  right: -30px;

  .single-action {
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    box-shadow: rgb(120 120 120) 0px 2px 6px 0px;

    &.active {
      color: #dc3545;
      box-shadow: rgb(238 160 160) 0px 2px 6px 0px;
    }
  }
}


.card-price {
  margin: 15px 0px;
  padding: 10px 20px;
  background: rgb(242, 242, 242);
  border-radius: 5px;

  .current-price {
    font-size: 2em;
    font-weight: 550;
    margin-right: 15px;
  }

  .root-price {
    color: #eb2123;
    margin-right: 15px;
    font-weight: 600;
    text-decoration: line-through;
  }

  .decrease-discount {
    font-weight: 600;
    font-size: 0.8em;
  }

}


.card-address {
  margin-bottom: 20px;
  padding: 20px 0px;
  border-bottom: 1px #d2cece solid;

  span {
    margin-right: 20px;

    &.detail-address {
      font-weight: 600;
    }

    &.change-address {
      font-weight: 600;
      color: #2a88bd;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

}

.card-buy {
  .detail-mount {
    .up-down-amount-group {
      margin-right: 10px;

      input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }

      button {
        width: 30px;
        height: 30px;
        padding: 4px;
        border: 1px #d6d6d6 solid;
        border-radius: 4px;
        background: #fff;
        margin: 0px 3px;

        &:hover {
          background: #7dd1e3;
          border-color: #59b7cd;
          color: #fff;
        }

        &:disabled {
          background: #ebebeb;
          border-color: #ebebeb;
          color: #fff;
        }

      }
    }

    input {
      height: 30px;
      width: 50px;
      padding: 4px;
      border: 1px #d6d6d6 solid;
      border-radius: 4px;
      font-size: 15px;
      text-align: center;
    }

    span {
      margin: 10px 0px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.product-detail {
  tr {
    td {
      border: none;

      &:nth-child(1) {
        background: rgb(239, 239, 239);
        font-weight: 500;
      }
    }

    &:nth-child(odd) {
      td {
        &:nth-child(2) {
          background: rgba(239, 239, 239, 0.5);
        }
      }
    }
  }
}

.product-description {
  font-size: 0.8em;
  color: #000;
  .toggle {
    min-height: 100px;
    max-height: 500px;
    overflow: hidden;

    &.show {
      height: auto !important;
    }
  }

  .gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
  }
}
</style>




