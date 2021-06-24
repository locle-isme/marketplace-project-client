<template>
  <div class="row justify-content-center">
    <div class="col-lg-5">
      <div class="card position-relative">
        <div class="card-body">
          <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
          <div class="d-flex align-items-center mb-3">
            <div><i class="far fa-3x fa-user-circle"></i></div>
            <div class="ml-3 d-flex flex-column">
              <h4 class="">Đăng nhập</h4>
              <div class="d-flex">Bạn chưa có tài khoản? &nbsp;
                <div class="ml-1 text-primary" style="cursor:pointer;" @click="goRegister">Đăng ký</div>
              </div>
            </div>
          </div>
          <div class="form">
            <div class="form-group row">
              <label for="inputEmail" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input v-model="formDataLogin.email" type="email" class="form-control" id="inputEmail"
                       placeholder="Nhập Email">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-3 col-form-label">Mật khẩu</label>
              <div class="col-sm-9">
                <input v-model="formDataLogin.password" type="password" class="form-control" id="inputPassword"
                       placeholder="Mật khẩu từ 6 đến 36 ký tự">
              </div>
            </div>

<!--
            <div class="col-xl-9 offset-xl-3 col-md-12 pl-2">
              <p class="">Quên mật khẩu? Nhấn vào <a href="">đây</a></p>
            </div>
            -->
            <div class="row">
              <div class="col">
                <button class="btn btn-primary col-xl-9 offset-xl-3 col-md-12" @click="login">Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {LoginMixin} from "../../mixins/login.mixin";
import {HandleRedirect} from "../../mixins/redirect.handle";

export default {
  mixins: [LoginMixin, HandleRedirect],
  data() {
    return {}
  },

  methods: {
    goRegister() {
      this.redirect('register');
    }
  },
  name: "LoginPage"
}
</script>

<style lang="scss">

</style>