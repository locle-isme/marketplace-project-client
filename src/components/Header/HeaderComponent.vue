<template>
  <div>
    <HeaderForPC :totalItemCart="totalItemCart"></HeaderForPC>
    <HeaderForMobile :totalItemCart="totalItemCart"></HeaderForMobile>
  </div>
</template>

<script>

import HeaderForMobile from "./HeaderForMobile";
import HeaderForPC from "./HeaderForPC";
import {HandleRedirect} from "../../mixins/redirect.handle";
import {mapGetters} from "vuex";
import EventBus from "../../common/EventBus";
import {FETCH_HOME_CATEGORIES} from "../../store/actions.type";

export default {
  mixins: [HandleRedirect],
  data() {
    return {}
  },

  created() {
    this.loadingCategories();
    EventBus.$on('search.product', this.searchProduct);
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

    loadingCategories() {
      return this.$store.dispatch(FETCH_HOME_CATEGORIES);
    },

    searchProduct(_keyword) {
      this.redirect('search', {}, {
        q: _keyword
      });
    },

  },

  computed: {
    ...mapGetters(["cart"]),
    totalItemCart() {
      const {total_count} = this.cart;
      return total_count || 0;
    }
  },
  components: {
    HeaderForMobile,
    HeaderForPC
  },
}
</script>

<style lang="scss">
$peach-color: #b11e0f;
$border-peach-color: #92190e;
$peach-color2: rgba(177, 30, 15, 0.67);
$border-peach-color2: rgba(146, 25, 14, 0.76);
.logo {
  cursor: pointer;
  min-width: 36px;
  min-height: 24px;
  user-select: none;
  background: url("http://localhost:8080/images/logo/logo.png");
  background-size: cover;
}

.cart {
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
    //background: rgba(128, 128, 128, 0.3);
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


.on-mobile {
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
}

.badge-cart {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #f5872d;
  color: #ffffff;
  position: absolute;
  top: -10px;
  right: -13px;

  .count {
    font-weight: 600;
    font-size: 0.8rem
  }
}

.on-pc {
  .taka-logo {
    padding-left: 2rem;
    cursor: pointer;
    display: block;
    width: 110px;
    height: 45px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .form-search {
    width: 68%;
    background-color: #fff;
    padding: 2px;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    .input-keyword {
      outline: none;
      border: none;
      border-radius: 0;

      &:focus {
        border-color: unset;
        box-shadow: unset;
      }
    }

    .btn-submit {
      width: 5rem;
    }
  }

  .navbar-nav {
    .nav-item {
      .nav-link {
        cursor: pointer;

        .avatar {
          width: 1.375rem;
          height: 1.375rem;

          .placeholder {
            width: 100%;
            position: relative;
            padding-top: 100%;
            background-color: #f5f5f5;
            border-radius: 50%;
            overflow: hidden;

            .taka-svg-icon {
              display: inline-block;
              width: 1em;
              height: 1em;
              fill: currentColor;
              position: relative;

              &.icon-headshot {
                font-size: .9375rem;
                line-height: .9375rem;
              }
            }

            .icon-headshot {
              stroke: #c6c6c6;
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              font-size: 1.5rem;
              font-weight: 400;
              line-height: 2rem;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          }
        }
      }

      &.social {
        .nav-link {
          a{
            color: #fff;
            margin-right: 2px;
          }
        }
      }
    }

  }
}

</style>