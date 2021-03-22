<template>
  <div class="review-rating d-flex flex-column">
    <div class="summary d-flex align-items-center">
      <h1>4.3</h1>
      <div class="d-flex flex-column mx-2 align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
            <i class="far fa-star text-warning fa-2x"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 50%">
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
            <i class="fas fa-star text-warning fa-2x"></i>
          </div>
        </div>
        <div class="my-1"><span class="font-weight-bold">0</span> nhận xét</div>
      </div>
    </div>
    <div class="detail d-flex flex-column">
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 100%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div style="width: 70%"></div>
        </div>
        <span>111</span>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 80%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div style="width: 70%"></div>
        </div>
        <span>111</span>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 60%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div style="width: 70%"></div>
        </div>
        <span>111</span>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 40%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div style="width: 70%"></div>
        </div>
        <span>111</span>
      </div>
      <div class="level d-flex align-items-center">
        <div class="star position-relative">
          <div class="rating-point d-flex">
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
            <i class="far fa-star text-warning"></i>
          </div>
          <div class="rating-avg d-flex position-absolute" style="width: 20%">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>
        </div>
        <div class="line">
          <div style="width: 70%"></div>
        </div>
        <span>111</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {}
</script>

<style>
.review-rating .summary .star .fa-2x {
  font-size: 1.4em !important;
}

.review-rating>.detail i, .review-rating>.detail span{
  font-size: 0.8em !important;
}
.review-rating>.detail span{
  color: #5f5b5b !important;
}
.review-rating>.detail>.level>.line{
  position: relative;
  height: 6px;
  width: 100%;
  border-radius: 20px;
  background: #c6c0c0;
  margin: 0px 10px;
}

.review-rating>.detail>.level>.line>div{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  background: #3e3e3e;
}

.star > .rating-avg {
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>

