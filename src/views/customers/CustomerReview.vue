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
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
        <ReviewedComponent v-if="typeSelect == 'reviewed'"></ReviewedComponent>
        <NotReviewComponent v-else></NotReviewComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewedComponent from "../../components/Customer/review/ReviewedComponent";
import NotReviewComponent from "../../components/Customer/review/NotReviewComponent";
import {ReviewMixin} from "../../mixins/review.mixin";
import {mapGetters} from "vuex";

export default {
  mixins: [ReviewMixin],
  data() {
    return {
      typeSelect: 'reviewed',
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
  },

  computed: {
    ...mapGetters(["user", "myReviews", "listWaitingForReview", "isLoading"]),
    waitingForReviewCount() {
      const {count} = this.listWaitingForReview;
      return count || 0;
    },
    myReviewCount() {
      const {count} = this.myReviews;
      return count || 0;
    },
  },

  watch: {
    user: {
      //deep: true,
      handler() {
        this.loadingData();
      }
    }
  },
  components: {
    ReviewedComponent,
    NotReviewComponent
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