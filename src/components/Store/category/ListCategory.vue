<template>
  <ul class="nav">
    <template v-for="category in listCategories">
      <CategoryItem @changeIDShow="handleChangeCurrentCategoryID" @changeList="changeList"
                    :key="'ct' +category.id" :idShowChild.sync="currentCategoryID" :category="category">
      </CategoryItem>
    </template>
  </ul>
</template>

<script>
import CategoryItem from "./CategoryItem";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
    currentCategoryID: {
      type: [String, Number],
      //required: true,
    }
  },

  data() {
    return {
      idShowChild: 0,
      listCategories: []
    }
  },

  created() {
    this.listCategories = this.categories;
  },

  methods: {
    changeList(category) {
      const {id} = category;
      this.listCategories = [category];
      this.handleChangeCurrentCategoryID(id);
    },
    handleChangeCurrentCategoryID(categoryID) {
      this.$emit('changeCurrentCategoryID', categoryID);
    },
  },

  watch: {
    categories: {
      deep: true,
      handler(_categories) {
        this.listCategories = _categories;
      }
    }
  },

  components: {
    CategoryItem
  }
}
</script>

<style lang="scss">

</style>