<template>
  <div class="review-rating d-flex flex-column">
    <div class="summary d-flex align-items-center">
      <h1>{{ rating_average | round }}</h1>
      <div class="d-flex flex-column mx-2 align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" :style="`width:${getWidthRating}%`">
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
          </div>
        </div>
        <div class="my-1"><span class="font-weight-bold">{{ rating_count }}</span> nhận xét</div>
      </div>
    </div>
    <div class="detail d-flex flex-column">
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 100%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div :style="getWidthStar(stars.star5)"></div>
        </div>
        <div style="width: 50px;">
          <span class="float-right">{{ stars.star5 }}</span>
        </div>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 80%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div :style="getWidthStar(stars.star4)"></div>
        </div>
        <div style="width: 50px;">
          <span class="float-right">{{ stars.star4 }}</span>
        </div>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 60%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div :style="getWidthStar(stars.star3)"></div>
        </div>
        <div style="width: 50px;">
          <span class="float-right">{{ stars.star3 }}</span>
        </div>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 40%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div :style="getWidthStar(stars.star2)"></div>
        </div>
        <div style="width: 50px;">
          <span class="float-right">{{ stars.star2 }}</span>
        </div>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 20%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div :style="getWidthStar(stars.star1)"></div>
        </div>
        <div style="width: 50px;">
          <span class="float-right">{{ stars.star1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    ratings: {
      type: Object,
      required: true
    }
  },

  methods: {
    getWidthStar(quality) {
      return `width:${quality / this.rating_count * 100}%`;
    }
  },

  computed: {
    stars() {
      const {stars} = this.ratings;
      return stars || {};
    },

    rating_average() {
      const {rating_average} = this.ratings;
      return rating_average || 0;
    },

    rating_count() {
      const {rating_count} = this.ratings;
      return rating_count || 1;
    },

    getWidthRating() {
      return this.rating_average / 5 * 100;
    }
  }
}
</script>

<style lang="scss">
.review-rating {

  .summary {

    .fa-2x {
      font-size: 1.4em !important;
    }
  }

  .detail {
    i {
      font-size: 0.8em !important;
    }

    span {
      font-size: 0.8em !important;
      color: #5f5b5b !important;
    }

    .level {
      .line {
        position: relative;
        height: 6px;
        width: 100%;
        border-radius: 20px;
        background: #c6c0c0;
        margin: 0px 10px;

        div {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          overflow: hidden;
          background: #3e3e3e;
        }
      }
    }
  }

  .star {
    .rating-avg {
      top: 0;
      left: 0;
      overflow: hidden;
    }
  }
}
</style>

