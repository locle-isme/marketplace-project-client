<template>
  <div class="row">
    <div class="col-lg-9 col-md-12">
      <div class="card position-relative" style="background-color: unset; border: none">
        <div class="card-title text-uppercase">GIỎ HÀNG</div>
        <template v-for="(cart, i) in 3">
          <CartProduct :key="i"></CartProduct>
        </template>
      </div>

    </div>
    <div class="col-lg-3 col-md-12">
      <div class="row">
        <div class="delivery-address col">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                  <div class="font-weight-bold">Địa chỉ nhận hàng</div>
                  <div class="action-change">Thay đổi</div>
                </div>
                <div class="d-flex align-items-center mt-2">
                  <div class="name-customer mr-1">Lê Văn Lộc</div>
                  <div class="line-straight"></div>
                  <div class="phone-customer ml-1">0358771364</div>
                </div>
                <div class="address-customer d-flex mt-2">
                  70/10 Tô Ký, tổ 8, KP3, Phường Tân Chánh Hiệp, Quận 12, Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="coupon col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                  <div class="font-weight-bold">Khuyến mãi</div>
                  <div style="font-size: 0.9em;color: #a7a3a3">Có thể chọn ?</div>
                </div>
                <div class="list-coupon d-flex flex-column mt-3">
                  <template v-for="(i, index) in 3">
                    <div :key="index" class="coupon-item d-flex justify-content-between align-items-center"
                         :class="{active: index == 0}">
                      <div class="coupon-name">Giảm 30%</div>
                      <div>
                        <button class="btn btn-primary btn-sm">Áp dụng</button>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cost-box col-12">
          <div class="card">
            <div class="d-flex flex-column">
              <div class="box-item d-flex justify-content-between">
                <div>Tạm tính</div>
                <div id="temp-cost">1.050.000đ</div>
              </div>
              <div class="box-item d-flex justify-content-between">
                <div>Thành tiền</div>
                <div id="total-cost">1.050.000đ</div>
              </div>
            </div>
          </div>
        </div>
        <div class="purchase col mt-3">
          <button class="purchase-btn btn btn-block btn-danger text-uppercase">Tiến hành đặt hàng</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CartProduct from "@/components/CartProduct";

export default {
  components: {
    CartProduct
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.delivery-address .action-change {
  cursor: pointer;
  color: #2475a0;
  font-size: 0.9em;
}

.delivery-address .name-customer, .delivery-address .phone-customer {
  font-weight: 600;
  font-size: 1em;
}

.delivery-address .address-customer {
  font-size: 0.85em;
}

.coupon .coupon-item {
  background: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 15px 10px;
  border: #ffffff 1px solid;
  margin-bottom: 10px;
}

.coupon .coupon-item.active {
  background: rgba(141, 214, 215, 0.5);
  border-color: #44a5ca;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}


.coupon .coupon-item > .coupon-name {
  font-size: 0.9em;
  font-weight: 600;
}


.cost-box {

}

.cost-box .box-item {
  padding: 15px 15px 20px 15px;
}

.cost-box .box-item:nth-child(1) {
  border-bottom: rgba(162, 160, 160, 0.5) 1px solid;
}

.cost-box .box-item div:nth-child(1) {
  color: #999898;
}

.cost-box .box-item #total-cost {
  font-size: 1.4rem;
  font-weight: 600;
  color: #f86262;
}
</style>