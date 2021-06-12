<template>
  <div class="review-comment-rating-title d-flex align-items-center">
    <div class="position-relative">
      <div class="rating-total d-flex">
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
      </div>
      <div class="rating-avg d-flex position-absolute" :style="getWidthRating">
        <i class="fas fa-star text-warning fa-1x"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
      </div>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    star: {
      type: Number
    }
  },

  data() {
    return {
      /*titles: [
          'Rất không hài lòng',
          'Không hài lòng',
          'Bình thường',
          'Hài lòng',
          'Rất hài lòng'
      ]*/
      titles: [
        'Thất vọng',
        'Chưa tốt',
        'Bình thường',
        'Tốt',
        'Hài lòng tuyệt đối'
      ]
    }
  },

  computed: {
    title() {
      const {titles} = this;
      return titles[this.star - 1];
    },

    getWidthRating() {
      return `width:${this.star / 5 * 100}%`;
    }
  }
}
</script>
<style lang="scss">
.review-comment-rating-title {
  margin: 3px 0px;

  .rating-avg {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .title {
    font-size: 1em;
    margin: 0 10px;
    font-weight: 600;
    user-select: none;
  }

}
</style>