<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="user-action position-absolute d-flex">
          <div class="single-action like-product active"><i class="fa fa-heart" aria-hidden="true"></i></div>
          <div class="single-action share-product"><i class="fa fa-share-alt" aria-hidden="true"></i></div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="product-image col-xl-4 col-lg-12 border-right mb-4">
              <div class="d-flex flex-column align-items-center">
                <div class="img-thumbnail">
                  <img width="100%" height="100%"
                       src="https://salt.tikicdn.com/cache/w444/ts/product/bf/be/83/3ba7bb510766ae7dc1e9713146da9393.jpg"
                       alt="">
                </div>
                <div class="d-flex flex-wrap review-image justify-content-center position-relative">
                  <template v-for="x in 7">
                    <div :key="x" class="view-photo">
                      <img
                          src="https://salt.tikicdn.com/cache/w64/ts/product/bf/be/83/3ba7bb510766ae7dc1e9713146da9393.jpg"
                          alt="">

                      <span v-if="x == 7">Xem thêm 69 hình</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="product-content col-xl-8 col-lg-12 position-relative">
              <div class="d-flex flex-column">
                <div class="brand"><span>Thương hiệu:</span> <a href="#"><span>OEM</span></a></div>
                <div class="name-product">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi culpa
                  deleniti eos, est excepturi exercitationem impedit ipsam iste, mollitia natus odio
                  quisquam repellendus rerum sequi ut vel velit veniam, voluptates.
                </div>

                <div class="row">
                  <div class="col-lg-8 col-sm-12">
                    <div class="card-price d-flex align-items-center">
                      <div class="current-price">71.000₫</div>
                      <div class="root-price">89.000₫</div>
                      <div class="decrease-discount">-11%</div>
                    </div>
                    <div class="card-address d-flex">
                      <span>Giao đến:</span>
                      <span class="detail-address">Q. 12, P. Tân Chánh Hiệp, Hồ Chí Minh</span>
                      <span class="change-address">Đổi địa chỉ</span>
                    </div>
                    <div class="card-buy d-flex flex-column">
                      <div class="detail-mount d-flex align-items-center flex-wrap">
                        <span>Số lượng:</span>
                        <div class="up-down-amount-group">
                          <button><i class="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <input type="text" value="1">
                          <button><i class="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </div>
                        <span class="text-danger text-uppercase font-weight-bold">CHỈ CÒN LẠI 1 SẢN PHẨM</span>
                      </div>
                      <div class="my-3">
                        <button class="btn btn-block btn-danger font-weight-bold">Chọn mua</button>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <div class="card-store d-flex flex-column">
                      <div class="card-store-info d-flex align-items-center">
                        <div class="avatar">
                          <img src="https://vcdn.tikicdn.com/ts/seller/e3/84/1f/33b673123f5c858676ca98872184e9ee.png"
                               alt="">
                        </div>
                        <span class="name-store">Mogo</span>
                      </div>
                      <div class="seller-detail row">
                        <div class="col border-right">
                          <div class="d-flex flex-column align-items-center">
                            <div class="rate">4.8/5.0 <i class="fas fa-star text-warning"></i>
                            </div>
                            <span class="review">(88)</span>
                          </div>
                        </div>
                        <div class="col">
                          <div class="d-flex flex-column align-items-center">
                            <div class="follow">12</div>
                            <span class="review">Theo dõi</span>
                          </div>
                        </div>
                      </div>
                      <div class="buyer-action d-flex justify-content-center mt-3">
                        <button class="btn btn-outline-primary"><i class="fa fa-shopping-bag"></i>
                          Xem shop
                        </button>
                        <button class="btn btn-outline-primary"><i class="fas fa-plus"></i> Theo dõi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-9 col-lg-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Thông tin chi tiết</div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="product-detail table">
              <tbody>
              <tr>
                <td>Thương hiệu</td>
                <td>OEM</td>
              </tr>
              <tr>
                <td>Xuất xứ thương hiệu</td>
                <td>Trung Quốc</td>
              </tr>
              <tr>
                <td>Xuất xứ</td>
                <td>Trung Quốc</td>
              </tr>
              <tr>
                <td>SKU</td>
                <td>9911662691998</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-9 col-lg-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Mô tả sản phẩm</div>
        <div class="card-body">
          <div class="product-description position-relative">
            <div class="toggle">
              Thiết kế lịch lãm, sang trọng<br>
              Độc đáo với thiết kế siêu nhẹ và bền<br>
              Màu sắc cá tính riêng biệt<br>
              Thiết kế êm ái và thoải mái<br>
              Dễ dàng phối trang phục<br>
              Chất liệu cao cấp<br>
              Mũi giày tròn<br>
              Đế bằng cao su tổng hợp; xẻ rãnh chống trơn trượt<br>
              Giày giúp tăng 3cm chiều cao<p>Môt đôi giày luôn là sự lựa chọn tuyệt vời bởi sự phong phú
              trong
              việc phối đồ, phù hợp với nhiều phong cách khác nhau, đều rất thuận tiện cho vui chơi, đi
              học và
              đi làm, mang lại một vẻ đẹp đặc trưng từ màu sắc đậm nhạt…</p>
              <p>Ngoài ra Giày được thiết kế theo phong cách thời trang hiện đại nhất, luôn trở thành điểm
                nhấn thu hút mọi ánh nhìn<br>Thiết kế lịch lãm, sang trọng<br>Độc đáo với thiết kế siêu
                nhẹ
                và bền<br>Màu sắc cá tính riêng biệt<br>Thiết kế êm ái và thoải mái<br>Dễ dàng
                phối
                trang phục<br>Chất liệu cao cấp<br>Mũi giày tròn<br>Đế bằng cao su tổng hợp; xẻ rãnh
                chống
                trơn trượt</p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/71/bd/11/0f99e3bb292fcd102e67a1f406b4c824.jpg" alt="" width="696"
                  height="455"></p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/74/40/c3/14b672a94dd4b6c3016a81b36c1f82b7.jpg" alt="" width="720"
                  height="720"></p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/c9/2b/93/8d7dd031fd63f72e5e66991583c45975.jpg" alt="" width="720"
                  height="720"></p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/4e/39/63/823fd8122bc736212eea06ad28cc7587.jpg" alt="" width="750"
                  height="490"></p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/fd/61/4c/6a9d8c2d55206181067a8e10b9797d39.jpg" alt="" width="726"
                  height="1280"></p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/1a/5d/c4/93af2bdd851bcf714de41d3537412bf1.jpg" alt="" width="750"
                  height="616"></p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/ae/c1/95/ff7d37c88eebe314e5324dc37ecd5ac1.jpg" alt="" width="750"
                  height="750"></p>
              <p style="text-align: center;"><img
                  src="https://salt.tikicdn.com/ts/tmp/04/0b/26/ddba37cc10206ef348b4caf0100962a4.jpg" alt="" width="750"
                  height="564"></p>
              <p style="text-align: center;">&nbsp;</p>
              <p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Tuy nhiên tuỳ vào từng loại
                sản
                phẩm hoặc phương thức, địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí
                vận
                chuyển, phụ phí hàng cồng kềnh, ...</p></div>
            <div class="gradient"></div>

          </div>
          <div class="d-flex my-3">
            <button class="btn btn-sm btn-outline-primary mx-auto">Xem thêm nội dung</button>
          </div>
        </div>
      </div>
    </div>


    <div class="col-12">
      <div class="card position-relative">
        <div class="card-title text-uppercase">Đánh giá sản phẩm</div>
        <div class="card-body">
          <div class="row border-bottom" style="padding-bottom: 20px">
            <div class="col-lg-3 col-md-12">
              <ReviewRating></ReviewRating>
            </div>
            <div class="col-lg-9 col-md-12">
              <ReviewImage></ReviewImage>
            </div>
          </div>

          <div class="feedback d-flex flex-column">
            <template v-for="(feedback, i) in 8">
              <FeedbackUser :key="i"></FeedbackUser>
            </template>
          </div>

          <div class="my-4 d-flex float-right">
            <VPagination></VPagination>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
import ReviewRating from "@/components/ReviewRating";
import ReviewImage from "@/components/ReviewImage";
import FeedbackUser from "@/components/FeedbackUser";
import VPagination from "@/components/VPagination";
export default {
  components:{
    ReviewRating,
    ReviewImage,
    FeedbackUser,
    VPagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.product-content .name-product {
  font-weight: 100;
  font-size: 21px;
}

@media (min-width: 1200px) {
  .product-content .name-product {

    max-width: 615px;
  }
}


.user-action {
  top: -35px;
  right: -30px;
}

.user-action > .single-action {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  box-shadow: rgb(120 120 120) 0px 2px 6px 0px;
  cursor: pointer;
}

.user-action > .single-action.active {
  color: #dc3545;
  box-shadow: rgb(238 160 160) 0px 2px 6px 0px;
}

.card-price {
  margin: 15px 0px;
  padding: 10px 20px;
  background: #e9e9e9;
  border-radius: 5px;
}

.review-image {
  margin-top: 10px;
}

.review-image > .view-photo {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 4px;
  margin-right: 8px;
  margin-top: 8px;
  overflow: hidden;
  opacity: 0.85;
  cursor: pointer;
}

.review-image > .view-photo img {
  width: 100%;
  height: 100%;
}

.review-image > .view-photo.active {
  box-shadow: rgb(120 120 120) 0px 2px 6px 0px;
}

.review-image > .view-photo:last-child span {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  text-align: center;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 11px;
  background-color: rgba(0, 0, 0, 0.7);
  user-select: none;
  padding: 0px 2px;
}


.card-price {
  padding: 10px 20px;
  background: #e9e9e9;
  border-radius: 5px;
}

.card-price > .current-price {
  font-size: 2rem;
  font-weight: 600;
  margin-right: 15px;
  color: #be0505;
}


.card-price > .root-price {
  font-size: 1rem;
  margin-right: 15px;
  text-decoration: line-through;
}

.card-price > .root-price {
  font-size: 1rem;
}

.card-address {
  margin-bottom: 20px;
  padding: 20px 0px;
  border-bottom: 1px #d2cece solid;
  border-top: 1px #d2cece solid;
}

.card-address > span {
  margin-right: 20px;
}

.card-address > span.detail-address {
  font-weight: 600;
}

.card-address > span.change-address {
  font-weight: 600;
  color: #2a88bd;
  text-transform: uppercase;
  cursor: pointer;
}


.card-buy > .detail-mount > .up-down-amount-group {
  margin-right: 10px;
}

.card-buy > .detail-mount > .up-down-amount-group > button {
  width: 30px;
  height: 30px;
  padding: 4px;
  border: 1px #d6d6d6 solid;
  border-radius: 4px;
  background: #fff;
  margin: 0px 3px;
}

.card-buy > .detail-mount > .up-down-amount-group > button:hover {
  background: #7dd1e3;
  border-color: #59b7cd;
  color: #fff;
}

.card-buy > .detail-mount > .up-down-amount-group > input {
  height: 30px;
  width: 50px;
  padding: 4px;
  border: 1px #d6d6d6 solid;
  border-radius: 4px;
  font-size: 15px;
  text-align: center;
}

.card-buy > .detail-mount > span {
  margin: 10px 0px;
}

.card-buy > .detail-mount > span:first-child {
  margin-right: 10px;
}


.card-store {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
  padding: 10px 12px;
  border-radius: 5px;
}

.card-store > .card-store-info {
  cursor: pointer;
}


.card-store > .card-store-info > .avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card-store > .card-store-info > .avatar > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-store > .card-store-info > .name-store {
  margin-left: 15px;
  font-size: 1rem;
  font-weight: 600;
  color: #3e3e3e;
}

.card-store > .seller-detail {
  margin: 10px 0px;
}

.card-store > .seller-detail .rate, .card-store > .seller-detail .follow {
  font-size: 1.2em;
  font-weight: 600;
}

.card-store > .seller-detail .review {
  font-size: 0.8em;
}

.card-store > .buyer-action > .btn {
  margin-right: 3px;
}

table.product-detail tr > td:nth-child(1) {
  background: rgb(239, 239, 239);
  font-weight: 500;
}

table.product-detail tr > td {
  border: none;
}

table.product-detail tr:nth-child(odd) > td:nth-child(2) {
  background: rgba(239, 239, 239, 0.5);
}


.product-description > .toggle {
  height: 500px;
  overflow: hidden;
}

.product-description > .gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
}


</style>




