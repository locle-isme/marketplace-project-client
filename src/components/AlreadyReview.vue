<template>
  <div @click="$emit('handleRating', product)" class="already-review row my-2 pb-3 border-bottom">
    <div class="col-xl-3">
      <img class="img-thumbnail" :src="firstImages" alt="">
    </div>
    <div class="col-xl-9">
      <div class="d-flex flex-column">
        <div class="name-product">{{ product.name }}</div>
        <div class="price">{{ currentPrice | currency }}</div>
        <div class="mt-1"><span>Cung cấp bởi &nbsp;</span>
          <span class="text-primary" style="cursor: pointer">{{ supplier.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    }
  },

  data() {
    return {
      defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
    }
  },

  methods: {},
  computed: {
    firstImages() {
      const {images} = this.product;
      return images[0] ? images[0].url : this.defaultImage;
    },

    currentPrice() {
      const {price, discount} = this.product;
      return price * (100 - discount) / 100;
    },

    ratings() {
      const {ratings} = this.product;
      return ratings || {};
    },
    brand() {
      const {brand} = this.product;
      return brand || {};
    },

    supplier() {
      const {supplier} = this.product;
      return supplier || {};
    },
  },
  name: "AlreadyReview",
}
</script>

<style lang="scss">

.already-review {
  cursor: pointer;

  .name-product {
    padding: 5px 0px;
    font-size: 1.2em;
    font-weight: 700;
    color: #1f648b;
    cursor: pointer;
  }

  .price {
    color: #be0505;
    font-size: 1.1em;
    font-weight: 600;
  }
}

</style>