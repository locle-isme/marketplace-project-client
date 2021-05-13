<template>
  <router-link tag="div" :to="{name:'product.detail', params:{slug: product.id}}" class="favourite-item col"
               style="padding: 1rem">
    <div class="d-flex flex-column">
      <div style="z-index: 111">
        <button type="button" class="close" aria-label="Close" @click.prevent="removeFavourite">
          <span aria-hidden="true" style="font-size: 1em">&times;</span>
        </button>
        <img :src="firstImages" class="img-thumbnail" alt="">
      </div>
      <div class="name mt-2 limit-line">
        <span>{{ product.name }}</span>
      </div>
      <ReviewRating v-if="ratings.rating_count > 0" :rating_count="ratings.rating_count"
                    :rating_average="ratings.rating_average"></ReviewRating>
    </div>
    <div class="d-flex align-items-center">
      <div class="price">{{ realPrice | currency }}</div>
      <div v-if="product.discount > 0" class="discount text-light ml-1">- {{ product.discount }}%</div>
    </div>
  </router-link>
</template>

<script>
import ReviewRating from "./ReviewRating";

export default {
  props: {
    favourite: {
      type: Object
    }
  },
  data() {
    return {
      defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
    }
  },
  methods: {
    removeFavourite() {
      const {id} = this.product;
      this.$emit('removeFavourite', id);
    }
  },

  computed: {
    firstImages() {
      const {images} = this.product;
      return images[0] ? images[0].url : this.defaultImage;
    },

    realPrice() {
      const {price, discount} = this.product;
      return price * (100 - discount) / 100;
    },

    product() {
      const {product} = this.favourite;
      return product;
    },

    ratings() {
      const {ratings} = this.product;
      return ratings || {};
    },
  },
  components: {
    ReviewRating
  },
  name: "FavouriteComponent"
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.favourite-item {
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
  }

  .name {
    text-align: left;
    font-weight: 550;
  }

  .limit-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .discount {
    background: #e74646;
    padding: 2px 3px;
    user-select: none;
    font-size: 0.9em;
    border-radius: 5px;
  }

}


</style>