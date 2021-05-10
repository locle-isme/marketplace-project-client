<template>
  <div class="row border-bottom py-3">
    <div class="col-md-12 col-lg-3 border-right">
      <div class="reviewer-info d-flex flex-column">
        <div class="reviewer-name">Bon Bon</div>
        <div><span style="font-size: 0.9em; color: rgb(120, 120, 120);">Đã tham gia 2 năm</span>
        </div>
        <div><span style="color: rgb(120, 120, 120);">Đã viết:</span> 3 đánh giá</div>
      </div>
    </div>
    <div class="reviewer-comment col-lg-9 col-md-12">
      <div class="d-flex flex-column">
        <RatingTitle></RatingTitle>
        <div class="content d-flex flex-column">
          <div class="comment">
                                        <span>
                                            Túi này dễ thương lắm Mình dễ phối với quần áo hay đầm đi tiệc , nhìn đáng
                                            yêu , điệu đà Màu này lên rất sang luôn , thêm cái khăn điệu đà lắm cơ sẽ
                                            giới thiệu cho bạn bè mua thêm ^^
                                        </span>
          </div>
          <div class="created-date"><span>Nhận xét vào 27/02/2021 06:40</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RatingTitle from "./RatingTitle";
export default {
  components:{
    RatingTitle
  }
}
</script>
<style>
.reviewer-comment .content > .created-date span{
  font-size: 0.85em;
  color: rgb(120, 120, 120);
}
</style>