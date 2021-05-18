<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Quản lý đơn hàng</div>
      <div class="card-body">
        <div class="table-xl table-responsive">
          <table class="table mt-3">
            <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày mua</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái đơn hàng</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="order in orders.data">
              <tr :key="'order' + order.id">
                <td>
                  <router-link :to="{name:'customer.order.detail', params:{orderID: 1}}">
                    <span style="cursor: pointer" class="text-primary">#{{ order.id }}</span>
                  </router-link>
                </td>
                <td class="">{{ order.created_at | time_date }}</td>
                <td>{{ order.description }}</td>
                <td>{{ order.grand_total | currency }}</td>
                <td class="text-right">{{ status_text(order.status) }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        <div class="my-4 d-flex float-right">

        </div>

      </div>
    </div>
  </div>
</template>
<script>

import {mapGetters} from "vuex";
import {FETCH_ORDERS} from "../../store/actions.type";

export default {
  data() {
    return {
      status_texts: {
        delivered: 'Giao hàng thành công',
        cancel: 'Đơn hàng đã hủy',
      }
    }
  },
  created() {
    this.$store.dispatch(FETCH_ORDERS)
        .then(() => {

        })
  },

  methods: {
    status_text(index) {
      const {status_texts} = this;
      return status_texts[index];
    }
  },
  computed: {
    ...mapGetters(["orders"]),

  },
  name: "CustomerOrderHistory",
  components: {}
}
</script>

<style lang="scss">
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

      &:last-child {
        text-align: right;
      }
    }
  }

  tbody {
    td {
      color: rgb(51, 51, 51);
      font-size: 0.95em;
      font-weight: 200;

      &:last-child {
        text-align: right;
      }
    }
  }


}
</style>