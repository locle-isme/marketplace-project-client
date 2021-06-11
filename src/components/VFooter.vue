<template>
  <!-- FOOTER -->
  <footer>
    <div class="container-fluid border-bottom">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-6 col-md-3">
            <h6 class="text-uppercase">Hổ trợ khách hàng</h6>
            <p><span class="text-danger">Hotline chăm sóc khách hàng: 1900-1515 </span>
              <span><small>(1000đ/phút , 8-21h kể cả T7, CN)</small></span></p>
            <p>Các câu hỏi thường gặp</p>
            <p>Yêu cầu hổ trợ</p>
            <p>Hướng dẫn</p>
          </div>

          <div class="col-12 col-sm-6 col-md-2">
            <h6 class="text-uppercase">Về Tụi Tôi</h6>
            <p>Giới thiệu</p>
            <p>Tuyển dụng</p>
            <p>Chính sách bảo mật</p>
            <p>Chính sách giải quyết khiếu nại</p>
          </div>

          <div class="col-12 col-sm-6 col-md-2">
            <h6 class="text-uppercase">Hợp tác và liên kết</h6>
            <p>Quy chế hoạt động</p>
            <p>Bán hàng cùng TNZ</p>

          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <h6 class="text-uppercase">PHƯƠNG THỨC THANH TOÁN</h6>
            <p style="max-width: 192px; display: flex; flex-wrap: wrap">
              <img class="icon" src="images/payment/visa.svg"
                   width="54" alt=""/>
              <img class="icon"
                   src="images/payment/mastercard.svg"
                   width="54" alt="">
              <img class="icon" src="images/payment/jcb.svg"
                   width="54" alt="">
              <img class="icon" src="images/payment/cash.svg"
                   width="54"
                   alt=""/>
              <img class="icon"
                   src="images/payment/internet-banking.svg"
                   width="54" alt=""/>
              <img class="icon"
                   src="images/payment/installment.svg"
                   width="54" alt=""/></p>
          </div>

          <div class="col-12 col-sm-6 col-md-2">
            <h6 class="text-uppercase">Kết nối với chúng tôi</h6>
            <div>
              <a href="https://www.facebook.com/profile.php"><i class="fab fa-facebook fa-3x text-primary"></i></a>
              <a href=""><i class="fab fa-twitter fa-3x text-info"></i></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><i class="fab fa-youtube fa-3x text-danger"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" style="margin-top: 10px;">
      <div class="container">
        <div class="row row-cols-1">
          <div class="col m-4">
            <p><b>Địa chỉ văn phòng:</b> 70/10 Tô Ký, P.TCH, Q.12, thành phố Hồ Chí Minh</p>
            <p>TNZ nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại
              văn phòng
              hoặc trung tâm xử lý đơn hàng</p>
          </div>
          <div class="col">
            <p class="font-weight-bold">© 2020 - Bản quyền của Công Ty Cổ Phần TNZ</p>
            <small><span>Giấy chứng nhận Đăng ký Kinh doanh số 696969 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí
              Minh cấp ngày 06/09/2069</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- END FOOTER -->
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
footer {
  background: #fff;
  padding: 20px 0px;
  margin-top: 100px;

  h6 {
    font-weight: 600;
    margin-bottom: 15px;
  }

  span {
    font-size: 1em;
    color: rgb(51, 51, 51) !important;
  }

  p {
    @extend span;
  }

  .icon {
    padding: 0px 10px 10px 0px;
  }

  .fab {
    margin: 5px;
  }
}


</style>