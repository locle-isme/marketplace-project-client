<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Quản lý đơn hàng</div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table mt-3">
            <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày mua</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái đơn hàng</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <router-link :to="{name:'customer.order.detail', params:{orderID: 1}}">
                  <span style="cursor: pointer" class="text-primary">#635678450</span>
                </router-link>
              </td>
              <td>24/03/2021</td>
              <td>Ổ Cứng SSD Samsung 860 Evo 250GB Sata III 2.5 inch - Hàng Nhập Khẩu (Box Tiếng Anh)</td>
              <td>962.900 ₫</td>
              <td>Giao hàng thành công</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="my-4 d-flex float-right">
          <VPagination></VPagination>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import VPagination from "../../components/VPagination";

export default {
  name: "CustomerOrderHistory",
  components: {
    VPagination
  }
}
</script>

<style lang="scss">

</style>