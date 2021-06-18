<template>
  <div class="col-xl-9 col-md-12">
    <div class="customer-review card">
      <div class="card-title">Nhận xét sản phẩm đã mua</div>
      <div class="card-body">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <div class="nav-link" :class="isActive('reviewed')" @click="typeSelect = 'reviewed'">Đã đánh giá <span
                class="badge badge-light">{{ myReviewCount }}</span>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link" :class="isActive('already')" @click="typeSelect = 'already'">Chờ đánh giá <span
                class="badge badge-light"> {{ waitingForReviewCount }} </span>
            </div>
          </li>
        </ul>

        <transition-group name="fade" tag="div" v-if="typeSelect == 'reviewed'" class="list-reviewed">
          <template v-for="review in reviews">
            <ReviewedComponent :review="review" :key="review.id" @handleRating="handleEditRating"></ReviewedComponent>
          </template>
        </transition-group>
        <transition-group v-else name="fade" tag="div" class="list-already-review">
          <template v-for="product in products">
            <NotReviewComponent :key="product.id" :product="product"
                                @handleRating="handleCreateRating"></NotReviewComponent>
          </template>
        </transition-group>
        <transition name="slideLeft">
          <CreateReview v-if="modalRatingShow" :product="currentProductRating"
                        @exit="modalRatingShow = false" @handleSubmitReview="handleSubmitReview"></CreateReview>
        </transition>
        <transition name="slideRight">
          <EditReview v-if="modalEditRatingShow" :review="currentReview"
                      @exit="modalEditRatingShow = false"
                      @handleSubmitReview="handleSubmitEditReview"></EditReview>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewedComponent from "../../components/Customer/review/ReviewedComponent";
import NotReviewComponent from "../../components/Customer/review/NotReviewComponent";
import EditReview from "../../components/Customer/review/EditReview";
import CreateReview from "../../components/Customer/review/CreateReview";
import {FETCH_REVIEWS, GET_LIST_WAITING_FOR_REVIEW, REVIEW_CREATE, REVIEW_EDIT} from "../../store/actions.type";
import {mapGetters} from "vuex";

export default {
  name: "CustomerReview",
  data() {
    return {
      typeSelect: 'reviewed',
      modalRatingShow: false,
      modalEditRatingShow: false,
      currentReview: {},
      currentProductRating: {}
    }
  },

  created() {
    this.loadingData();
  },

  methods: {
    isActive(_type) {
      return {
        active: this.typeSelect == _type
      }
    },

    loadingData() {
      let params = {user_id: this.user.id};
      if (params.user_id)
        return this.$store.dispatch(FETCH_REVIEWS, params)
            .then(() => {
              return this.$store.dispatch(GET_LIST_WAITING_FOR_REVIEW)
            });
    },

    handleEditRating(review) {
      this.currentReview = review;
      this.modalEditRatingShow = true;
    },

    handleCreateRating(product) {
      this.currentProductRating = product;
      this.modalRatingShow = true;
    },

    handleSubmitEditReview(review) {
      const {id} = this.currentReview;
      this.$store.dispatch(REVIEW_EDIT, {...review, id: id})
          .then(() => {
            this.$toast.success("Chỉnh sửa đánh giá thành công", {
              duration: 5000,
              position: 'top-left'
            })
            this.typeSelect = 'reviewed';
            this.modalEditRatingShow = false;
            this.loadingData();
          })
          .catch((data) => {
            let firstMessage = this.$options.filters.error(data[Object.keys(data)[0]]);
            this.$toast.error(firstMessage, {
              duration: 5000,
              position: 'top-left'
            })
          })
    },

    handleSubmitReview(params) {

      const {id} = this.currentProductRating;
      this.$store.dispatch(REVIEW_CREATE, {...params, product_id: id})
          .then(() => {
            this.$toast.success("Đánh giá thành công", {
              duration: 5000,
              position: 'top-left'
            })
            this.typeSelect = 'reviewed';
            this.modalRatingShow = false;
            this.loadingData();
          })
          .catch((data) => {
            let firstMessage = this.$options.filters.error(data[Object.keys(data)[0]]);
            this.$toast.error(firstMessage, {
              duration: 5000,
              position: 'top-left'
            })
          })
    }

  },

  computed: {
    ...mapGetters(["user", "myReviews", "listWaitingForReview"]),
    reviews() {
      const {reviews} = this.myReviews;
      return reviews;
    },

    products() {
      const {products} = this.listWaitingForReview;
      return products || [];
    },

    myReviewCount() {
      const {count} = this.myReviews;
      return count || 0;
    },

    waitingForReviewCount() {
      const {count} = this.listWaitingForReview;
      return count || 0;
    }
  },

  watch: {
    user: {
      deep: true,
      handler() {
        this.loadingData();
      }
    },
  },
  components: {
    ReviewedComponent,
    NotReviewComponent,
    EditReview,
    CreateReview,
  }
}
</script>

<style lang="scss">


.customer-review {
  .nav-item {
    .nav-link {
      cursor: pointer;
    }
  }

  .card-body {
    min-height: 200px;
  }
}

</style>