<template>
  <div class="row">
    <div class="col">
      <div class="store-info card">
        <div class="card-body" style="padding: 0 !important;">
          <div class="d-flex flex-column">
            <div class="seller d-flex align-items-center">
              <div class="avatar">
                <img width="100%" height="100%"
                     src="https://salt.tikicdn.com/cache/w220/ts/seller/47/52/8c/d4da8b863a18d808434f7ffec300b817.png"
                     alt="">
              </div>
              <div class="d-flex flex-column">
                <h6 class="name">Unknown</h6>
                <span class="follower">326 người theo dõi</span>
              </div>
            </div>
            <ul class="tab nav">
              <li @click="goRoute('store.global')" :class="{active: getRouteName == 'store.global'}">Cửa Hàng</li>
              <li @click="goRoute('store.category')" :class="{active: getRouteName == 'store.category'}">Tất Cả Sản
                Phẩm
              </li>
              <li @click="goRoute('store.info')" :class="{active: getRouteName == 'store.info'}">Hồ Sơ Cửa Hàng</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  props: {
    slug_store: String
  },

  methods: {
    goRoute(nameRoute) {
      this.$router.push({
        name: nameRoute, params: {slug_store: this.slug_store}
      });
    }
  },

  computed: {
    getRouteName() {
      return this.$route.name;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.store-info {
  background: url("https://salt.tikicdn.com/ts/sellercenterFE/af/03/9b/57f855e860180c28a25949bce95c1266.png");
  height: auto;
  color: #fff;
  border-radius: unset !important;
}

.store-info .seller {
  margin: 1rem 1rem 0 1rem;
}

.store-info .seller > .avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 1.5rem;
  overflow: hidden;
}

.store-info .seller .name {
  font-weight: 600;
}

.store-info .seller .follower {
  font-size: 0.9rem;
  color: #b3abab;
}

ul.tab.nav {
  margin: 10px calc(1.5rem + 64px);
}

ul.tab.nav > li {
  font-size: 0.85rem;
  cursor: pointer;
  padding: 5px 20px;
}

ul.tab.nav > li.active {
  position: relative;
  font-weight: 600;
}

ul.tab.nav > li.active:after {
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
</style>


