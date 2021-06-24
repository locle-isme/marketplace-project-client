<template>
  <div class="modal-mask">
    <div class="modal fade show" style="display: block; padding-right: 17px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title h5">Khuyến mãi</div>
            <button type="button" class="close float-right" aria-label="Close" @click="$emit('exit')">
              <span aria-hidden="true" style="font-size: 1em">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="list-coupons custom-scroll d-flex flex-column mt-3">
              <template v-for="discount_code in globalDiscountCodes">
                <CouponGlobalComponent :key="'global_coupon' + discount_code.code"
                                       :discount_code="discount_code">
                </CouponGlobalComponent>
              </template>
            </div>
            <div v-if="totalCount == 0" class="card-empty">
              <img class="bg-empty" src="/images/undraw/undraw_discount_d4bd.png" alt="">
              <p class="description">Chưa có mã giảm giá nào từ Taka</p>
            </div>
          </div>
        </div>
      </div>
      <div class="outer" @click="$emit('exit')"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import CouponGlobalComponent from "./CouponGlobalComponent";

export default {
  props: {},

  created() {
  },

  data() {
    return {}
  },

  methods: {},
  computed: {
    ...mapGetters(["couponGlobalInUse", "globalCoupons"]),
    /*classCouponGlobalItem() {
      return {
        'coupon-item': true,
        'd-flex': true,
        'justify-content-between': true,
        'align-items-center': true,
        active: this.globalCoupon.code == this.couponGlobalInUse,
      }
    },*/
    globalDiscountCodes() {
      const {data} = this.globalCoupons;
      return data || [];
    },
    totalCount() {
      const {total_count} = this.globalCoupons;
      return total_count || 0;
    },
    isAvailable() {
      const {from_price} = this
      return from_price;
    }
  },


  components: {
    CouponGlobalComponent
  },
}
</script>

<style lang="scss">
.coupon-item {
  .btn {
    cursor: pointer;
  }
}
</style>