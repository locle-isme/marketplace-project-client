<template>
  <div class="col-xl-9 col-md-12">
    <div class="card" style="border: unset;background: unset">
      <div class="card-title"><span style="font-size: 1em">Chi tiết đơn hàng #310229992 - </span> <span
          style="font-size: 1em">Giao hàng thành công</span></div>
      <div class="mt-4"><span style="font-size: 0.8em">Ngày đặt hàng: 13:20 02/06/2020</span></div>
      <div class="row">
        <div class="col">
          <div class="notification card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">THÔNG BÁO</div>
            <div class="card-body">
              <div class="d-flex">
                <span style="min-width: 150px" class="text-dark">14:01 05/06/2020</span>
                <span style="text-align: justify">Chúng tôi vừa bàn giao đơn hàng của quý khách đến đối tác vận chuyển Tiki Team. Đơn hàng của quý khách sẽ được giao trong ngày hôm nay 05/06/2020</span>
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
              <div class="mt-1">
                <span>{{typePayment}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
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
                  <template v-for="(item, index) in currentOrder.items">
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
import {GET_ORDER} from "../../store/actions.type";

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
    loadingData() {
      return this.$store.dispatch(GET_ORDER, this.$route.params.orderID)
          .then(() => {

          })
    },
  },
  computed: {
    ...mapGetters(["currentOrder"]),
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