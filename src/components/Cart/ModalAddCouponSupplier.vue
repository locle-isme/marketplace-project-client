<template>
  <div class="modal-mask">
    <div class="modal fade show" style="display: block; padding-right: 17px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title h5">{{ supplier.nameOfShop }} Khuyến mãi</div>
            <button type="button" class="close float-right" aria-label="Close" @click="$emit('exit')">
              <span aria-hidden="true" style="font-size: 1em">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="list-coupons custom-scroll d-flex flex-column mt-3">
              <template v-for="discount_code in discount_codes">
                <CouponComponent :key="'discount_code' + discount_code.code"
                                 :discount_code="discount_code" :supplier="supplier"></CouponComponent>
              </template>
            </div>
            <div v-if="lengthDiscountCode == 0" class="card-empty">
              <img class="bg-empty" src="/images/undraw/undraw_discount_d4bd.png" alt="">
              <p class="description">Chưa có mã giảm giá nào từ {{ supplier.nameOfShop }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="outer" @click="$emit('exit')"></div>
    </div>
  </div>
</template>

<script>
import CouponComponent from "./CouponComponent";

export default {
  props: {
    supplier: {
      type: Object,
      required: true
    },
  },

  methods: {},

  computed: {
    discount_codes() {
      const {discount_codes} = this.supplier;
      return discount_codes || [];
    },

    lengthDiscountCode() {
      const {discount_codes} = this;
      return discount_codes.length;
    }
  },
  components: {
    CouponComponent
  },
  name: "ModalAddCouponSupplier"
}
</script>

<style lang="scss">
.modal-mask {
  $active-color: #f3d23e;
  $default-color: #3e3e3e;
  z-index: 1060;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(79, 79, 79, 0.55) !important;

  .modal {
    .modal-dialog {
      z-index: 1030;
    }

    .modal-title {
      cursor: pointer;
      font-weight: 700;
      color: #1f648b;
    }

    .outer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1010;
    }

    .title {
      text-align: center;
      color: $default-color;
      font-size: 0.8em;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 10px;
    }

    .list-coupons {
      max-height: 456px;
      overflow-y: auto;

      .coupon-item {
        background: #fff;
        box-shadow: rgba(207, 207, 226, 0.2) 0px 7px 29px 0px;
        border-radius: 5px;
        border: #c0c0c0 1px solid;
        margin-bottom: 15px;

        &.active {
          background: rgba(141, 214, 215, 0.5);
          border-color: #44a5ca;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .description {
          padding: 15px 10px;

          .coupon-name {
            font-size: 0.9em;
            font-weight: 600;
          }

          .date {
            margin-top: 1px;
            font-size: 0.9em;
          }
        }
      }
    }

  }
}

.custom-scroll {

  /*
   *  STYLE 3
   */

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
}
</style>