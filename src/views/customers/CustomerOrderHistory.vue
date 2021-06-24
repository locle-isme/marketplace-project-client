<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Quản lý đơn hàng</div>
      <div class="card-body">
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
        <div v-if="totalCount == 0" class="card-empty">
          <img class="bg-empty" src="/images/undraw/undraw_web_shopping_dd4l.png" alt="">
          <p class="description">Bạn chưa có đơn hàng nào</p>
          <button class="btn btn-sm btn-danger" @click="goHome">Mua sắm ngay</button>
        </div>
        <div v-if="totalCount > 0" class="table-xl table-responsive">
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
            <transition-group name="fade" tag="tbody">
              <template v-for="order in orders.data">
                <tr :key="'order' + order.id">
                  <td>
                    <router-link :to="{name:'customer.order.detail', params:{orderID: order.id}}">
                      <span style="cursor: pointer" class="text-primary">#{{ order.id }}</span>
                    </router-link>
                  </td>
                  <td class="">{{ order.created_at | time_date }}</td>
                  <td>{{ order.description }}</td>
                  <td>{{ order.grand_total | currency }}</td>
                  <td class="text-right">{{ order.status_text }}</td>
                </tr>
              </template>
            </transition-group>
          </table>
        </div>
        <div class="my-4 d-flex justify-content-center mx-auto w-25">
          <button v-show="isShowViewMoreBtn" class="btn btn-sm btn-info btn-block btn-view-more"
                  @click="loadMorePage">Xem thêm
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

import {mapGetters} from "vuex";
import {FETCH_ORDERS} from "../../store/actions.type";
import {PageMixin} from "../../mixins/page.mixin";
import {HandleRedirect} from "../../mixins/redirect.handle";

export default {
  mixins: [PageMixin, HandleRedirect],
  data() {
    return {
      status_texts: {
        processing: 'Đơn hàng đang xử lý',
        delivered: 'Giao hàng thành công',
        cancel: 'Đơn hàng đã hủy',
      },
      limit: 10
    }
  },
  created() {
    this.loadingData();
  },

  methods: {
    goHome() {
      this.redirect('home');
    },
    loadingData() {
      const {offset} = this;
      this.$store.dispatch(FETCH_ORDERS, {offset})
    },
    status_text(index) {
      const {status_texts} = this;
      return status_texts[index];
    }
  },
  computed: {
    ...mapGetters(["orders", "isLoading"]),

    totalCount() {
      const {total_count} = this.orders;
      return total_count;
    },
    isShowViewMoreBtn() {
      const {offset, totalCount} = this;
      return offset < totalCount;
    }
  },

  watch: {
    currentPage() {
      this.loadingData();
    },
  },
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