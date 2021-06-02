<template>
  <div class="row">
    <div class="col">
      <div class="store-info card">
        <div class="card-body" style="padding: 0 !important;">
          <div class="d-flex flex-column">
            <div class="seller d-flex align-items-center">
              <div class="avatar">
                <img width="100%" height="100%"
                     :src="currentSupplier.avatar"
                     alt="">
              </div>
              <div class="d-flex flex-column">
                <h6 class="name">{{ currentSupplier.nameOfShop }}</h6>
                <!--                <span class="follower">326 người theo dõi</span>-->
              </div>
            </div>
            <ul class="tab nav">
              <template v-for="(link,index) in dataLinks">
                <li :key="'navshop' + index" @click="redirect(link.name)" :class="classTabNav(link.name)">
                  {{ link.description }}
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {HandleRedirect} from "../mixins/redirect.handle";
import {mapGetters} from "vuex";

export default {
  mixins: [HandleRedirect],
  data() {
    return {
      dataLinks: [
        {
          name: 'store.global',
          description: 'Cửa hàng',
        },
        {
          name: 'store.category',
          description: 'Tất Cả Sản Phẩm',
        },
        {
          name: 'store.info',
          description: 'Hồ sơ cửa hàng',
        }
      ]
    }
  },

  created() {

  },
  methods: {
    classTabNav(_name) {
      return {
        active: this.getRouteName == _name
      }
    }
  },

  computed: {
    ...mapGetters(["currentSupplier"]),
    getRouteName() {
      return this.$route.name;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.store-info {
  background: url("http://localhost:8080/images/background/red_hpny_2021.jpg");
  height: auto;
  color: #fff;
  border-radius: unset !important;

  .seller {
    margin: 1rem 1rem 0 1rem;

    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 1.5rem;
      overflow: hidden;
    }

    .name {
      font-weight: 600;
    }

    .follower {
      font-size: 0.9rem;
      color: #b3abab;
    }
  }

  .nav {
    margin: 10px calc(1.5rem + 64px);

    li {
      font-size: 0.85rem;
      cursor: pointer;
      padding: 5px 20px;

      &.active {
        position: relative;
        font-weight: 600;

        &:after {
          content: "";
          position: absolute;
          width: 30px;
          height: 3px;
          margin: 0 auto;
          border-radius: 5px;
          background: #fff;
          bottom: 1px;
          right: 0;
          left: 0;
        }
      }

    }
  }
}
</style>


