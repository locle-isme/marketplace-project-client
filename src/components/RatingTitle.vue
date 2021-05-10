<template>
  <div class="rating-title d-flex align-items-center">
    <div class="position-relative">
      <div class="rating-total d-flex">
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
        <i class="far fa-star text-warning"></i>
      </div>
      <div class="rating-avg d-flex position-absolute" style="width: 100%">
        <i class="fas fa-star text-warning fa-1x"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
      </div>
    </div>
    <div class="title">Hài lòng tuyệt đối</div>
  </div>
</template>

<script>
export default {

}
</script>
<style>
.rating-title{
  margin: 3px 0px;
}
.rating-title .rating-avg{
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.rating-title .title{
  font-size: 1em;
  margin: 0 10px;
  font-weight: 600;
  user-select: none;
}
</style>