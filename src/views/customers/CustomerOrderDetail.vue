<template>
  <div class="col-xl-9 col-md-12">
    <div class="card" style="border: unset;background: unset">
      <div class="card-title d-flex align-items-center justify-content-between" style="width: 100%">
        <div>
          <span style="font-size: 1em">Chi tiết đơn hàng #{{ orderID }} - </span>
          <span style="font-size: 1em">{{ statusText }}</span>
        </div>
        <button v-if="status == 'processing'" class="float-right btn btn-sm btn-danger" @click="cancelOrder()">
          Hủy đơn
        </button>
      </div>

      <div class="mt-4"><span style="font-size: 0.8em">Ngày đặt hàng: {{ createdAt | date }}</span></div>
      <div class="row">
        <div class="col">
          <div class="notification card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">THÔNG BÁO</div>
            <div class="card-body">
              <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
              <div class="d-flex">
                <span style="min-width: 150px" class="text-dark">{{ latestHistory.created_at | date }}</span>
                <span style="text-align: justify">Đơn hàng của quý khách {{ latestHistory.text }}.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6" style="margin-top: 18px">

          <div class="shipping card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">ĐỊA CHỈ NGƯỜI NHẬN</div>
            <div class="card-body">
              <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>

              <div class="mt-1">
                <span class="text-uppercase font-weight-bold text-dark">{{ shippingAddress.name }}</span>
              </div>
              <div class="mt-1">
                <span style="color: #959595">Địa chỉ:&nbsp;</span>
                <span>{{ shippingAddress.address }}</span>
              </div>
              <div class="mt-1">
                <span style="color: #959595">Điện thoại: &nbsp;</span>
                <span>{{ shippingAddress.phone }}</span>
              </div>
            </div>
          </div>
        </div>
        <!--        <div class="col-xl-4" style="margin-top: 18px">
                  <div class="shipping card">
                    <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">HÌNH THỨC GIAO HÀNG</div>
                    <div class="card-body">
                      <div class="mt-1">
                        <span style="color: #959595">Giao vào &nbsp;</span>
                        <span>Thứ sáu, 05/06</span>
                      </div>
                      <div class="mt-1">
                        <span style="color: #959595">Phí vận chuyển:&nbsp;</span>
                        <span>19.000đ</span>
                      </div>
                    </div>
                  </div>
                </div>-->
        <div class="col-xl-6" style="margin-top: 18px">

          <div class="shipping card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">HÌNH THỨC THANH TOÁN</div>
            <div class="card-body">
              <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
              <div class="mt-1">
                <span>{{ typePayment }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
          <div class="card">
            <div class="card-body">
              <div class="table-xl table-responsive">
                <table class="table">
                  <thead>
                  <th>Sản phẩm</th>
                  <th class="text-right">Đơn Giá</th>
                  <th class="text-center">Số lượng</th>
                  <!--                  <th class="text-right">Giảm giá</th>-->
                  <th class="text-right">Tạm tính</th>
                  </thead>
                  <tbody>
                  <template v-for="(item, index) in items">
                    <DetailProductItem :key="'item' + index" :product="item"></DetailProductItem>
                  </template>
                  <tr>
                    <td colspan="3">
                      <span class="float-right" style="color: rgb(51, 51, 51); font-size: 1.15em">Tổng tiền hàng</span>
                    </td>
                    <td>
                      <span style="font-size: 1.15em" class="float-right">{{ currentOrder.price | currency }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="border: unset">
                      <span class="float-right" style="color: rgb(51, 51, 51); font-size: 1.15em">Giảm giá</span></td>
                    <td style="border: unset">
                      <span style="font-size: 1.15em" class="float-right">{{ currentOrder.discount | currency }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="">
                      <span class="float-right" style="color: rgb(78,78,78);font-size: 1.2em">Tổng kết</span>
                    </td>
                    <td style="">
                      <span class="text-danger font-weight-bold float-right"
                            style="font-size: 1.2em">{{ currentOrder.grand_total | currency }}</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailProductItem from "../../components/Customer/order/DetailProductItem";
import {mapGetters} from "vuex";
import {GET_ORDER, ORDER_CANCEL} from "../../store/actions.type";
import {toastSuccess, toastError} from "../../common/toast";
import firstError from "../../common/filter.error";

export default {
  data() {
    return {
      typePayments: {
        "COD": "Thanh toán tiền mặt khi nhận hàng",
        "AIRPAY": "Thanh toán ví điện tử trực tuyến AIRPAY",
      },
    }
  },
  created() {
    this.loadingData();
  },
  methods: {
    async loadingData() {
      try {
        await this.$store.dispatch(GET_ORDER, this.$route.params.orderID);
      } catch (e) {
        console.log(e)
      }
    },

    async cancelOrder() {
      try {
        await this.$store.dispatch(ORDER_CANCEL, this.$route.params.orderID);
        toastSuccess('Hủy đơn hàng thành công');
        await this.$router.push({name: 'customer.order.history'});
      } catch (errs) {
        for (let name_err in errs) {
          toastError(firstError(errs[name_err]));
        }

      }
    }
  },
  computed: {
    ...mapGetters(["currentOrder", "isLoading"]),
    shippingAddress() {
      const {shipping_address} = this.currentOrder;
      return shipping_address || {};
    },
    orderID() {
      return this.$route.params.orderID;
    },

    typePayment() {
      const {payment_type} = this.currentOrder;
      return this.typePayments[payment_type] || "OH NO!";
    },

    status() {
      const {status} = this.currentOrder;
      return status;
    },
    statusText() {
      const {status_text} = this.currentOrder;
      return status_text;
    },
    items() {
      const {items} = this.currentOrder;
      return items || [];
    },

    createdAt() {
      const {created_at} = this.currentOrder;
      return created_at;
    },

    latestHistory() {
      const {latest_history} = this.currentOrder;
      return latest_history || {};
    }
  },

  watch: {
    orderID() {
      this.loadingData();
    }
  },

  components: {
    DetailProductItem
  },
}
</script>

<style lang="scss">


.notification {
  span {
    font-size: 0.95em;
    color: #6b6b6b;
  }
}

.shipping {
  height: calc(100% - 25px);

  .card-body {
    span {
      font-size: 0.9em;
      color: #6b6b6b;
    }
  }
}

.table-xl {
  thead {
    th {
      vertical-align: top;
      min-width: 130px;
      padding: 15px 15px;
      color: rgb(120, 120, 120);
      font-size: 1.1em;
      font-weight: 400;
      text-align: left;


    }
  }

  tbody {
    td {
      color: rgb(51, 51, 51);
      font-size: 0.95em;
      font-weight: 200;
    }
  }
}

</style>