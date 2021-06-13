<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" @click.prevent="redirect('home')">
        <a href="#">Home</a>
      </li>
      <template v-for="(category, index) in listCategories">
        <li :key="category.slug" class="breadcrumb-item" :class="classActive(index)"
            @click.prevent="goCategory(category)">
          <a href="#">{{ category.name }}</a>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script>
import {HandleRedirect} from "../../mixins/redirect.handle";

export default {
  mixins: [HandleRedirect],
  props: {
    currentCategory: {
      type: Object,
      required: true
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

    goCategory(category) {
      this.redirect('category', {slug: category.slug})
    }
  },
  computed: {
    listCategories() {
      let tempCategory = this.currentCategory;
      let tempList = [];
      while (tempCategory) {
        const {name, id, slug} = tempCategory;
        tempList.push({name, id, slug});
        tempCategory = tempCategory.parent;
      }
      return tempList.reverse() || [];
    },

    lengthListCategories() {
      return this.listCategories.length;
    },
  },
}
</script>

<style>

</style>