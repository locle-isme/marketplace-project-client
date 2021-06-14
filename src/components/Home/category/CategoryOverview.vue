<template>
  <div class="row">
    <div class="col">
      <div class="card-category card">
        <div class="card-title text-uppercase">Danh mục sản phẩm</div>
        <div class="card-body p-0">
          <!--          <div class="category-contains">-->

          <!--            <ul class="navbar-nav">-->
          <carousel :perPage="perPage" :navigationEnabled="true" :navigationPrevLabel="prevBtn"
                    :navigationNextLabel="nextBtn" :paginationEnabled="false">
            <template v-for="(categoryGroup,index) in categoryGroups">
              <slide :key="'grct' + index">
                <GroupCategory :categoryGroup="categoryGroup"></GroupCategory>
              </slide>
            </template>
          </carousel>
          <!--            </ul>-->

          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupCategory from "./GroupCategory";
import {Carousel, Slide} from 'vue-carousel';
import {mapGetters} from "vuex";
import _ from "lodash"

export default {
  data() {
    return {
      nextBtn: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
      prevBtn: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
      limit: 10
    }
  },

  mounted() {
    window.addEventListener('resize', () => {
      let w = window.innerWidth;
      let temp;
      if (w >= 1200) temp = 10;
      else if (w >= 992) temp = 6;
      else temp = 3;
      this.limit = temp;
    });
  },

  computed: {
    ...mapGetters(["homeCategories"]),
    perPage() {
      const {lengthCategoryGroups, limit} = this;
      return lengthCategoryGroups > limit ? limit : lengthCategoryGroups;
    },

    categoryGroups() {
      const {homeCategories} = this;
      return _.chunk(homeCategories, 2);
    },

    lengthCategoryGroups() {
      const {categoryGroups} = this;
      return categoryGroups.length;
    }

    /*
       limit() {
         let w = window.innerWidth;
         return w > 768 ? 10 : 3;
       }
       */

  },
  components: {
    GroupCategory,
    Carousel,
    Slide,
  },
}
</script>

<style lang="scss">
.card-category {
  .card-body {
    width: 100%;
    min-height: 200px;
  }
}


</style>