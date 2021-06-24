<template>
  <div>
    <transition-group name="fade" tag="div" class="list-already-review">
      <template v-for="product in products">
        <NotReviewItem :key="product.id" :product="product"
                       @handleRating="handleCreateRating">
        </NotReviewItem>
      </template>
    </transition-group>
    <div class="my-4 d-flex justify-content-center">
      <button v-show="isShowViewMoreBtn" class="btn btn-sm btn-info btn-block btn-view-more"
              @click="loadMorePage">Xem thêm
      </button>
    </div>
    <transition name="slideLeft">
      <CreateReview v-if="modalRatingShow" :product="currentProductRating"
                    @exit="modalRatingShow = false" @handleSubmitReview="handleSubmitReview"></CreateReview>
    </transition>
  </div>
</template>

<script>
import {REVIEW_CREATE} from "../../../store/actions.type";
import {mapGetters} from "vuex";
import {PageMixin} from "../../../mixins/page.mixin";
import {ReviewMixin} from "../../../mixins/review.mixin";
import CreateReview from "./CreateReview";
import NotReviewItem from "./NotReviewItem";
import {toastError, toastSuccess} from "../../../common/toast";
import firstError from "../../../common/filter.error";

export default {
  mixins: [PageMixin, ReviewMixin],
  data() {
    return {
      currentProductRating: {},
      modalRatingShow: false,
      limit: 10
    }
  },
  methods: {
    handleCreateRating(product) {
      this.currentProductRating = product;
      this.modalRatingShow = true;
    },

    async handleSubmitReview(params) {
      const {id} = this.currentProductRating;
      try {
        await this.$store.dispatch(REVIEW_CREATE, {...params, product_id: id});
        await toastSuccess("Đánh giá thành công")
        this.typeSelect = 'reviewed';
        this.modalRatingShow = false;
        await this.loadingData();
      }catch (errs) {
        for (let name_err in errs) {
          toastError(firstError(errs[name_err]));
        }
      }
    }
  },

  computed: {
    ...mapGetters(["listWaitingForReview",]),

    waitingForReviewCount() {
      const {count} = this.listWaitingForReview;
      return count || 0;
    },


    products() {
      const {products} = this.listWaitingForReview;
      return products || [];
    },

    isShowViewMoreBtn() {
      const {offset, waitingForReviewCount} = this;
      return offset < waitingForReviewCount;
    }
  },
  components: {
    NotReviewItem,
    CreateReview
  }
}
</script>

<style>

</style>