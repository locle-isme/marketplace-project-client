<template>
  <div class="product-item col" style="padding: 1rem">
    <div class="d-flex flex-column">
      <div>
        <img src="https://salt.tikicdn.com/cache/280x280/ts/product/18/d5/c1/12b6f5dee03a86bb0dc6f4fa847df279.jpg"
             class="img-thumbnail" alt="">
      </div>
      <div class="name mt-2 limit-line">
        <span>Combo 10 móc treo quần áo đa năng 9 lỗ tiện dụng tên dài vaivaivaivaivaivaivai</span>
      </div>
      <div class="rating-review d-flex align-items-center my-2">
        <div class="position-relative">
          <div class="rating-total d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="review">18</div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="price">69.000 ₫</div>
      <div class="discount text-light ml-1">- 45%</div>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.product-item:hover{
  box-shadow: rgba(0,0,0, 0.1) 0px 0px 20px;
}

.product-item .name{
  text-align: left;
  font-weight: 550;
}
.product-item .limit-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}


.product-item .rating-review .rating-avg {
  top: 0;
  left: 0;
  width: 100%
}

.product-item .rating-review .review{
  margin-left: 5px;
  font-size: 0.95em;
}

.product-item .discount{
  background: #e74646;
  padding: 2px 3px;
  user-select: none;
  border-radius: 5px;
}


</style>