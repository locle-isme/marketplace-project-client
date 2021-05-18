<template>
  <tr class="item-product" style="background: rgba(33,238,224,0.1);padding-bottom: 10px">
    <td>
      <router-link tag="div" :to="{name:'product.detail', params:{slug: product.id}}" class="d-flex">
        <div class="image-detail">
          <img width="100%" height="100%" class="img-thumbnail" :src="firstImages" alt="">
        </div>
        <div class="d-flex flex-column ml-2">
          <div><span style="font-weight: 600; color: #1f648b;cursor: pointer">{{ product.name }}</span>
          </div>
          <div class="mt-1">
            <span>Cung cấp bởi &nbsp;</span>
            <router-link :to="{name:'store.global', params:{slug: brand.slug}}" tag="span" class="text-primary"
                         style="cursor: pointer">{{ supplier.name }}
            </router-link>
          </div>
        </div>
      </router-link>
    </td>
    <td class="text-right">{{ realPrice | currency }}</td>
    <td class="text-center">{{ product.amount }}</td>
<!--    <td class="text-right">0 ₫</td>-->
<!--    <td class="text-right">{{ product.price | currency }}</td>-->
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
    }
  },
  computed: {
    brand() {
      const {brand} = this.product;
      return brand || {};
    },

    supplier() {
      const {supplier} = this.product;
      return supplier || {};
    },

    images() {
      const {images} = this.product;
      return images || [];
    },

    firstImages() {
      const {images} = this.product;
      return images[0] ? images[0].url : this.defaultImage;
    },

    ratings() {
      const {ratings} = this.product;
      return ratings || {};
    },

    reviews() {
      const {reviews} = this.listReviews;
      return reviews || [];
    },

    realPrice() {
      const {price, discount} = this.product;
      return price * (100 - discount) / 100;
    },

  },
  name: "DetailProductComponent"
}
</script>

<style lang="scss">
.image-detail {
  width: 70px;
  height: 70px;
  cursor: pointer;
  @media (max-width: 576px) {
    width: 200px !important;
    height: 200px !important;
  }

}
</style>