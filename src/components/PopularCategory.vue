<template>
  <router-link tag="div" :to="{name:'search'}" class="popular-category col my-2">
    <div class="d-flex flex-column">
      <div class="category-image align-self-center" style="width: 60px;height: 60px;">
        <img width="100%" height="100%"
             src="https://salt.tikicdn.com/cache/280x280/ts/product/65/7c/80/6c37dc817e76ec149e2f2a8ec20f9977.jpg"
             alt="">
      </div>
      <div class="text-center limit-line"><span>Móc treo kẹp quần áo Móc treo kẹp quần áo </span></div>
    </div>
  </router-link>
</template>
<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.popular-category{
  cursor: pointer;
}

.popular-category .category-image {
  border-radius: 16px;
  overflow: hidden;
}

.popular-category .limit-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>