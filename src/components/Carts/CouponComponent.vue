<template>
  <div class="coupon-item d-flex" :class="classCouponItem">
    <div class="avatar">
      <img class="img-thumbnail" :src="supplier.avatar" alt="">
    </div>
    <div class="description d-flex flex-grow-1 justify-content-between align-items-center">
      <div class="d-flex flex-column">
        <div class="coupon-name">Giảm {{ discount_code.percent }}% Đơn tổi thiểu
          {{ discount_code.from_price | currency }}
          Giảm tối đa {{ discount_code.max_price | currency }}
        </div>
        <span class="date">HSD: {{ discount_code.end_date | time_date }}</span>
      </div>
      <div style="min-width: 80px;" class="float-left">
        <button v-if="isActive" class="btn btn-warning btn-sm float-right"
                @click="unselectCounpon()">Bỏ
          chọn
        </button>
        <button v-else class="btn btn-primary btn-sm float-right"
                @click="selectCoupon()" :disabled="!isValid">Áp
          dụng
        </button>

      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import {REMOVE_COUPON_SUPPLIER_IN_USE, SET_COUPON_SUPPLIER_IN_USE} from "../../store/mutations.type";

export default {
  props: {
    discount_code: {
      type: Object,
      required: true
    },
    supplier: {
      type: Object,
      required: true
    }
  },

  data() {
    return {active: false}
  },

  methods: {
    selectCoupon() {
      const {id} = this.supplier;
      const payload = {supplier_id: id, discount_code: this.discount_code};
      this.$store.commit(SET_COUPON_SUPPLIER_IN_USE, payload);
    },

    unselectCounpon() {
      const {id} = this.supplier;
      const payload = {supplier_id: id, discount_code: this.discount_code};
      this.$store.commit(REMOVE_COUPON_SUPPLIER_IN_USE, payload);
    },
    realPrice(product) {
      const {price, discount} = product;
      return price * (100 - discount) / 100;
    },
  },
  computed: {
    ...mapGetters(["couponSupplierInUse"]),

    classCouponItem() {
      return {
        active: this.isActive,
      };
    },
    isValid() {
      const {from_price} = this.discount_code;
      return from_price < this.totalPrice;
    },
    isActive() {
      const {code} = this.discount_code;
      let temp = this.couponSupplierInUse.find(c => c.discount_code.code == code);
      return !!temp || false;
    },

    totalPrice() {
      const {products} = this.supplier;
      let total = products.reduce((accumulator, product) => {
        return accumulator + this.realPrice(product) * product.quantity;
      }, 0);
      return total;
    },
  },
  watch: {

  },
  name: "CouponComponent"
}
</script>
<style lang="scss">
.coupon-item {
  .description {
    .btn {
      &:disabled {
        cursor: not-allowed;
      }
    }
  }
}
</style>