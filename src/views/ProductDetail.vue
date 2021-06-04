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
                        <button class="btn btn-block btn-danger font-weight-bold"
                                @click="addToCart" :disabled="isDisabledAddToCartBtn">{{ textAddToCartBtn }}
                        </button>
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
          <div v-if="!reviews.length" class="d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80" height="80"
                 viewBox="0 0 80 80">
              <defs>
                <path id="84a10d52-23b2-4565-b512-4d64e4186416-a"
                      d="M43.716 5.432l2.859 10.239a7.29 7.29 0 004.228 4.796l9.682 3.99c5.349 2.204 6.112 9.605 1.327 12.87l-8.661 5.913a7.327 7.327 0 00-3.158 5.57l-.708 10.613c-.39 5.86-7.057 8.872-11.592 5.235l-8.212-6.585a7.085 7.085 0 00-6.18-1.354l-10.12 2.57c-5.59 1.418-10.473-4.122-8.492-9.635l3.585-9.982a7.441 7.441 0 00-.66-6.407L2.067 24.24c-3.064-4.985.584-11.419 6.344-11.189l10.428.415a7.106 7.106 0 005.772-2.606l6.692-8.147C35-1.787 42.136-.223 43.716 5.433z"></path>
                <path id="84a10d52-23b2-4565-b512-4d64e4186416-c"
                      d="M28.34 5.431l2.86 10.24c.608 2.176 2.168 3.947 4.227 4.796l9.683 3.99c5.348 2.204 6.111 9.604 1.328 12.87l-8.662 5.913a7.326 7.326 0 00-3.158 5.57l-.709 10.613c-.026.39-.08.766-.159 1.13C12.394 55.609-1.723 35.19.251 13.338l3.213.127a7.1 7.1 0 005.77-2.606l6.694-8.147c3.696-4.499 10.834-2.935 12.412 2.72z"></path>
                <path id="84a10d52-23b2-4565-b512-4d64e4186416-e"
                      d="M29.628 11.393c.658-3.136 3.67-5.132 6.73-4.458 3.06.673 5.007 3.761 4.35 6.897-.657 3.135-3.67 5.132-6.73 4.458-3.06-.674-5.007-3.761-4.35-6.897zM7.276.53c3.059.674 5.006 3.762 4.349 6.898-.657 3.135-3.67 5.132-6.729 4.457-3.06-.674-5.007-3.762-4.35-6.897.657-3.136 3.67-5.131 6.73-4.458z"></path>
                <path id="84a10d52-23b2-4565-b512-4d64e4186416-g"
                      d="M.75 8.56c.165-.784.919-1.283 1.683-1.114l3.957.87c.765.169 1.252.942 1.087 1.725-.164.784-.917 1.283-1.682 1.114l-.499-.11c-.422 5.407 3.124 10.446 8.436 11.616 5.311 1.17 10.564-1.932 12.346-7.04l-.5-.11c-.764-.168-1.251-.94-1.086-1.724.163-.784.917-1.283 1.682-1.114l3.957.871c.765.169 1.252.94 1.087 1.724-.164.784-.918 1.283-1.682 1.114l-.666-.146c-2.126 6.674-8.892 10.77-15.734 9.264-6.84-1.506-11.369-8.09-10.633-15.069l-.665-.147C1.074 10.116.587 9.344.75 8.56zm21.025-4.917c.164-.783.917-1.282 1.683-1.114l.276.06c.765.17 1.252.941 1.087 1.725-.164.784-.917 1.283-1.682 1.114l-.277-.06c-.764-.169-1.251-.94-1.087-1.725zM12.655.15l.277.061c.765.168 1.252.941 1.087 1.724-.164.785-.917 1.284-1.682 1.115l-.278-.06c-.764-.17-1.25-.941-1.087-1.725.165-.785.918-1.283 1.683-1.115z"></path>
              </defs>
              <g fill="none" fill-rule="evenodd" opacity="0.997">
                <g transform="rotate(-12 67.32 3.796)">
                  <mask id="84a10d52-23b2-4565-b512-4d64e4186416-b" fill="#fff">
                    <use xlink:href="#84a10d52-23b2-4565-b512-4d64e4186416-a"></use>
                  </mask>
                  <path fill="#C7C7C7" d="M-6.732-7.793h79.409v81.922H-6.732z"
                        mask="url(#84a10d52-23b2-4565-b512-4d64e4186416-b)"></path>
                </g>
                <g transform="rotate(-12 59.633 -69.346)">
                  <mask id="84a10d52-23b2-4565-b512-4d64e4186416-d" fill="#fff">
                    <use xlink:href="#84a10d52-23b2-4565-b512-4d64e4186416-c"></use>
                  </mask>
                  <path fill="#E0E0E0" d="M-7.62-7.793h64.921v76.236H-7.62z"
                        mask="url(#84a10d52-23b2-4565-b512-4d64e4186416-d)"></path>
                </g>
                <g transform="rotate(-12 159.533 -57.659)">
                  <mask id="84a10d52-23b2-4565-b512-4d64e4186416-f" fill="#fff">
                    <use xlink:href="#84a10d52-23b2-4565-b512-4d64e4186416-e"></use>
                  </mask>
                  <path fill="#C7C7C7" d="M-7.269-7.49h55.792v33.801H-7.269z"
                        mask="url(#84a10d52-23b2-4565-b512-4d64e4186416-f)"></path>
                </g>
                <g transform="rotate(-12 162.44 -80.152)">
                  <mask id="84a10d52-23b2-4565-b512-4d64e4186416-h" fill="#fff">
                    <use xlink:href="#84a10d52-23b2-4565-b512-4d64e4186416-g"></use>
                  </mask>
                  <path fill="#000" fill-opacity="0.54" d="M-6.969-7.773h45.907v41.475H-6.969z"
                        mask="url(#84a10d52-23b2-4565-b512-4d64e4186416-h)"></path>
                </g>
              </g>
            </svg>
            <span>Chưa có đánh giá nào cho sản phầm này từ <b>{{ supplier.nameOfShop }}</b></span>
          </div>
          <div v-else>
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

  </div>
</template>
<script>
//import ReviewImage from "../components/ReviewImage";
import ProductSeller from "../components/ProductSeller";
import ProductReviewComment from "../components/ProductReviewComment";
import ProductReviewRating from "../components/ProductReviewRating";
import {mapGetters} from "vuex";
import {CART_ADD, FETCH_ADDRESSES, FETCH_REVIEWS, GET_PRODUCT} from "../store/actions.type";
import {HandleFavourite} from "../mixins/favourite.handle";
import {HandleRedirect} from "../mixins/redirect.handle";
import {ProductMixin} from "../mixins/product.mixin";

export default {
  props: {},
  mixins: [HandleFavourite, HandleRedirect, ProductMixin],
  data() {
    return {
      minProducts: 25,
      defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
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
      if (!this.isAuthenticated) {
        this.$toast.error('Vui lòng đăng nhập để tiếp tục', {
          duration: 5000,
          position: 'top-left'
        })
        return;
      }
      this.$store.dispatch(CART_ADD, {product_id: id, quantity: this.quantity})
          .then(() => {
            this.$toast.success('Thêm vào giỏ hàng hàng thành công', {
              duration: 5000,
              position: 'top-left'
            })
          })
          .catch((error) => {
            console.log(error)
            this.$toast.error('Có lỗi sảy ra', {
              duration: 5000,
              position: 'top-left'
            })
          });
    }
  },
  computed: {
    ...mapGetters(["currentProduct", "isAuthenticated", "defaultAddress", "listReviews", "isAuthenticated"]),


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

    textAddToCartBtn() {
      const {isAvailable, amount} = this;
      if (amount <= 0) return "Hết hàng";
      if (!isAvailable) return "Tạm ngừng kinh doanh";
      return "Thêm vào giỏ hàng";
    },

    isDisabledAddToCartBtn() {
      const {isAvailable, amount} = this;
      return !isAvailable || amount <= 0;
    }


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




