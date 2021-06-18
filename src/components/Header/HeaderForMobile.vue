<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-danger text-light fixed-top d-lg-none">
      <div class="on-mobile container-fluid position-relative">
        <div class="d-flex flex-column w-100">
          <div class="d-flex w-100 justify-content-between align-items-center py-2">
            <div style="cursor: pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img"
                   focusable="false" @click="setStatusShowNavBar()">
                <title>Menu</title>
                <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"
                      d="M4 7h22M4 15h22M4 23h22"></path>
              </svg>
            </div>
            <div @click="redirect('home')" class="logo"></div>
            <router-link tag="div" :to="{name:'checkout.cart'}" class="cart position-relative">
              <b-icon icon="cart" font-scale="2" aria-hidden="true"></b-icon>
              <div class="badge-cart">
                <span class="count">{{ totalItemCart }}</span></div>
            </router-link>
          </div>
          <form action="" class="form-search d-flex my-2 justify-content-around w-100"
                :class="{'scroll-nav': statusScrollNavBar}">
            <div class="input-group mr-2">
              <input v-model="keywordSearch" type="text" class="form-control"
                     placeholder="Tìm kiếm sản phẩm ...">
            </div>
            <button type="submit" class="btn btn-dark" style="width: 10rem;" @click.prevent="handleSearchProduct">
              <i class="fa fa-search" aria-hidden="true"></i> Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </nav>
    <transition
        name="fade"
        enter-active-class="fadeInLeft"
        leave-active-class="fadeOutLeft"
    >
    <div v-if="statusShowNavBar" class="nav-left-bar d-flex position-fixed" :class="{show: statusShowNavBar}">
      <div class="inner menu">
        <div class="d-flex justify-content-between align-items-center p-3 bg-info text-light">
          <div><i class="fas fa-user-alt" style="font-size: 2em"></i></div>
          <div v-if="isAuthenticated" class="d-flex flex-column align-items-start" @click="redirect('customer')">
            <span class="name text-uppercase">{{ user.name }}</span>
            <span class="email">{{ user.email }}</span>
          </div>
          <div v-else @click="statusShowVAuth = true" style="cursor: pointer; font-weight: 600;" class="text-uppercase">
            <span>Đăng nhập</span>
          </div>
          <div style="cursor: pointer" @click="setStatusShowNavBar()"><i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <div class="d-flex flex-column">
          <ul class="nav">
            <li @click="redirect('home')"><i class="sub-title fas fa-home"></i> Trang chủ</li>
            <li v-if="isAuthenticated" @click="redirect('customer')"><i class="sub-title far fa-address-card"></i> Quản
              lý tài khoản
            </li>
            <li v-if="isAuthenticated" @click="redirect('customer.notification')"><i class="sub-title far fa-bell"></i>
              Thông báo
            </li>
<!--            <li @click="setStatusShowCategoryList()"><i class="sub-title fa fa-list"></i> Danh mục sản phẩm</li>-->
          </ul>
          <div class="sub-head text-uppercase">Khuyến mãi hot</div>
          <ul class="nav">
            <li>Phiếu quà tặng</li>
          </ul>
        </div>
      </div>
      <div class="inner category-list" :class="{'d-none': !statusShowCategoryList}">
        <div class="d-flex justify-content-between align-items-center p-3 bg-danger text-light"
             @click="setStatusShowCategoryList()">
          <div>
            <i class="fa fa-list" style="font-size: 2em"></i>
          </div>
          <div class="d-flex flex-column align-items-start">
            <span class="name">Menu</span>
          </div>
          <div><i class="fas fa-chevron-left" style="font-size: 1rem" aria-hidden="true"></i></div>

        </div>
        <div class="d-flex flex-column">
          <ul class="nav">
            <li><i class="sub-title fa fa-mobile"></i> Điện thoại - máy tính bảng</li>
            <li><i class="sub-title fa fa-asterisk"></i> Điện tử - điện lạnh</li>
            <li><i class="sub-title fa fa-laptop"></i> Laptop</li>
            <li><i class="sub-title fa fa-bath"></i> Nhà cửa đời sống</li>
            <li><i class="sub-title fa fa-child"></i> Làm đẹp</li>
            <li><i class="sub-title fa fa-gift"></i> Thời trang</li>
          </ul>
        </div>
      </div>
      <div class="overlay" @click="setStatusShowNavBar()"></div>
    </div>
    </transition>
    <VAuth v-if="statusShowVAuth" @close="statusShowVAuth = false"></VAuth>
  </div>
</template>

<script>
import VAuth from "./VAuth";
import {HeaderMixin} from "../../mixins/header.mixin";

export default {
  mixins: [HeaderMixin],
  props: {
    totalItemCart: {
      type: [String, Number],
      required: true,
      default: 0
    }
  },
  data() {
    return {
      statusShowNavBar: false,
      statusScrollNavBar: false,
      statusShowCategoryList: false,
      statusShowMenu: false,
      statusShowVAuth: false,
    }
  },

  components: {
    VAuth,
  },

  mounted() {
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 80) {
        this.statusScrollNavBar = true;
      } else {
        this.statusScrollNavBar = false;
      }
    });
  },

  methods: {

    redirect(_name, params = {}) {
      this.$router.push({name: _name, params: params}).then(() => {
        this.statusShowNavBar = false;
      }).catch(() => {

      });
    },

    setStatusShowNavBar() {
      this.statusShowNavBar = !this.statusShowNavBar;
      this.statusShowCategoryList = false;
    },

    setStatusShowCategoryList() {
      this.statusShowCategoryList = !this.statusShowCategoryList;
    }
  },

  computed: {
  }
}
</script>

<style lang="scss">

</style>