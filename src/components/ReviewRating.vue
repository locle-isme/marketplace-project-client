<template>
  <div class="review-rating d-flex flex-wrap align-items-center">
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
    <div class="review" :style="{fontSize: `${fontSize}em`}">[{{ rating_count }} đánh giá]</div>
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
      type: [String, Number],
    },
    rating_average: {
      type: [String, Number]
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
<style lang="scss">

.review-rating {
  .rating-avg {
    top: 0;
    left: 0;
    width: 50%;
    overflow: hidden;
  }

  margin-right: 5px;


  .review {

  }
}

</style>