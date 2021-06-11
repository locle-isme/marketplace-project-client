<template>
  <nav class="navbar navbar-expand-lg bg-danger text-light  d-md-none d-lg-block">
    <div class="on-pc container-fluid position-relative d-none d-lg-block">
      <div class="d-flex flex-column w-100 justify-content-center"
           style="padding-right: 23px;padding-left: 23px;padding-bottom: 5px;">
        <div class="d-flex justify-content-between">
          <ul class="navbar-nav">
            <li class="nav-item">
              <div class="nav-link">Kênh người bán</div>
            </li>
            <li class="nav-item social">
              <div class="nav-link"> Kết nối
                <a href="https://www.facebook.com/profile.php"> <i class="fab fa-facebook"></i>&nbsp;</a>
                <a href=""><i class="fab fa-twitter"></i>&nbsp;</a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> <i class="fab fa-youtube"></i>&nbsp;</a>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <div class="nav-link" @click="goNotification"><i class="fas fa-bell"></i> Thông báo</div>
            </li>
            <li class="nav-item">
              <div class="nav-link"><i class="fa fa-life-ring"></i> Hổ trợ</div>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <div class="nav-link" @click="goRegister"><i class="fas fa-bell"></i> Đăng ký</div>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <div class="nav-link" @click="goLogin"><i class="fas fa-bell"></i> Đăng nhập</div>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <div class="nav-link d-flex" @click="goProfile" style="cursor: pointer">
                <div class="avatar">
                  <div class="placeholder">
                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0"
                         class="taka-svg-icon icon-headshot">
                      <g>
                        <circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle>
                        <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round"
                              stroke-miterlimit="10"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="ml-1 username">{{ user.name }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="d-flex mt-3 align-items-center justify-content-between">
          <div class="taka-logo" @click="goHome">
            <img src="images/logo/logo.png" alt="">

          </div>
          <div class="form-search d-flex">
            <input v-model="keywordSearch" type="text" class="form-control input-keyword"
                   placeholder="Tìm kiếm sản phẩm ...">
            <button class="btn btn-danger btn-submit" @click.prevent="handleSearchProduct">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>

          <router-link tag="div" :to="{name:'checkout.cart'}" class="cart position-relative">
            <b-icon icon="cart" font-scale="2" aria-hidden="true"></b-icon>
            <div class="badge-cart">
              <span class="count">{{ totalItemCart }}</span></div>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
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
    return {}
  },

  computed: {},
  name: "HeaderForPC"
}
</script>

<style>

</style>