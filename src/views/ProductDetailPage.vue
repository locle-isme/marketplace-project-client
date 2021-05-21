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
          <div class="row">
            <div class="product-image col-xl-4 col-lg-12 border-right mb-4">
              <div class="d-flex flex-column align-items-center">
                <div class="img-thumbnail">
                  <img width="100%" height="100%" :src="firstImages" alt="">
                </div>
                <div class="d-flex flex-wrap review-image justify-content-center position-relative">
                  <template v-for="(image, index) in images.slice(0,7)">
                    <div :key="index" class="view-photo">
                      <img :src="image.url" alt="">
                      <span v-if="index == 6">Xem thêm 69 hình</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="product-content col-xl-8 col-lg-12 position-relative">
              <div class="d-flex flex-column">
                <div class="brand"><span>Thương hiệu:</span> <a href="#"><span>{{ brand.name }}</span></a></div>
                <div class="name-product">{{ currentProduct.name }}</div>

                <div class="row">
                  <div class="col-lg-8 col-sm-12">
                    <div class="card-price d-flex align-items-center">
                      <div class="current-price">{{ realPrice | currency }}</div>
                      <div v-if="currentProduct.discount > 0" class="root-price">
                        {{ currentProduct.price | currency }}
                      </div>
                      <div v-if="currentProduct.discount > 0" class="decrease-discount">
                        -{{ currentProduct.discount }}%
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
                          <button @click="changeQuantity(-1)"><i class="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <input v-model="quantity" type="text">
                          <button @click="changeQuantity(1)"><i class="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </div>
                        <span v-if="isLimited" class="text-uppercase font-weight-bold"
                              style="color: #ff5113">CHỈ CÒN LẠI {{ currentProduct.amount }} SẢN PHẨM</span>
                      </div>
                      <div class="my-3">
                        <button v-if="currentProduct.amount > 0" class="btn btn-block btn-danger font-weight-bold"
                                @click="addToCart">Chọn
                          mua
                        </button>
                        <button v-else class="btn btn-block btn-danger font-weight-bold" disabled>Hết hàng</button>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <ProductSeller :supplier="supplier"></ProductSeller>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-9 col-lg-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Thông tin chi tiết</div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="product-detail table">
              <tbody>
              <tr>
                <td>Thương hiệu</td>
                <td>OEM</td>
              </tr>
              <tr>
                <td>Xuất xứ thương hiệu</td>
                <td>Trung Quốc</td>
              </tr>
              <tr>
                <td>Xuất xứ</td>
                <td>Trung Quốc</td>
              </tr>
              <tr>
                <td>SKU</td>
                <td>9911662691998</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-9 col-lg-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Mô tả sản phẩm</div>
        <div class="card-body">
          <div class="product-description position-relative">
            <div :class="classContentToggle" v-html="currentProduct.description">

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


    <div class="col-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Đánh giá sản phẩm</div>
        <div class="card-body">
          <div class="row border-bottom" style="padding-bottom: 20px;">
            <div class="col-lg-6 col-md-12">
              <ProductReviewRating v-if="ratings.rating_count" :ratings="ratings"></ProductReviewRating>
            </div>
            <!--            <div class="col-lg-9 col-md-12">
                          <ReviewImage></ReviewImage>
                        </div>-->
          </div>

          <div class="feedback d-flex flex-column">
            <template v-for="review in reviews">
              <ProductReviewComment :key="'rv' +review.id" :review="review"></ProductReviewComment>
            </template>
          </div>

          <div class="my-4 d-flex float-right">
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
//import ReviewImage from "../components/ReviewImage";
import ProductSeller from "../components/ProductSeller";
import ProductReviewComment from "../components/ProductReviewComment";
import ProductReviewRating from "../components/ProductReviewRating";
import {mapGetters} from "vuex";
import {CART_ADD, FETCH_ADDRESSES, FETCH_REVIEWS, GET_PRODUCT} from "../store/actions.type";
import {ProductMixin} from "../mixins/product.mixin";
import {HandleFavourite} from "../mixins/favourite.handle";
import {HandleRedirect} from "../mixins/redirect.handle";

export default {
  props: {},
  mixins: [ProductMixin, HandleFavourite,HandleRedirect],
  data() {
    return {
      id: "",
      isShowMoreContent: false,
      quantity: 1,
    }
  },

  created() {
    this.$store.dispatch(FETCH_ADDRESSES);
    this.loadingData();
  },
  methods: {
    loadingData() {
      const {slug} = this.$route.params;
      this.$store.dispatch(GET_PRODUCT, slug)
          .then(() => {
            this.$store.dispatch(FETCH_REVIEWS, {product_id: this.currentProduct.id});
          })
    },

    changeQuantity(n) {
      let temp = this.quantity + n;
      const {amount} = this.product;
      if (temp <= 0 || temp > amount) {
        this.$toast.error('Số lượng mua không hợp lệ', {
          duration: 5000,
          position: 'top-left'
        })
        return;
      }
      this.quantity = temp;
    },

    addToCart() {
      const {id} = this.product;
      if (!this.isAuthenticated){
        this.$toast.error('Vui lòng đăng nhập để tiếp tục', {
          duration: 5000,
          position: 'top-left'
        })
        return;
      }
      this.$store.dispatch(CART_ADD, {product_id: id, amount: this.quantity})
          .then(() => {
            this.$toast.success('Thêm vào giỏ hàng hàng thành công', {
              duration: 5000,
              position: 'top-left'
            })
          });
    }
  },
  computed: {
    ...mapGetters(["currentProduct", "isAuthenticated", "defaultAddress", "listReviews","isAuthenticated"]),


    product() {
      return this.currentProduct;
    },

    classContentToggle() {
      const {isShowMoreContent} = this;
      return {
        toggle: true,
        show: isShowMoreContent
      }
    },

  },
  components: {
    ProductReviewRating,
    //ReviewImage,
    ProductReviewComment,
    ProductSeller,
  },
  watch: {
    '$route.params': {
      handler() {
        this.loadingData();
      }
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
    cursor: pointer;

    &.active {
      color: #dc3545;
      box-shadow: rgb(238 160 160) 0px 2px 6px 0px;
    }
  }
}

.review-image {
  margin-top: 10px;

  .view-photo {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 4px;
    margin-right: 8px;
    margin-top: 8px;
    overflow: hidden;
    opacity: 0.85;
    cursor: pointer;

    &.active {
      box-shadow: rgb(120 120 120) 0px 2px 6px 0px;
    }

    &:last-child {
      span {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        text-align: center;
        top: 0;
        left: 0;
        color: #fff;
        font-size: 11px;
        background-color: rgba(0, 0, 0, 0.7);
        user-select: none;
        padding: 0px 2px;
      }
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
    font-size: 1em;
    margin-right: 15px;
    text-decoration: line-through;
  }

  .decrease-discount {
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




