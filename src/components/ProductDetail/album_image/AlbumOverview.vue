<template>
  <div class="product-image col-xl-4 col-lg-12 border-right mb-4">
    <div class="d-flex flex-column align-items-center">
      <div class="img-thumbnail">
        <img width="100%" height="100%" :src="showIndexImage" alt="">
      </div>
      <div class="review-image">
        <carousel :perPage="5" :navigationEnabled="true" :navigationPrevLabel="prevBtn" :navigationNextLabel="nextBtn">
          <template v-for="(image, index) in images">
            <slide :key="'images' + index" @slide-click="changeIndexImage(index)">
              <div :class="classActiveImage(index)">
                <img :src="image.url" alt="">
              </div>
            </slide>
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';

export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      nextBtn: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
      prevBtn: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
      defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
      indexImage: 0
    }
  },

  methods: {
    changeIndexImage(index) {
      this.indexImage = index;
    },

    classActiveImage(index) {
      return {
        'view-photo': true,
        active: this.indexImage == index,
      }
    }
  },

  computed: {
    showIndexImage() {
      const {images, indexImage, defaultImage} = this;
      return images.length > 0 ? images[indexImage].url : defaultImage;
    }
  },

  components: {
    Carousel,
    Slide,
  },
}
</script>

<style lang="scss">

.product-image {
  .review-image {
    flex: 1 1 auto;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .view-photo {
      width: 72px;
      height: 72px;
      padding: 2px;
      opacity: 0.85;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      &.active {
        opacity: 1;
        box-shadow: rgb(120 120 120) 0px 2px 6px 0px;
      }

      /*&:last-child {

        span {
          width: 100%;
          height: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          text-align: center;
          top: 0;
          left: 0;
          color: #fff;
          font-size: 11px;
          background-color: rgba(0, 0, 0, 0.7);
          user-select: none;
          padding: 0px 2px;
        }

      }*/
    }
  }
}
</style>