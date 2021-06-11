<template>
  <li class="nav-item">
    <template v-for="i in 2">
      <CategoryItem :key="'ct' + i"></CategoryItem>
    </template>
  </li>
</template>

<script>
import CategoryItem from "./CategoryItem";
export default {
  components:{
    CategoryItem,
  },
  name: "GroupCategory",
}
</script>

<style>

</style>