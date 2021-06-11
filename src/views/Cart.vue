<template>
  <div class="row">
    <div v-if="totalCount > 0" class="col-lg-9 col-md-12">
      <div class="card position-relative" style="background-color: unset; border: none">
        <div class="card-title text-uppercase">GIỎ HÀNG</div>
        <template v-for="supplier in suppliers">
          <CartSupplierComponent :key="'or_sp' + supplier.id" :supplier="supplier"
                                 @loadingData="loadingData"></CartSupplierComponent>
        </template>
      </div>
    </div>
    <div v-if="totalCount > 0" class="col-lg-3 col-md-12">
      <div class="row">
        <!--        <div class="delivery-address col">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex flex-column">
                        <div class="d-flex justify-content-between">
                          <div class="font-weight-bold">Địa chỉ nhận hàng</div>
                          <router-link tag="div" :to="{name:'customer.address'}" class="action-change">Thay đổi</router-link>
                        </div>
                        <div v-if="defaultAddress.name">
                          <div class="d-flex align-items-center mt-2">
                            <div class="name-customer mr-1">{{ defaultAddress.name }}</div>
                            <div class="line-straight"></div>
                            <div class="phone-customer ml-1">{{ defaultAddress.phone }}</div>
                          </div>
                          <div class="address-customer d-flex mt-2">
                            {{ defaultAddress.address }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>-->
        <div class="coupon col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                  <div class="font-weight-bold">Khuyến mãi</div>
                  <div style="font-size: 0.9em;color: #a7a3a3">Có thể chọn ?</div>
                </div>
                <div class="list-coupon d-flex flex-column mt-3">
                  <div style="cursor: pointer;font-size: 0.98em;color: deepskyblue"
                       @click="showModalCouponGlobal = true">
                    <i class="fa fa-ticket-alt" aria-hidden="true"></i>
                    Chọn hoặc nhập Khuyến mãi
                  </div>
                  <div class="mt-2" @click="showModalCouponGlobal = true">
                    <span v-if="couponGlobalInUse" class="badge badge-primary" style="padding: 6px 8px;cursor: pointer">
                      Giảm {{ couponGlobalDetail.percent }} %
                  </span>
                  </div>
                </div>
                <ModalAddCouponGlobal v-if="showModalCouponGlobal"
                                      @exit="showModalCouponGlobal = false">

                </ModalAddCouponGlobal>
              </div>
            </div>
          </div>
        </div>
        <div class="cost-box col-12">
          <div class="card">
            <div class="d-flex flex-column">
              <div class="box-item d-flex justify-content-between">
                <div>Tạm tính</div>
                <div id="temp-cost">{{ totalTempPrice | currency }}</div>
              </div>
              <div class="box-item d-flex justify-content-between">
                <div>Giảm giá</div>
                <div id="discount-cost">{{ totalDiscountPrice | currency }}</div>
              </div>
              <div class="box-item d-flex justify-content-between">
                <div>Thành tiền</div>
                <div id="total-cost">{{ totalPrice |currency }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="purchase col mt-3">
          <button class="purchase-btn btn btn-block btn-danger text-uppercase" @click="orderCart()"
                  :disabled="!isDisabled">Tiến hành đặt hàng
          </button>
        </div>
      </div>
    </div>
    <div v-else class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="card-empty">
            <img class="bg-empty" src="images/cart/undraw_empty_cart_co35.png" alt="">
            <p class="description">Giỏ hàng của bạn còn trống</p>
            <button class="btn btn-sm btn-danger" @click="redirect('home')">Mua sắm ngay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CartSupplierComponent from "../components/Cart/CartSupplierComponent";
import ModalAddCouponGlobal from "../components/Cart/ModalAddCouponGlobal";
import {FETCH_CART, GET_LIST_DISCOUNT_CODE_GLOBAL} from "../store/actions.type";
import {HandleRedirect} from "../mixins/redirect.handle";
import {CheckoutMixin} from "../mixins/checkout.mixin";

export default {

  mixins: [HandleRedirect, CheckoutMixin],
  created() {
    this.loadingData();
  },

  data() {
    return {
      isLoading: true,
      showModalCouponGlobal: false
    }
  },

  methods: {
    loadingData() {
      // this.$store.dispatch(FETCH_CART)
      //     .then(() => {
      //       return this.$store.dispatch(ADDRESS_DEFAULT_GET)
      //     })
      Promise.all([
        this.$store.dispatch(FETCH_CART),
        this.$store.dispatch(GET_LIST_DISCOUNT_CODE_GLOBAL)
      ]);
    },

    orderCart() {
      return this.redirect('checkout.payment');
    },

  },
  computed: {

    isDisabled() {
      const {cart, isAvailable} = this;
      return cart && cart.total_count > 0 && isAvailable;
    },

    couponGlobalDetail() {
      let coupon = this.globalCoupons.data.find(item => item.code == this.couponGlobalInUse);
      return coupon || {};
    }
  },
  components: {
    CartSupplierComponent,
    ModalAddCouponGlobal
  },
}
</script>

<style lang="scss">

.delivery-address {
  .action-change {
    cursor: pointer;
    color: #2475a0;
    font-size: 0.9em;
  }

  .name-customer {
    font-weight: 600;
    font-size: 1em;
  }

  .phone-customer {
    @extend .name-customer
  }

  .address-customer {
    font-size: 0.85em;
  }
}


.coupon {
  .coupon-item {
    background: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 5px;
    padding: 15px 10px;
    border: #ffffff 1px solid;
    margin-bottom: 10px;

    &.active {
      background: rgba(141, 214, 215, 0.5);
      border-color: #44a5ca;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .coupon-name {
      font-size: 0.9em;
      font-weight: 600;
    }
  }
}


.cost-box {
  .box-item {
    padding: 0.5em 1em;

    &:last-child {
      border-top: rgba(162, 160, 160, 0.5) 1px solid;
    }

    div {
      &:nth-child(1) {
        color: #212020;
      }
    }

    #total-cost {
      font-size: 1.4rem;
      font-weight: 600;
      color: #f86262;
    }
  }

}


</style>