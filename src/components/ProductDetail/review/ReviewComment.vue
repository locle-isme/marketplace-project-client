<template>
  <div class="comment-review row border-bottom py-3">
    <div class="col-md-12 col-lg-3 border-right">
      <div class="d-flex align-items-center">
        <div class="avatar mr-2">
          <div class="placeholder">
            <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="taka-svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg>
          </div>
        </div>
        <div class="reviewer-info d-flex flex-column">
          <div class="reviewer-name">{{ profile.name }}</div>
          <div><span style="font-size: 0.9em; color: rgb(120, 120, 120);">Đã tham gia 2 năm</span>
          </div>
          <div><span style="color: rgb(120, 120, 120);">Đã viết:</span> {{ profile.rating_count }} đánh giá</div>
        </div>
      </div>
    </div>
    <div class="reviewer-comment col-lg-9 col-md-12">
      <div class="d-flex flex-column">
        <CommentRatingTitle :star="review.star"></CommentRatingTitle>
        <div class="content d-flex flex-column">
          <div class="comment"><span>{{ review.comment }}</span></div>
          <div class="created-date"><small>Nhận xét vào {{ review.updated_at | date }}</small></div>
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
  methods: {},
  computed: {
    profile() {
      const {profile} = this.review;
      return profile || {};
    }
  },
  components: {
    CommentRatingTitle
  }
}
</script>
<style lang="scss">
.comment-review {
  .avatar {
    width: 80px;
    height: 80px;

    .placeholder {
      width: 100%;
      position: relative;
      padding-top: 100%;
      background-color: #f5f5f5;
      border-radius: 50%;
      overflow: hidden;

      .taka-svg-icon {
        display: inline-block;
        width: 3em;
        height: 3em;
        fill: currentColor;
        position: relative;

        &.icon-headshot {
          font-size: .9375rem;
          line-height: .9375rem;
        }
      }

      .icon-headshot {
        stroke: #c6c6c6;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 2rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }
}

.reviewer-comment {

  .content {

    .created-date {
      span {
        font-size: 0.85em;
        color: rgb(120, 120, 120);
      }
    }
  }
}
</style>