<template>
  <div class="modal-mask">
    <div class="modal fade show" style="display: block; padding-right: 17px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <router-link tag="div" :to="{name:'product.detail', params:{slug: product.id}}" class="modal-title h5">
              Chỉnh sửa đánh giá sản phẩm "{{ product.name }}"
            </router-link>
            <button @click="$emit('exit')" type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="rating">
              <ul class="list">
                <li :key="star" v-for="star in maxStars" :class="{ 'active': star <= stars }" @click="rate(star)"
                    class="star">
                  <i v-if="star <= stars" class="fas fa-2x fa-star text-warning"></i>
                  <i v-else class="far fa-2x fa-star text-warning"></i>
                </li>
              </ul>
              <div class="title text-uppercase" v-if="hasCounter">
                {{ titles[stars - 1] }} !
              </div>
              <div class="form-group">
                <textarea v-model="comment" name="comment" class="form-control" rows="3"
                          placeholder="Viết đánh giá sản phẩm ..."></textarea>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="$emit('exit')" type="button" class="btn btn-dark" data-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" @click="submitReview()" :disabled="handleSubmitButton">
              Chỉnh sửa
            </button>
          </div>

        </div>
      </div>
      <div class="outer" @click="$emit('exit')"></div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    review: {
      type: Object,
      required: true
    },
    // stars: {
    //   type: Number,
    //   required: true
    // }
  },
  data() {
    return {
      titles: [
        'Thất vọng',
        'Chưa tốt',
        'Bình thường',
        'Tốt',
        'Hài lòng tuyệt đối'
      ],
      stars: 0,
      maxStars: 5,
      comment: "",
    }
  },
  created() {
    const {star, comment} = this.review;
    this.comment = comment;
    this.stars = star;
  },

  methods: {
    rate(star) {
      if (
          typeof star === 'number' &&
          star <= this.maxStars &&
          star >= 0
      ) {
        this.stars = this.stars === star ? star - 1 : star
      }
    },

    submitReview() {
      const {stars, comment} = this;
      this.$emit('handleSubmitReview', {star: stars, comment: comment})
    },


  },

  computed: {
    product() {
      const {product} = this.review;
      return product || {};
    },
    handleSubmitButton() {
      const {comment, stars} = this;
      return !(comment.length >= 8 && stars > 0 && stars <= 5);
    },

    hasCounter() {
      return this.stars > 0;
    }
  },

  name: "EditRatingComponent"
}
</script>

<style lang="scss">
.modal-mask {
  $active-color: #f3d23e;
  $default-color: #3e3e3e;
  z-index: 1060;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(79, 79, 79, 0.55) !important;

  .modal {
    .modal-dialog {
      z-index: 1030;
    }

    .modal-title {
      cursor: pointer;
      font-weight: 700;
      color: #1f648b;
    }

    .outer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1010;
    }


    .rating {
      display: block;
      position: relative;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-size: 22px;
    }

    .list {
      margin: 0;
      text-align: center;
      padding: 0;
      list-style-type: none;

      &:hover {
        .star {
          color: $active-color;
        }
      }

      li {
        margin: 8px;
      }
    }

    .star {
      display: inline-block;
      cursor: pointer;

      &:hover {
        & ~ .star {
          &:not(.active) {
            color: inherit;
          }
        }
      }
    }

    .active {
      color: $active-color;
    }

    .title {
      text-align: center;
      color: $default-color;
      font-size: 0.8em;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 10px;
    }
  }
}
</style>