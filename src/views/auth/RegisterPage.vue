<template>
  <div class="row justify-content-center">
    <div class="col-lg-5">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <div><i class="far fa-3x fa-user-circle"></i></div>
            <div class="ml-3 d-flex flex-column">
              <h4 class="">Đăng ký</h4>
              <div class="d-flex">Bạn đã tài khoản? &nbsp;
                <div class="ml-1 text-primary" style="cursor:pointer;" @click="goLogin">Đăng nhập</div>
              </div>
            </div>
          </div>
          <div class="form">
            <div class="form-group row">
              <label for="inputName" class="col-sm-3 col-form-label">Họ tên</label>
              <div class="col-sm-9">
                <input v-model="formDataRegister.name" type="text"
                       :class="className"
                       id="inputName" placeholder="Nhập họ tên">
                <div v-if="errors.name" class="invalid-feedback">
                  {{ errors.name | error }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail2" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input v-model="formDataRegister.email" type="email"
                       :class="classEmail"
                       id="inputEmail2"
                       placeholder="Nhập Email">
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email | error }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword1" class="col-sm-3 col-form-label">Mật khẩu</label>
              <div class="col-sm-9">
                <input v-model="formDataRegister.password" type="password"
                       :class="classPassword" id="inputPassword1" placeholder="Mật khẩu từ 6 đến 36 ký tự">
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password | error }}
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Điền lại mật khẩu</label>
              <div class="col-sm-9">
                <input v-model="formDataRegister.password_confirmation" for="inputRepassword1" type="password"
                       :class="classPasswordConfirmation" id="inputRepassword1"
                       placeholder="Mật khẩu từ 6 đến 36 ký tự">
                <div v-if="errors.password_confirmation" class="invalid-feedback">
                  {{ errors.password_confirmation | error }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputBirthday" class="col-sm-3 col-form-label">Ngày sinh</label>
              <div class="col-sm-9">
                <input v-model="formDataRegister.birthday" type="date"
                       :class="classBirthday" id="inputBirthday"
                       placeholder="Mật khẩu từ 3 đến 36 ký tự">
                <div v-if="errors.birthday" class="invalid-feedback">
                  {{ errors.birthday | error }}
                </div>
              </div>

            </div>

            <div class="form-group row align-items-center">
              <label for="inputEmail2" class="col-sm-3 col-form-label">Giới tính</label>
              <div class="col-sm-3 ml-4">
                <input v-model="formDataRegister.sex" :class="classSex" type="radio" name="gridRadios"
                       id="gridRadios1" value="male">
                <label class="form-check-label" for="gridRadios1">
                  Nam
                </label>
              </div>
              <div class="col-sm-3 ml-4">
                <input v-model="formDataRegister.sex" :class="classSex" type="radio" name="gridRadios"
                       id="gridRadios2" value="female">
                <label class="form-check-label" for="gridRadios2">
                  Nữ
                </label>
              </div>
            </div>
            <!--                  <div class="form-group row">
                                <label for="inputName" class="col-sm-3 col-form-label">Ngày sinh</label>
                                <div class="col-sm-3">
                                  <select v-model="formDataRegister.day" class="custom-select my-1 mr-sm-2" id="selectDay">
                                    <option value="0">Ngày</option>
                                    <template v-for="(day, index) in daysInMonth">
                                      <option :key="index" :value="day">{{ day }}</option>
                                    </template>
                                  </select>
                                </div>
                                <div class="col-sm-3">
                                  <select v-model="formDataRegister.month" class="custom-select my-1 mr-sm-2" id="selectMonth">
                                    <option value="0">Tháng</option>
                                    <template v-for="(month, index) in monthsInYear">
                                      <option :key="index" :value="month">{{ month }}</option>
                                    </template>
                                  </select>
                                </div>
                                <div class="col-sm-3">
                                  <select v-model="formDataRegister.year" class="custom-select my-1 mr-sm-2" id="selectYear">
                                    <option value="0">Năm</option>
                                    <template v-for="(year, index) in offsetYear">
                                      <option :key="index" :value="new Date().getFullYear() - index">
                                        {{ new Date().getFullYear() - index }}
                                      </option>
                                    </template>
                                  </select>
                                </div>
                              </div>-->
            <div class="form-group row">
              <div class="col-xl-9 offset-xl-3 col-md-12">
                <button class="btn btn-warning btn-block" @click="register()">Tạo tài khoản</button>
                <p class="my-3" style="font-size: 13px">
                  <span>Khi bạn nhấn Đăng ký, bạn đã đồng ý thực hiện mọi giao dịch mua bán theo.</span>
                  <a class="text-decoration-none" href="">điều kiện sử dụng và chính sách của tụi tui</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {RegisterMixin} from "../../mixins/register.mixin";
import {HandleRedirect} from "../../mixins/redirect.handle";

export default {
  mixins: [RegisterMixin, HandleRedirect],
  data() {
    return {
      formDataRegister: {
        name: "Ảo thật đấy",
        email: "choeger@example.net",
        password: "Demopass69",
        password_confirmation: "Demopass69",
        sex: "male",
        birthday: "1990-05-05"
        // day: 0,
        // month: 0,
        // year: 0
      }
    }
  },

  methods: {
    goLogin() {
      this.redirect('login');
    }
  },

  name: "RegisterPage"
}
</script>

<style>

</style>