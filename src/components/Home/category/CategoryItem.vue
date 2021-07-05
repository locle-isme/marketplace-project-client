<template>
  <div class="category-item d-flex flex-column align-items-center" @click="goCategory()">
    <div class="image-avatar">
      <img :src="imageURL" alt="">
    </div>
    <div class="name-category limit-line text-center">{{ category.name }}</div>
  </div>
</template>

<script>
import {HandleRedirect} from "../../../mixins/redirect.handle";

export default {
  mixins: [HandleRedirect],
  props: {
    category: {
      type: Object,
      required: true,
    }
  },
  methods: {
    goCategory() {
      const {slug} = this.category;
      this.redirect('category', {slug});
    }
  },
  computed: {
    imageURL() {
      const {image} = this.category;
      return image;
      //return `http://localhost:8000/${image}`;
    }
  },
}
</script>

<style lang="scss">
.nav-item {
  padding: 0px;

  .category-item {
    width: 100%;
    padding: 10px 20px;
    border-bottom: solid 1px rgba(0, 0, 0, .05);
    border-right: solid 1px rgba(0, 0, 0, .05);
    cursor: pointer;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      //box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    .image-avatar {
      width: 83px;
      height: 83px;
      //box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .name-category {
      margin-top: 0.775rem;
      min-height: 42px;
    }
  }
}
</style>