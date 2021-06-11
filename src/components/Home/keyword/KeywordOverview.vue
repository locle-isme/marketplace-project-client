<template>
  <div class="row">
    <div class="col">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Tìm kiếm nổi bật</div>
        <div class="feature-search card-body">
          <div class="d-flex flex-wrap">
            <template v-for="i in 20">
              <TagKeyword :key="i"></TagKeyword>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagKeyword from "./TagKeyword";

export default {
  components: {
    TagKeyword
  },
  name: "KeywordOverview"
}
</script>

<style scoped>

</style>