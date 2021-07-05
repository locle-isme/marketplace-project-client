<template>
  <div class="product-image col-xl-4 col-lg-12 border-right mb-4">

    <div class="d-flex flex-column align-items-center">
      <div class="img-thumbnail" @click="changeShowModal(true, -1)">
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

    <VModal v-if="showModal" @close="changeShowModal(false)" :item="currentImage">
      <template #gallery_body="{item}">
        <div class="image__container">
          <div class="image-detail">
            <img class="item" :src="item.url" alt="">
          </div>
        </div>
        <span class="slide__previous-button" @click="changeCurrentImage(-1)">
          <i class="fa fa-chevron-left" style="font-size: 1em"></i></span>
        <span class="slide__next-button" @click="changeCurrentImage(1)">
          <i class="fa fa-chevron-right" style="font-size: 1em"></i></span>
        <div class="slide-image-container">
          <div class="slide__frame" :style="styleSlideFrame">
            <template v-for="(image,index) in images">
              <div :key="'windowSlide' + index" class="thumbnail-image" :class="classActiveSlideImage(index)"
                   @click="changeShowModal(true, index)">
                <img :src="image.url" alt="">
              </div>
            </template>
          </div>
        </div>
      </template>
    </VModal>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import VModal from "../../VModal";

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
      defaultImage: 'http://localhost:8000/assets/images/placeholder-images.png',
      indexImage: 0,
      showModal: false,
    }
  },

  methods: {
    changeIndexImage(index = 0) {
      this.showModal = true;
      this.indexImage = index;

    },

    changeShowModal(status, index = 0) {
      this.showModal = status;
      if (index > 0) this.indexImage = index;

    },

    changeCurrentImage(n) {
      const {images} = this;
      let temp = this.indexImage;
      temp += n;
      if (temp > images.length - 1) temp = 0;
      if (temp < 0) temp = images.length - 1;
      this.indexImage = temp;
    },


    classActiveSlideImage(index) {
      const {indexImage} = this;
      return {
        active: indexImage === index
      }
    },

    classActiveImage(index) {
      return {
        'view-photo': true,
        active: this.indexImage === index,
      }
    },
  },

  computed: {
    showIndexImage() {
      const {images, indexImage, defaultImage} = this;
      return images.length > 0 ? images[indexImage]?.url : defaultImage;
    },

    currentImage() {
      const {indexImage, images, defaultImage} = this;
      return images[indexImage] ?? {url: defaultImage};
    },

    styleSlideFrame() {
      //
      const {indexImage} = this;
      let temp = indexImage + 1;
      let transform = temp > 10 ? (temp - 10) * 10 : 0;
      // return `transform: translateX(${transform} %)`;
      return `transform: translateX(-${transform}%); `;
    },
  },

  components: {
    Carousel,
    Slide,
    VModal
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

  .modal2 {
    .modal-body {
      flex-direction: column;
      align-items: center;

      .image__container {
        display: flex;
        justify-content: center;

        .image-detail {
          position: relative;
          width: auto;
          height: auto;
          font-family: "Courier New", Courier, monospace;
          /*          background-image: url("https://i.imgur.com/5LSZIMV.gif"); //https://i.imgur.com/5LSZIMV.gif https://i.imgur.com/X1cxga4.gif
                    background-size: auto;
                    background-position: center;*/

          img {
            user-select: none;
            max-width: 100%;
            max-height: 400px;
            transition: 300ms;

            &.background {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 11;
              opacity: 0;
              object-fit: cover;

              &:hover {
                opacity: 0;
              }
            }

            &.item {
              opacity: 1;
              z-index: 10;

              &:hover {
                opacity: 1;
              }
            }
          }
        }

      }

      .slide-image-container {
        position: absolute;
        bottom: 0px;
        width: 100%;
        overflow: hidden;

        .slide__frame {
          white-space: nowrap;

          .thumbnail-image {
            display: inline-block;
            width: 10%;
            height: 75px;
            padding: 4px;

            &.active {
              box-shadow: #6DCDFF 0 0 0 4px inset;
            }

            img {
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      @mixin button_change_state {
        position: absolute;
        top: 50%;
        font-size: 3em !important;
        padding: 0.5rem 0.3rem;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 300ms;
        z-index: 1000;
        &:hover {
          color: #E8E8E8;
          background: rgba(0, 0, 0, 0.5);
        }
      }

      .slide__previous-button {
        @include button_change_state;
        left: 0;
      }

      .slide__next-button {
        @include button_change_state;
        right: 0;
      }
    }
  }
}
</style>