<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="user-action position-absolute d-flex">
          <div class="single-action like-product active"><i class="fa fa-heart" aria-hidden="true"></i></div>
          <div class="single-action share-product"><i class="fa fa-share-alt" aria-hidden="true"></i></div>
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
                      <div v-if="currentProduct.discount > 0" class="root-price">{{
                          currentProduct.price | currency
                        }}₫
                      </div>
                      <div v-if="currentProduct.discount > 0" class="decrease-discount">-{{
                          currentProduct.discount
                        }}%
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
                          <button><i class="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <input type="text" value="1">
                          <button><i class="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </div>
                        <span v-if="isLimited" class="text-uppercase font-weight-bold"
                              style="color: #ff5113">CHỈ CÒN LẠI {{ currentProduct.amount }} SẢN PHẨM</span>
                      </div>
                      <div class="my-3">
                        <button v-if="currentProduct.amount > 0" class="btn btn-block btn-danger font-weight-bold">Chọn
                          mua
                        </button>
                        <button v-else class="btn btn-block btn-danger font-weight-bold" disabled>Hết hàng</button>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <div class="card-store d-flex flex-column">
                      <router-link tag="div" :to="{name:'store.global', params:{slug: 'demo1'}}"
                                   class="card-store-info d-flex align-items-center">
                        <div class="avatar">
                          <img src="https://vcdn.tikicdn.com/ts/seller/e3/84/1f/33b673123f5c858676ca98872184e9ee.png"
                               alt="">
                        </div>
                        <span class="name-store">Mogo</span>
                      </router-link>
                      <div class="seller-detail row">
                        <div class="col border-right">
                          <div class="d-flex flex-column align-items-center">
                            <div class="rate">4.8/5.0 <i class="fas fa-star text-warning"></i>
                            </div>
                            <span class="review">(88)</span>
                          </div>
                        </div>
                        <div class="col">
                          <div class="d-flex flex-column align-items-center">
                            <div class="follow">12</div>
                            <span class="review">Theo dõi</span>
                          </div>
                        </div>
                      </div>
                      <div class="buyer-action d-flex justify-content-center mt-3">
                        <button class="btn btn-outline-primary"><i class="fa fa-shopping-bag"></i>
                          Xem shop
                        </button>
                        <button class="btn btn-outline-primary"><i class="fas fa-plus"></i> Theo dõi
                        </button>
                      </div>
                    </div>
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
          <div class="row border-bottom" style="padding-bottom: 20px">
            <div class="col-lg-3 col-md-12">
              <ReviewRating></ReviewRating>
            </div>
            <!--            <div class="col-lg-9 col-md-12">
                          <ReviewImage></ReviewImage>
                        </div>-->
          </div>

          <div class="feedback d-flex flex-column">
            <template v-for="(feedback, i) in 8">
              <FeedbackUser :key="i"></FeedbackUser>
            </template>
          </div>

          <div class="my-4 d-flex float-right">
            <VPagination></VPagination>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
import ReviewRating from "../components/ReviewRating";
//import ReviewImage from "../components/ReviewImage";
import FeedbackUser from "../components/FeedbackUser";
import VPagination from "../components/VPagination";
import {mapGetters} from "vuex";
import {FETCH_ADDRESSES, GET_PRODUCT} from "../store/actions.type";

export default {
  props: {
    // slug: {
    //   type: String,
    //   required: true
    // }
  },

  data() {
    return {
      id: "",
      isShowMoreContent: false,
      limitedProduct: 30,
      defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
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
    },

    redirect(_name, params = {}) {
      this.$router.push({name: _name, params: params}).then(() => {
        this.statusShowNavBar = false;
      }).catch(() => {

      });
    },
  },
  computed: {
    ...mapGetters(["currentProduct", "isAuthenticated", "defaultAddress"]),
    brand() {
      const {brand} = this.currentProduct;
      return brand || {};
    },

    reviews() {
      const {reviews} = this.currentProduct;
      return reviews || [];
    },

    supplier() {
      const {supplier} = this.currentProduct;
      return supplier || {};
    },

    images() {
      const {images} = this.currentProduct;
      return images || [];
    },

    realPrice() {
      const {price, discount} = this.currentProduct;
      return price * (100 - discount) / 100;
    },

    isLimited() {
      const {amount} = this.currentProduct;
      return amount && amount < this.limitedProduct ? true : false;
    },

    classContentToggle() {
      const {isShowMoreContent} = this;
      return {
        toggle: true,
        show: isShowMoreContent
      }
    },

    firstImages() {
      const {images} = this.currentProduct;
      return images[0] ? images[0].url : this.defaultImage;
    },
  },
  components: {
    ReviewRating,
    //ReviewImage,
    FeedbackUser,
    VPagination
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
<style scoped>
.product-content .name-product {
  font-weight: 100;
  font-size: 21px;
}

@media (min-width: 1200px) {
  .product-content .name-product {

    max-width: 615px;
  }
}


.user-action {
  top: -35px;
  right: -30px;
}

.user-action > .single-action {
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
}

.user-action > .single-action.active {
  color: #dc3545;
  box-shadow: rgb(238 160 160) 0px 2px 6px 0px;
}

.review-image {
  margin-top: 10px;
}

.review-image > .view-photo {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 4px;
  margin-right: 8px;
  margin-top: 8px;
  overflow: hidden;
  opacity: 0.85;
  cursor: pointer;
}

.review-image > .view-photo img {
  width: 100%;
  height: 100%;
}

.review-image > .view-photo.active {
  box-shadow: rgb(120 120 120) 0px 2px 6px 0px;
}

.review-image > .view-photo:last-child span {
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


.card-price {
  margin: 15px 0px;
  padding: 10px 20px;
  background: #e9e9e9;
  border-radius: 5px;
}


.card-price > .current-price {
  font-size: 2rem;
  font-weight: 600;
  margin-right: 15px;
  color: #be0505;
}


.card-price > .root-price {
  font-size: 1rem;
  margin-right: 15px;
  text-decoration: line-through;
}

.card-price > .root-price {
  font-size: 1rem;
}

.card-address {
  margin-bottom: 20px;
  padding: 20px 0px;
  border-bottom: 1px #d2cece solid;
}

.card-address > span {
  margin-right: 20px;
}

.card-address > span.detail-address {
  font-weight: 600;
}

.card-address > span.change-address {
  font-weight: 600;
  color: #2a88bd;
  text-transform: uppercase;
  cursor: pointer;
}


.card-buy > .detail-mount > .up-down-amount-group {
  margin-right: 10px;
}

.card-buy > .detail-mount > .up-down-amount-group > button {
  width: 30px;
  height: 30px;
  padding: 4px;
  border: 1px #d6d6d6 solid;
  border-radius: 4px;
  background: #fff;
  margin: 0px 3px;
}

.card-buy > .detail-mount > .up-down-amount-group > button:hover {
  background: #7dd1e3;
  border-color: #59b7cd;
  color: #fff;
}

.card-buy > .detail-mount > .up-down-amount-group > input {
  height: 30px;
  width: 50px;
  padding: 4px;
  border: 1px #d6d6d6 solid;
  border-radius: 4px;
  font-size: 15px;
  text-align: center;
}

.card-buy > .detail-mount > span {
  margin: 10px 0px;
}

.card-buy > .detail-mount > span:first-child {
  margin-right: 10px;
}


.card-store {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
  padding: 10px 12px;
  border-radius: 5px;
}

.card-store > .card-store-info {
  cursor: pointer;
}


.card-store > .card-store-info > .avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card-store > .card-store-info > .avatar > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-store > .card-store-info > .name-store {
  margin-left: 15px;
  font-size: 1rem;
  font-weight: 600;
  color: #3e3e3e;
}

.card-store > .seller-detail {
  margin: 10px 0px;
}

.card-store > .seller-detail .rate, .card-store > .seller-detail .follow {
  font-size: 1.2em;
  font-weight: 600;
}

.card-store > .seller-detail .review {
  font-size: 0.8em;
}

.card-store > .buyer-action > .btn {
  margin-right: 3px;
}

table.product-detail tr > td:nth-child(1) {
  background: rgb(239, 239, 239);
  font-weight: 500;
}

table.product-detail tr > td {
  border: none;
}

table.product-detail tr:nth-child(odd) > td:nth-child(2) {
  background: rgba(239, 239, 239, 0.5);
}


.product-description > .toggle {
  min-height: 100px;
  max-height: 500px;
  overflow: hidden;
}

.product-description > .toggle.show {
  height: auto !important;
}

.product-description > .gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
}


</style>




