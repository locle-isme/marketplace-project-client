<template>
  <div class="col-xl-9 col-md-12">
    <div class="card" style="border: unset;background: unset">
      <div class="card-title"><span style="font-size: 1em">Chi tiết đơn hàng #310229992 - </span> <span
          style="font-size: 1em">Giao hàng thành công</span></div>
      <div class="mt-4"><span style="font-size: 0.8em">Ngày đặt hàng: 13:20 02/06/2020</span></div>
      <div class="row">
        <div class="col">
          <div class="notification card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">THÔNG BÁO</div>
            <div class="card-body">
              <div class="d-flex">
                <span style="min-width: 150px" class="text-dark">14:01 05/06/2020</span>
                <span style="text-align: justify">Chúng tôi vừa bàn giao đơn hàng của quý khách đến đối tác vận chuyển Tiki Team. Đơn hàng của quý khách sẽ được giao trong ngày hôm nay 05/06/2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-4" style="margin-top: 18px">
          <div class="shipping card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">ĐỊA CHỈ NGƯỜI NHẬN</div>
            <div class="card-body">
              <div class="mt-1">
                <span class="text-uppercase font-weight-bold text-dark">lộc lê</span>
              </div>
              <div class="mt-1">
                <span style="color: #959595">Địa chỉ:&nbsp;</span>
                <span>70/10 To Ky, Phường Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</span>
              </div>
              <div class="mt-1">
                <span style="color: #959595">Điện thoại: &nbsp;</span>
                <span>0358771364</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4" style="margin-top: 18px">
          <div class="shipping card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">HÌNH THỨC GIAO HÀNG</div>
            <div class="card-body">
              <div class="mt-1">
                <span style="color: #959595">Giao vào &nbsp;</span>
                <span>Thứ sáu, 05/06</span>
              </div>
              <div class="mt-1">
                <span style="color: #959595">Phí vận chuyển:&nbsp;</span>
                <span>19.000đ</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4" style="margin-top: 18px">
          <div class="shipping card">
            <div class="card-title text-uppercase" style="font-weight: unset;font-size: 1em">HÌNH THỨC THANH TOÁN</div>
            <div class="card-body">
              <div class="mt-1">
                <span>Thanh toán tiền mặt khi nhận hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Giảm giá</th>
                  <th><span class="float-right">Tạm tính</span></th>
                  </thead>
                  <tbody>
                  <tr style="background: rgba(33,238,224,0.1)">
                    <td>
                      <div class="d-flex">
                        <div class="image-detail"><img width="100%" height="100%" class="img-thumbnail"
                                                       src="https://salt.tikicdn.com/cache/200x200/ts/product/d9/5f/97/4b8d952402cfe75a08403cf758eee7df.jpg"
                                                       alt=""></div>
                        <div class="d-flex flex-column ml-2">
                          <div><span style="font-weight: 600; color: #1f648b;cursor: pointer">Khay Ổ Cứng Laptop (Caddy Bay) ORICO L95SS (9.5mm) - Hàng Chính hãng</span>
                          </div>
                          <div class="mt-1"><span>Cung cấp bởi &nbsp;</span><span class="text-primary"
                                                                                  style="cursor: pointer">Tiki Trading</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>169.000₫</td>
                    <td>1</td>
                    <td>0 ₫</td>
                    <td><span class="float-right">169.000₫</span></td>
                  </tr>


                  <tr>
                    <td colspan="4"><span class="float-right" style="color: rgb(149, 149, 149);">Tạm tính</span></td>
                    <td><span class="float-right">49.700₫</span></td>
                  </tr>
                  <tr>
                    <td colspan="4" style="border: unset"><span class="float-right" style="color: rgb(149, 149, 149);">Phí vận chuyển </span>
                    </td>
                    <td style="border: unset"><span class="float-right">49.700₫</span></td>
                  </tr>
                  <tr>
                    <td colspan="4" style="border: unset"><span class="float-right"
                                                                style="color: rgb(78,78,78);font-size: 1.2em">Tổng kết</span>
                    </td>
                    <td style="border: unset">
                      <span class="text-danger font-weight-bold float-right" style="font-size: 1.2em">49.000.700₫</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerOrderDetail"
}
</script>

<style lang="scss">

.image-detail {
  width: 70px;
  height: 70px;
  @media (max-width: 576px) {
    width: 200px !important;
    height: 200px !important;
  }

}

.notification {
  span {
    font-size: 0.95em;
    color: #6b6b6b;
  }
}

.shipping {
  height: calc(100% - 25px);

  .card-body {
    span {
      font-size: 0.9em;
      color: #6b6b6b;
    }
  }
}

</style>