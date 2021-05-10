<template>
  <div class="row">
    <div class="col-xl-3">
      <div class="d-block" style="margin-top: 50px">
        <ul class="nav">
          <li :class="isActive('customer')" @click="redirect('customer')"><i class="sub-title fas fa-user"></i> Thông
            tin tài khoản
          </li>
          <li :class="isActive('customer.notification')" @click="redirect('customer.notification')"><i
              class="sub-title fas fa-bell"></i> Thông báo của tôi
          </li>
          <li :class="isActive('customer.order.history')" @click="redirect('customer.order.history')"><i
              class="sub-title fas fa-book"></i> Quản lý đơn hàng
          </li>
          <li :class="isActive('customer.address')" @click="redirect('customer.address')"><i
              class="sub-title fa fa-map-marker"></i> Sổ địa chỉ
          </li>
          <li :class="isActive('customer.review')" @click="redirect('customer.review')"><i
              class="sub-title fas fa-comment-dollar"></i> Nhận xét sản phẩm đã mua
          </li>
          <li :class="isActive('customer.favourite')" @click="redirect('customer.favourite')"><i
              class="sub-title fas fa-heart"></i> Sản phẩm yêu thích
          </li>
          <li @click="logout"><i class="sub-title fa fa-power-off"></i> Đăng xuất</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {LOGOUT} from "../../store/actions.type";

export default {
  name: "Customer",
  data() {
    return {}
  },
  methods: {
    redirect(_name, params = {}) {
      this.$router.push({name: _name, params: params}).catch(() => {
      });
    },

    isActive(_name) {
      return {
        active: this.$route.name == _name
      }
    },

    logout() {
      this.$store.dispatch(LOGOUT)
          .then(() => {
            this.$swal({
              title: "Đăng xuất thành công!",
              text: "Hẹn gặp lại dân chơi vào lần sau!",
              icon: "success",
              button: "Đóng",
            });
            this.$router.push({name: 'home'})
          })
    }


  },

  computed: {}

}
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
}

.nav > li {
  padding: 10px 18px;
  cursor: pointer;
  user-select: none;
}

.nav > li > i {
  min-width: 1.2em;
}

.nav > li.active, .nav > li:hover {
  background-color: rgb(236, 236, 236);
  color: rgb(0, 0, 0);
}

.sub-title {
  font-size: 1.5em;
  margin-right: 10px;
}
</style>