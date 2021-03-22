<template>
  <div class="review-images d-flex flex-column">
    <span style="font-size: 1.11rem;font-weight: 600">Tất cả hình ảnh (2)</span>
    <div class="d-flex">
      <div class="review-img">
        <div
            style="background-image: url('https://vcdn.tikicdn.com/cache/w120/ts/review/d9/5c/56/836d7dcf0c736d8a56e4b7a1706f6a11.jpg');"></div>
      </div>
      <div class="review-img">
        <div
            style="background-image: url('https://vcdn.tikicdn.com/cache/w120/ts/review/d9/5c/56/836d7dcf0c736d8a56e4b7a1706f6a11.jpg');"></div>
      </div>
      <div class="review-img">
        <div
            style="background-image: url('https://vcdn.tikicdn.com/cache/w120/ts/review/d9/5c/56/836d7dcf0c736d8a56e4b7a1706f6a11.jpg');"></div>
      </div>
      <div class="review-img">
        <div
            style="background-image: url('https://vcdn.tikicdn.com/cache/w120/ts/review/d9/5c/56/836d7dcf0c736d8a56e4b7a1706f6a11.jpg');"></div>
      </div>
      <div class="review-img">
        <div
            style="background-image: url('https://vcdn.tikicdn.com/cache/w120/ts/review/d9/5c/56/836d7dcf0c736d8a56e4b7a1706f6a11.jpg');"></div>
      </div>
      <div class="review-img">
        <div
            style="background-image: url('https://vcdn.tikicdn.com/cache/w120/ts/review/d9/5c/56/836d7dcf0c736d8a56e4b7a1706f6a11.jpg');"></div>
      </div>
      <div class="review-img">
        <div
            style="background-image: url('https://vcdn.tikicdn.com/cache/w120/ts/review/d9/5c/56/836d7dcf0c736d8a56e4b7a1706f6a11.jpg');"></div>
        <span>+15</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style>
.review-images .review-img {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 20px 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-images .review-img > div {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
}

.review-images .review-img > span {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.7);
  user-select: none;
  padding: 0px 2px;
}

</style>