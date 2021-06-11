<template>
  <div class="category-item d-flex flex-column align-items-center" @click="goCategory(1)">
    <div class="image">
      <img width="100%" src="https://cf.shopee.vn/file/ec14dd4fc238e676e43be2a911414d4d_tn" alt="">
    </div>
    <div class="name-category limit-line text-center">Thịt chó Thịt chó Thịt chó Thịt chó Thịt</div>
  </div>
</template>

<script>
import {HandleRedirect} from "../../../mixins/redirect.handle";

export default {
  mixins: [HandleRedirect],
  methods: {
    goCategory(id) {
      this.redirect('category', {slug: id});
    }
  },
  name: "CategoryItem"
}
</script>

<style>

</style>