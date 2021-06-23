<template>
  <div class="coupon-item d-flex" :class="classCouponItem">
    <div class="avatar align-self-center">
      <img class="img-thumbnail" src="/images/logo/coupon-global.png" alt="">
    </div>
    <div class="description d-flex flex-grow-1 justify-content-between align-items-center">
      <div class="d-flex flex-column">
        <div class="coupon-name" style="font-size: 1em">Mặt hàng {{ category.name }}</div>
        <div class="coupon-name">
          Giảm {{ discount_code.percent }}%,
          Đơn tối thiểu {{ discount_code.from_price | currency }},
          Giảm tối đa {{ discount_code.max_price | currency }}.
        </div>
        <span class="date">HSD: {{ discount_code.end_date | time_date }}</span>
      </div>
      <div style="min-width: 80px;" class="float-left">
        <button v-if="isActive" class="btn btn-warning btn-sm float-right" @click="unselectCoupon()">
          Bỏ chọn
        </button>
        <button v-else class="btn btn-primary btn-sm float-right"
                :disabled="!isValid" @click="selectCoupon()">Áp dụng
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import {
  REMOVE_COUPON_GLOBAL_IN_USE,
  SET_COUPON_GLOBAL_IN_USE,
} from "../../store/mutations.type";

export default {
  props: {
    discount_code: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectCoupon() {
      const {code} = this.discount_code;
      this.$store.commit(SET_COUPON_GLOBAL_IN_USE, code);
    },

    unselectCoupon() {
      this.$store.commit(REMOVE_COUPON_GLOBAL_IN_USE);
    },

    totalCostCategoryOfSupplier(supplier) {
      const {products} = supplier;
      return products.reduce((acc, product) => {
        const {category, grand_total, available, quantity} = product;
        let value =
            (category.id == this.category.id || this.categoryChilds.indexOf(category.id) > -1) && available
                ? grand_total*quantity : 0;
        return acc + value;
      }, 0)
    }
  },
  computed: {
    ...mapGetters(["couponGlobalInUse", "cart"]),
    category() {
      const {category} = this.discount_code;
      return category;
    },
    categoryChilds() {
      return this.category.childs.map(child => child.id);
    },
    classCouponItem() {
      return {
        active: this.isActive,
      };
    },


    isActive() {
      const {code} = this.discount_code;
      return this.couponGlobalInUse == code;
    },

    isValid() {
      const {suppliers} = this.cart;
      const {from_price} = this.discount_code;
      return suppliers.some((supplier) => {
        let total = this.totalCostCategoryOfSupplier(supplier);
        return total > from_price;
      })
    },
  },
  watch: {},
  name: "CouponGlobalComponent"
}
</script>

<style lang="scss">

</style>