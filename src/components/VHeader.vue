<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary text-light fixed-top">
      <div class="container-fluid position-relative">
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
            <div @click="redirect('home')" class="logo">

            </div>
            <router-link tag="div" :to="{name:'checkout.cart'}" class="cart position-relative">
              <b-icon icon="cart" font-scale="2" aria-hidden="true"></b-icon>
              <div
                  style="width: 20px; height: 20px; display: flex;justify-content: center;align-items: center; border-radius: 50%;background: #f5872d; color: #ffffff; position: absolute; top: -10px; right: -13px">
                <span class="count" style="font-weight: 600; font-size: 0.8rem">0</span></div>
            </router-link>
          </div>
          <form action="" class="form-search d-flex my-2 justify-content-around w-100"
                :class="{'scroll-nav': statusScrollNavBar}">
            <div class="input-group mr-2">
              <input v-model="keywordSearch" type="text" class="form-control" id="inlineFormInputSearchNav"
                     placeholder="Tìm kiếm sản phẩm ...">
            </div>
            <button type="submit" class="btn btn-info" style="width: 10rem;" @click.prevent="searchProduct">
              <i class="fa fa-search" aria-hidden="true"></i> Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </nav>
    <div class="nav-left-bar d-flex position-fixed" :class="{show: statusShowNavBar}">
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
            <li @click="setStatusShowCategoryList()"><i class="sub-title fa fa-list"></i> Danh mục sản phẩm</li>
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
    <VAuth v-if="statusShowVAuth" @close="statusShowVAuth = false"></VAuth>
  </div>


</template>
<script>
import VAuth from "./VAuth"
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      statusShowNavBar: false,
      statusScrollNavBar: false,
      statusShowCategoryList: false,
      statusShowMenu: false,
      statusShowVAuth: false,
      keywordSearch: ""
    }
  },

  components: {
    VAuth
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
    searchProduct() {
      let filters = {
        q: this.keywordSearch
      };
      this.keywordSearch = "";
      this.$router.push({name: 'search', query: filters})
          .then(() => {
          })
          .catch(() => {
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
    ...mapGetters(["isAuthenticated", "user"])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.logo {
  cursor: pointer;
  min-width: 36px;
  min-height: 24px;
  user-select: none;
  background: url("https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png");
  background-size: cover;
}

.cart {
  z-index: 1111;
  cursor: pointer;
}

.nav-left-bar {
  visibility: hidden;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1050;

  &.show {
    visibility: visible;
  }

  .inner {
    position: relative;
    width: 266px;
    height: 100%;
    background: #ffff;

    &.menu {
      z-index: 2;
    }

    &.category-list {
      z-index: 3;
      position: absolute;
      top: 0;
      left: 0;
    }

    .sub-head {
      border-top: rgb(242, 242, 242) 1px solid;
      color: rgb(120, 120, 120);
      padding: 12px 16px 0;
    }


    .nav {
      margin: 5px 0px;

      li {
        margin: 12px 16px;
        font-size: 1rem;
        cursor: pointer;

        .sub-title {
          font-size: 1.5rem;
          margin-right: 15px;
          width: 25px;
        }
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(128, 128, 128, 0.3);
  }

  .email {
    cursor: pointer;
    font-size: 0.9em;
  }

  .name {
    @extend .email;
    font-weight: 600;
    font-size: 1em;
  }


}


.form-search {
  &.scroll-nav {
    position: fixed;
    top: 5px;
    left: 65px;
    right: 45px;

    .btn {
      visibility: hidden;
    }
  }

  .btn {
    visibility: visible;
  }

}


</style>
