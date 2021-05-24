<template>
  <div class="cart-product row">
    <div class="d-flex flex-column w-100">
      <div class="seller">
        <b-icon icon="shop" aria-hidden="true" font-scale="1.5"></b-icon>
        {{ supplier.nameOfShop }}
      </div>
      <template v-for="product in products">
        <CartProductComponent :key="'or_pr' + product.id" :product="product"
                              @loadingData="loadingData"></CartProductComponent>
      </template>
      <div class="seller-discount d-flex border-top">
        <div class="description" @click="showModal = true">
          <button class="btn btn-sm btn-info">Mã Khuyến Mãi
            <i class="fas fa-chevron-down" style="margin-left: 5px"></i>
          </button>
          <div class="list-coupons">
            <span v-if="discountCodeUse.code" class="coupon badge badge-primary">
              Giảm {{ discountCodeUse.percent }} %
            </span>
          </div>
        </div>
      </div>
    </div>
    <ModalAddCouponSupplier v-if="showModal" :supplier="supplier" @exit="showModal = false"></ModalAddCouponSupplier>
  </div>
</template>
<script>

import ModalAddCouponSupplier from "./ModalAddCouponSupplier";
import CartProductComponent from "./CartProductComponent";
import {mapGetters} from "vuex";
import {REMOVE_COUPON_SUPPLIER_IN_USE} from "../../store/mutations.type";

export default {
  props: {
    supplier: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isLoading: true,
      showModal: false
    }
  },

  methods: {
    loadingData() {
      this.$emit('loadingData');
    },

    realPrice(product) {
      const {price, discount} = product;
      return price * (100 - discount) / 100;
    },

  },
  computed: {
    ...mapGetters(["couponSupplierInUse"]),
    products() {
      const {products} = this.supplier;
      return products;
    },

    totalPrice() {
      const {products} = this.supplier;
      let total = products.reduce((accumulator, product) => {
        return accumulator + this.realPrice(product) * product.quantity;
      }, 0);
      return total;
    },

    discountCodeUse() {
      let temp = this.couponSupplierInUse.find(c => c.supplier_id == this.supplier.id);
      return temp && temp.discount_code ? temp.discount_code : {};
    }
  },

  watch: {
    totalPrice(tempCost) {
      const {from_price} = this.discountCodeUse;
      if (from_price && from_price > tempCost) {
        const {id} = this.supplier;
        const payload = {supplier_id: id, discount_code: this.discountCodeUse};
        this.$store.commit(REMOVE_COUPON_SUPPLIER_IN_USE, payload);
      }

    }
  },

  components: {
    CartProductComponent,
    ModalAddCouponSupplier,
  }
}
</script>
<style lang="scss">
.cart-product {
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 0px 0px 15px 0px;
  padding: 10px 5px;
  border-radius: 8px;

  .seller-discount {
    padding: 8px 5px 0px 8px;

    .description {
      font-size: 1.1em;
      color: #242323;
      font-weight: 500;
      cursor: pointer;

      &:hover {

      }

    }
  }

  .seller {
    color: rgba(15, 15, 15, 0.8);
    padding: 8px 15px;
    font-size: 1.1em;
    line-height: 5px;
    font-weight: 550;
    margin-bottom: 1px;
    cursor: pointer;
  }

  .list-coupons {
    margin-top: 0.5rem;

    .coupon {
      padding: 6px 8px;
      margin-right: 0.3rem;
    }
  }


}


</style>