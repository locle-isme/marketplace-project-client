<template>
  <div class="item-review d-flex align-items-center">
    <div class="position-relative">
      <div class="rating-total d-flex">
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
      </div>
      <div class="rating-avg d-flex position-absolute" :style="{width: `${getWidthRating}%`}">
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
      </div>
    </div>
    <div class="review" :style="{fontSize: `${fontSize}em`}">{{ rating_count }}</div>
  </div>
</template>
<script>
export default {
  props: {
    fontSize: {
      type: Number,
      default: 0.8
    },
    rating_count: {
      type: Number
    },
    rating_average: {
      type: Number
    }
  },

  computed: {
    getWidthRating() {
      return this.rating_average / 5 * 100;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.item-review .rating-avg {
  top: 0;
  left: 0;
  width: 50%;
  overflow: hidden;
}

.item-review .review {
  margin-left: 5px;
}

</style>