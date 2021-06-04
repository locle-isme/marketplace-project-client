<template>
  <tr style="width: 100vh">
    <td>
      <div class="d-flex align-items-center">
        <div class="image-detail">
          <img width="100%" height="100%" class="img-thumbnail" :src="firstImages" alt="">
        </div>
        <div class="ml-2">
          <span style="font-weight: 350;">{{ product.name }}</span>
        </div>
      </div>
    </td>
    <td class="text-right">{{ realPrice |currency }}</td>
    <td class="text-center">{{ product.quantity }}</td>
    <td class="text-right">{{ totalPrice |currency }}</td>
  </tr>
</template>

<script>
import {ProductMixin} from "../../mixins/product.mixin";

export default {
  mixins: [ProductMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalPrice() {
      const {quantity} = this.product;
      return this.realPrice * quantity;
    }
  },
  name: "PaymentProductComponent"
}
</script>

<style lang="scss">
.image-detail {
  width: 45px;
  height: 45px;
  cursor: pointer;
}
</style>