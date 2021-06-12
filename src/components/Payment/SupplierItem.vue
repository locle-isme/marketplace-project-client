<template>
  <tbody class="supplier-body">
  <tr class="seller">
    <td colspan="4" class="name">
      <b-icon icon="shop" aria-hidden="true" font-scale="1.5"></b-icon>
      {{ supplier.nameOfShop }}
    </td>
  </tr>
  <template v-for="product in products">
    <ProductItem :key="'product' + product.id" :product="product"></ProductItem>
  </template>
  </tbody>
</template>

<script>

import ProductItem from "./ProductItem";
export default {
  props: {
    supplier: {
      type: Object,
      required: true
    }
  },
  computed: {
    products() {
      const {products} = this.supplier;
      return products;
    }
  },
  components: {
    ProductItem,
  }
}
</script>

<style lang="scss">
tbody {
  border-bottom: 15px solid #fff;
  &.supplier-body {
    background: rgba(255, 137, 94, 0.15);
    &:first-child{
      border-top: 1rem solid white !important;
    }

    &:last-child{
      border-top: 1rem solid white !important;
    }

    .seller {
      .name {
        color: rgba(0, 0, 0, 0.67);
        font-size: 1.01em;
        text-align: left;
        font-weight: 600;
      }
    }

  }
}
</style>