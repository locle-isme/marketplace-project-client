<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" @click.prevent="goStore">
        <a href="#">Trang chủ cửa hàng</a>
      </li>
      <!--      <template v-for="(category, index) in listCategories">-->
      <!--        <li :key="category.slug" class="breadcrumb-item" :class="classActive(index)"-->
      <!--            @click.prevent="goCategory(category)">-->
      <!--          <a href="#">{{ category.name }}</a>-->
      <!--        </li>-->
      <!--      </template>-->
    </ol>
  </nav>
</template>

<script>

import {HandleRedirect} from "../../../mixins/redirect.handle";
import {mapGetters} from "vuex";

export default {
  mixins: [HandleRedirect],
  props: {
    supplierCategories: {
      type: Array,
      required: true
    },
    currentCategoryID: {
      type: [String, Number],
    },
  },

  data() {
    return {}
  },

  created() {

  },

  mounted() {
  },

  methods: {
    classActive(index) {
      return {active: index == this.lengthListCategories - 1};
    },

    goStore() {
      const {slug} = this.currentSupplier;
      this.redirect('store.global', {slug: slug})
    }
  },
  computed: {
    ...mapGetters(["currentSupplier"]),
    categories() {
      let temp = [...this.supplierCategories];
      let temp2 = [];
      while (temp.length) {
        let obj = temp.pop();
        temp2.push(obj);
        const {childs} = obj;
        childs.forEach(item => {
          temp.push(item);
        })
      }
      return temp2;
    },

    listCategories() {
      const {currentCategoryID} = this;
      let tempList = [];
      let tempCategory = this.categories.find(c => c.id == currentCategoryID);
      while (tempCategory && tempCategory.parent) {
        const {name, id, slug, parent} = tempCategory;
        tempList.push({name, id, slug});
        tempCategory = this.categories.find(c => c.id == parent.id);
      }
      return tempList.reverse() || [];
    },

    lengthListCategories() {
      return this.listCategories.length;
    },
  },

  watch: {}
}
</script>

<style lang="scss">
$breadcrumbColor: rgba(255, 32, 30, 0.73);
$white: #fff;
$black: #000;
.breadcrumb {
  background: var(--danger);
  border-radius: unset;

  .breadcrumb-item {
    a {
      font-weight: 600;
      color: $white;
    }

    &.active {
      font-weight: 550;

      a {
        cursor: unset;
        color: $black;
      }
    }
  }

  .breadcrumb-item + .breadcrumb-item::before {
    float: left;
    padding-right: 0.5rem;
    color: #f4ffe6;
    content: "/";
  }
}
</style>