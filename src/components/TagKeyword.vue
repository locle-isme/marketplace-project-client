<template>
  <router-link tag="div" :to="{name:'search'}" class="keyword-search"><i class="fa fa-search" aria-hidden="true"></i>
    xúc xích
  </router-link>
</template>

<script>
export default {}
</script>
<style lang="scss">
.keyword-search {
  border-radius: 20px;
  padding: 4px 15px;
  border: 1px rgb(120, 120, 120) solid;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background: rgb(81, 77, 77);
    color: #eee;
  }
}

</style>