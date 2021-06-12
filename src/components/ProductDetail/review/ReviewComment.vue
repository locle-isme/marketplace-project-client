<template>
  <div class="row border-bottom py-3">
    <div class="col-md-12 col-lg-3 border-right">
      <div class="reviewer-info d-flex flex-column">
        <div class="reviewer-name">{{ profile.name }}</div>
        <div><span style="font-size: 0.9em; color: rgb(120, 120, 120);">Đã tham gia 2 năm</span>
        </div>
        <div><span style="color: rgb(120, 120, 120);">Đã viết:</span> {{ profile.rating_count }} đánh giá</div>
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