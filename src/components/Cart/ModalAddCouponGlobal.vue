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
              <template v-for="discount_code in globalCoupons.data">
                <CouponGlobalComponent :key="'global_coupon' + discount_code.code"
                                       :discount_code="discount_code">
                </CouponGlobalComponent>
              </template>
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

  methods: {
    useGlobalDiscount() {

    }
  },
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

    isAvailable() {
      const {from_price} = this
      return from_price;
    }
  },

  components: {
    CouponGlobalComponent
  },

  name: "ModalAddCouponGlobal"
}
</script>

<style lang="scss">
.coupon-item {
  .btn {
    cursor: pointer;
  }
}
</style>