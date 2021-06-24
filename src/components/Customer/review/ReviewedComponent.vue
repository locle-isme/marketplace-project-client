<template>
  <div>
    <transition-group name="fade" tag="div" class="list-reviewed">
      <template v-for="review in reviews">
        <ReviewedItem :review="review" :key="review.id" @handleRating="handleEditRating"></ReviewedItem>
      </template>
    </transition-group>
    <div class="my-4 d-flex justify-content-center w-25 mx-auto">
      <button v-if="isShowViewMoreBtn" class="btn btn-sm btn-info btn-block btn-view-more"
              @click="loadMorePage">Xem thêm
      </button>
    </div>
    <transition name="slideRight">
      <EditReview v-if="modalEditRatingShow" :review="currentReview"
                  @exit="modalEditRatingShow = false"
                  @handleSubmitReview="handleSubmitEditReview">

      </EditReview>
    </transition>
  </div>
</template>

<script>
import {REVIEW_EDIT} from "../../../store/actions.type";
import {mapGetters} from "vuex";
import EditReview from "./EditReview";
import ReviewedItem from "./ReviewedItem";
import {PageMixin} from "../../../mixins/page.mixin";
import {ReviewMixin} from "../../../mixins/review.mixin";
import {toastError, toastSuccess} from "../../../common/toast";
import firstError from "../../../common/filter.error"

export default {
  mixins: [PageMixin, ReviewMixin],
  data() {
    return {
      currentReview: {},
      modalEditRatingShow: false,
      limit: 10
    }
  },
  methods: {
    handleEditRating(review) {
      this.currentReview = review;
      this.modalEditRatingShow = true;
    },

    async handleSubmitEditReview(review) {
      const {id} = this.currentReview;
      try {
        await this.$store.dispatch(REVIEW_EDIT, {...review, id: id})
        await Promise.all([
          toastSuccess("Chỉnh sửa đánh giá thành công"),
          this.loadingReviewed()
        ])

        this.typeSelect = 'reviewed';
        this.modalEditRatingShow = false;
      } catch (errs) {
        for (let name_err in errs) {
          toastError(firstError(errs[name_err]));
        }
      }

    },


  }
  ,

  computed: {
    ...mapGetters(["myReviews", "user"]),
    reviews() {
      const {reviews} = this.myReviews;
      return reviews;
    }
    ,

    myReviewCount() {
      const {count} = this.myReviews;
      return count || 0;
    }
    ,

    isShowViewMoreBtn() {
      const {myReviewCount, offset} = this;
      return offset < myReviewCount;
    }
  }
  ,


  watch: {
    currentPage() {
      this.loadingReviewed();
    }
    ,
  }
  ,

  components: {
    ReviewedItem,
    EditReview
  }
}
</script>

<style>

</style>