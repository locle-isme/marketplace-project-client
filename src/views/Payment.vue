<template>
  <div class="payment row">
    <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>

    <div class="col-12">
      <div class="card">
        <div class="card-title text-uppercase">1. Sản phẩm</div>
        <div class="card-body">
          <button class="btn btn-sm btn-dark float-right" @click="redirect('checkout.cart')">Chỉnh sửa</button>
          <div class="table-xl table-responsive">
            <table class="table table-borderless mt-3">
              <thead>
              <tr>
                <th>Sản phẩm</th>
                <th class="text-right">Đơn giá</th>
                <th class="text-center">Số lượng</th>
                <th class="text-right">Thành tiền</th>
              </tr>
              </thead>
              <template v-for="supplier in suppliers">
                <SupplierItem :key="'pm_sp' + supplier.id" :supplier="supplier"
                              @loadingData="loadingData"></SupplierItem>
              </template>
              <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="d-flex justify-content-between">
                    <div class="text-box-price mr-3">Tạm tính:</div>
                    <div class="text-box-price">{{ totalTempPrice | currency }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="d-flex justify-content-between">
                    <div class="text-box-price mr-3">Giảm giá:</div>
                    <div class="text-box-price">{{ totalDiscountPrice | currency }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="d-flex justify-content-between" style="color: #ff250f">
                    <div class="text-box-price total text-danger mr-3">Thành tiền:</div>
                    <div class="text-box-price total text-danger">{{ totalPrice |currency }}</div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-6 col-md-12">
      <div class="card">
        <div class="card-title text-uppercase">2. Địa chỉ nhận hàng</div>
        <div class="card-body">
          <button v-if="listAddresses.length == 0" class="btn btn-sm btn-danger" style="margin-left: 20px;"
                  @click="redirect('customer.address')">
            Thêm địa chỉ
          </button>
          <div v-if="defaultAddress.name && !isChangeAddress" class="d-flex flex-row align-items-center flex-wrap">
            <div style="margin-left: 15px;">{{ defaultAddress.name }}</div>
            <div style="margin-left: 15px;">({{ defaultAddress.phone }})</div>
            <div style="margin-left: 15px;">{{ defaultAddress.address }}</div>
            <button class="btn btn-sm btn-danger" style="margin-left: 20px;" @click="isChangeAddress = true">
              Thay đổi địa chỉ
            </button>
          </div>

          <div v-if="isChangeAddress" class="d-flex flex-column mt-2">
            <ul>
              <template v-for="address in listAddresses">
                <li :key="'ad' + address.id">
                  <label class="custom-label">
                    <input v-model="addressIDSelected" type="radio" :value="address.id">
                    <span class="radio-fake"></span>
                    <div class="label">
                      <div class="d-flex flex-wrap">
                        <div class="title" style="margin-left: 15px;">{{ address.name }}</div>
                        <div class="title" style="margin-left: 15px;">({{ address.phone }})</div>
                        <div class="title" style="margin-left: 15px;">{{ address.address }}</div>
                      </div>
                    </div>
                  </label>
                </li>

                <!--              <div :key="'ad' + address.id" class="custom-control custom-radio my-1 ml-3">-->
                <!--                <input v-model="addressIDSelected" class="custom-control-input" type="radio" name="address"-->
                <!--                       :id="'ad' + address.id" :value="address.id">-->
                <!--                <label class="custom-control-label" :for="'ad' + address.id">-->
                <!--                  <span class="mr-1 font-weight-bold">{{ address.name }}</span>-->
                <!--                  <span class="mr-3 font-weight-bold">{{ address.phone }}</span>-->
                <!--                  <span class="mr-3"> {{ address.address }}</span>-->
                <!--                </label>-->
                <!--              </div>-->
              </template>
              <button class="btn btn-sm btn-primary my-2" @click="isChangeAddress = false">Lưu thay đổi</button>
            </ul>
          </div>

        </div>
      </div>
    </div>
    <div class="col-xl-6 col-md-12">
      <div class="card">
        <div class="card-title text-uppercase">3. Hình thức thanh toán</div>
        <div class="card-body">
          <ul>
            <li>
              <label class="custom-label">
                <input v-model="paymentMethod" type="radio" value="COD">
                <span class="radio-fake"></span>
                <div class="label">
                  <div class="d-flex">
                    <img src="images/payment/methods/icon-payment-method-cod.svg" alt="">
                    <div class="title" style="margin-left: 15px;">Thanh toán bằng tiền mặt</div>
                  </div>
                </div>
              </label>
            </li>
          </ul>

          <div class="row">
            <div class="col-sm-4">
              <button class="btn w-100 btn-danger text-uppercase" :disabled="attributeDisabledButton"
                      @click="handleMethodPayment()">Đặt mua
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {FETCH_ADDRESSES, FETCH_CART, ORDER_CREATE} from "../store/actions.type";
import {mapGetters} from "vuex";
import {HandleRedirect} from "../mixins/redirect.handle";
import {CheckoutMixin} from "../mixins/checkout.mixin";

import SupplierItem from "../components/Payment/SupplierItem";
import {toastError} from "../common/toast";
import firstError from "../common/filter.error";

export default {
  mixins: [HandleRedirect, CheckoutMixin],
  created() {
    this.loadingData();
  },
  data() {
    return {
      addressIDSelected: null,
      isChangeAddress: false,
      paymentMethod: null,
    }
  },
  methods: {
    loadingData() {
      Promise.all([
        this.$store.dispatch(FETCH_CART),
        this.$store.dispatch(FETCH_ADDRESSES)
      ]);
    },

    async handleMethodPayment() {
      const {defaultAddress} = this;
      const {paymentMethod, addressIDSelected} = this;
      if (!defaultAddress || !defaultAddress.name) {
        return this.$toast.error("Bạn chưa thêm địa chỉ nhận hàng");
      }

      let formData = {
        address_id: addressIDSelected,
        payment_type: paymentMethod,
        coupon_global_use: this.couponGlobalInUse,
        coupon_suppliers_use: this.couponSupplierInUse,
      };


      try {
        await this.$store.dispatch(ORDER_CREATE, formData)
        await this.$store.dispatch(FETCH_CART)
        await this.$swal({
          title: "Đặt hàng thành công!",
          text: "Hệ thống sẽ chuyển hướng đến trang quản đơn hàng...",
          icon: "success",
          button: "Thoát!",
        });
        await this.redirect("customer.order.history");
      } catch (errs) {
        for (let name_err in errs) {
          toastError(firstError(errs[name_err]));
        }
      }
    }
  }
  ,
  computed: {
    ...
        mapGetters([
          "cart", "couponGlobalInUse", "globalCoupons",
          "couponSupplierInUse", "listAddresses", "isLoading"
        ]),

    defaultAddress() {
      const {addressIDSelected} = this;
      let address = addressIDSelected ? this.listAddresses.find(a => a.id == addressIDSelected) : this.listAddresses.find(a => a.active == 1);
      if (!address && this.listAddresses.length > 0) {
        address = this.listAddresses[0];
      }
      return address || {};
    }
    ,

    attributeDisabledButton() {
      return !this.paymentMethod;
    }
  }
  ,
  components: {
    SupplierItem,
  }
  ,
  name: "Payment"
}
</script>

<style lang="scss">
$th-color: rgba(62, 62, 62, 0.6);
.payment {
  .table {
    thead {
      th {
        &:nth-child(1) {
          min-width: 300px;
          font-size: 1.2em
        }

        &:nth-child(2) {
          color: $th-color;
        }

        &:nth-child(3) {
          color: $th-color;
        }

        &:nth-child(4) {
          color: $th-color;
        }

      }
    }

    tbody {
      tr {
        td {
          .text-box-price {
            font-size: 1.05em;

            &.total {
              font-weight: bold;
              font-size: 1.2em;
            }
          }
        }
      }
    }
  }

  ul {
    list-style-type: none;
    margin-left: -38px;

    .custom-label {
      display: block;

      input[type="radio"] {
        position: absolute;
        height: 1px;
        width: 1px;
        visibility: hidden;
        clip: rect(0px, 0px, 0px, 0px);
        opacity: 0;
      }

      .radio-fake {
        width: 22px;
        height: 22px;
        border: 1px solid rgb(120, 120, 120);
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        margin: 10px 13px 10px 0px;
        position: relative;
        z-index: 1;
        color: rgb(120, 120, 120);

        &:before {
          content: "";
          position: absolute;
          left: 5px;
          top: 5px;
          width: 10px;
          height: 10px;
          background-color: rgb(13, 92, 182);
          border-radius: 50%;
          transform: scale(0);
          transition: transform 0.3s ease 0s;
        }
      }

      .label {
        display: inline-block;
        vertical-align: middle;
        font-size: 1em;

        .title {
          line-height: 23px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>