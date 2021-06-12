<template>
  <div @click="$emit('handleRating', review)" class="reviewed row my-2 pb-3 border-bottom">
    <div class="col-12">
      <div class="name-product">{{ product.name }}</div>
    </div>
    <div class="col-lg-3">
      <img class="img-thumbnail" :src="firstImages" alt="">
    </div>
    <div class="col-lg-9">
      <div class="d-flex flex-column">
        <CommentRatingTitle :star="review.star"></CommentRatingTitle>
        <div class="content d-flex flex-column">
          <div class="comment">{{ review.comment }}</div>
          <div class="created-date"><span>Nhận xét vào {{ review.updated_at | date }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import CommentRatingTitle from "../../CommentRatingTitle";
export default {
  props: {
    review: {
      type: Object
    }
  },
  data() {
    return {
      defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
    }
  },
  computed: {
    product() {
      const {product} = this.review;
      return product || {};
    },

    firstImages() {
      const {images} = this.product;
      return images[0] ? images[0].url : this.defaultImage;
    },
  },
  components: {
    CommentRatingTitle
  }
}
</script>

<style lang="scss">

.reviewed {
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

  .comment {
    text-align: justify;
    font-size: 0.9em;
  }

  .created-date {
    span {
      font-size: 0.85em;
      color: rgb(120, 120, 120);
    }
  }
}
</style>