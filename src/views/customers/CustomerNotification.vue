<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Thông báo của tôi</div>
      <div class="card-body">
        <ul class="nav nav-tabs">
          <li class="nav-item" title="Thông báo chung">
            <div class="nav-link active">
              <i class="fa fa-2x fa-home" aria-hidden="true"></i>
            </div>
          </li>
          <li class="nav-item" title="Thông báo khuyến mãi">
            <div class="nav-link">
              <i class="fa fa-2x fa-gift" aria-hidden="true"></i>
            </div>
          </li>
          <li class="nav-item" title="Thông báo đơn hàng">
            <div class="nav-link">
              <i class="fa fa-2x fa-ticket-alt" aria-hidden="true"></i>
            </div>
          </li>
          <li class="nav-item" title="Thông báo hệ thống">
            <div class="nav-link">
              <i class="fa fa-2x fa-history" aria-hidden="true"></i>
            </div>
          </li>
        </ul>
        <div class="table-responsive">
          <table class="table mt-3">
            <tbody>
            <tr>
              <td>07/04/2021</td>
              <td>
                <div class="circle bg-primary">
                  <i class="fa fa-history" aria-hidden="true"></i>
                </div>
              </td>
              <td>Đơn hàng #635678450 đã sẵn sàng để giao đến quý khách. Chúng tôi vừa bàn giao đơn hàng của quý khách
                đến đối tác vận chuyển Tiki Team. Đơn hàng sẽ được giao trước 23:59 ngày 24/03/2021 Chi tiết
              </td>
              <td>
                <button class="btn btn-sm btn-danger">Xóa</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="my-4 d-flex float-right">
          <PaginateComponent :currentPage.sync="currentPage" :pages="50"></PaginateComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginateComponent from "../../components/PaginateComponent";

export default {
  data() {
    return {currentPage: 1}
  },
  name: "CustomerNotification",
  components: {
    PaginateComponent
  }
}
</script>

<style lang="scss">
.nav-tabs {
  li {
    &.nav-item {
      &:hover {
        cursor: pointer;
      }
    }

    .active {
      color: #0075ff;
    }
  }
}

.circle {
  font-size: 28px !important;
  width: 30px;
  height: 30px;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>