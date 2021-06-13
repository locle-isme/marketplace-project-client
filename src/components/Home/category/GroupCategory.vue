<template>
  <div class="nav-item">
    <template v-for="category in categoryGroup">
      <CategoryItem :key="'ct' + category.id" :category="category"></CategoryItem>
    </template>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";

export default {
  props: {
    categoryGroup: {
      type: Array,
      required: true
    }
  },

  computed: {
    lengthItems() {
      const {categoryGroup} = this;
      return categoryGroup.length;
    }
  },
  components: {
    CategoryItem,
  },
  name: "GroupCategory",
}
</script>

<style>

</style>