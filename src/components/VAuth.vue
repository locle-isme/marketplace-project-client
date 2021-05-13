<template>
  <div class="modal modal-auth d-block">
    <div class="modal-dialog auth">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">

          <h4 v-if="nameTab == 'login'" class="modal-title">Đăng nhập</h4>
          <h4 v-else class="modal-title">Tạo tài khoản</h4>
          <button type="button" class="close" data-dismiss="modal" @click="$emit('close')">×</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="row">
            <div class="d-none d-lg-block col-xl-4 col-md-8">
              <div v-if="nameTab == 'login'">
                <p style="text-align: justify">Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu
                  thích, nhận nhiều ưu đãi hấp
                  dẫn.</p>
              </div>
              <div v-else>
                <p style="text-align: justify">Tạo tài khoản để theo dõi đơn hàng, lưu danh sách sản phẩm
                  yêu thích, nhận nhiều ưu đãi hấp
                  dẫn.</p>
              </div>
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/graphic-map.png" alt="">
            </div>

            <div class="col-xl-8 col-md-12 pr-0" style="background: #eeeeee">
              <div class="content">
                <ul class="nav nav-tabs" id="myTab" role="tabList">
                  <li class="nav-item">
                    <a class="nav-link" :class="{active: nameTab == 'login'}" @click="nameTab = 'login'">Đăng nhập</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="{active: nameTab == 'register'}" @click="nameTab = 'register'">Tạo tài
                      khoản</a>
                  </li>
                </ul>
                <div class="form" v-if="nameTab == 'login'">
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
                  <div class="col-xl-9 offset-xl-3 col-md-12 pl-2">
                    <p class="">Quên mật khẩu? Nhấn vào <a href="">đây</a></p>
                  </div>
                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary col-xl-9 offset-xl-3 col-md-12" @click="login">Đăng nhập</button>
                    </div>
                  </div>
                </div>
                <div class="form" v-else>
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


      </div>
    </div>
  </div>
</template>

<script>
import {LOGIN, REGISTER} from "../store/actions.type";
import {mapGetters} from 'vuex'

export default {
  name: "VAuth",
  data() {
    return {
      nameTab: "login",
      formDataLogin: {
        email: "choeger@example.net",
        password: "Demopass69"
      },


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
    login() {
      this.$store.dispatch(LOGIN, this.formDataLogin)
          .then(() => {
            this.$swal({
              title: "Thành công!",
              text: "Đăng nhập thành công!",
              icon: "success",
              button: "Thoát!",
            });
            this.$emit('close')
          })
          .catch(() => {
            this.$swal({
              title: "Thất Bại!",
              text: "Sai email hoặc mật khẩu!",
              icon: "error",
              button: "Thoát!",
            });
          })
    },

    /*register() {
      const {day, month, year} = this.formDataRegister;
      this.formDataRegister.date = `${year}-${month}-${day}`;
      let formData = JSON.parse(JSON.stringify(this.formDataRegister));
      delete formData.day;
      delete formData.month;
      delete formData.year;
      console.log(formData)
    }*/

    register() {
      this.$store.dispatch(REGISTER, this.formDataRegister)
          .then(() => {
            this.nameTab = "login";
            this.$swal({
              title: "Tạo tài khoản thành công!",
              text: "Vui lòng đăng nhập để tiếp tục sử dụng",
              icon: "success",
              button: "Thoát!",
            });
          })
    }
  },

  computed: {
    className() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.name,
        'is-valid': !this.errors.name && this.formDataRegister.name != ""
      }
    },

    classEmail() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.email,
        'is-valid': !this.errors.email && this.formDataRegister.email != ""
      }
    },

    classPassword() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.password,
        'is-valid': !this.errors.password && this.formDataRegister.password != ""
      }
    },

    classPasswordConfirmation() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.password_confirmation,
        'is-valid': !this.errors.password_confirmation && this.formDataRegister.password_confirmation != ""
      }
    },

    classBirthday() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.birthday,
        'is-valid': !this.errors.birthday && this.formDataRegister.birthday != ""
      }
    },

    classSex() {
      return {
        'form-check-input': true,
        'is-invalid': !!this.errors.sex,
        //'is-valid': !this.errors.sex && this.formDataRegister.sex != ""
      }
    },
    ...mapGetters(["errors"])
    /*daysInMonth() {
      const {month, year} = this.formDataRegister;
      let monthsHas30days = [4, 6, 9, 11];
      if (month == 2 && (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))) return 29;
      else if (month == 2) return 28;
      else if (monthsHas30days.includes(month)) return 30;
      return 31;
    },

    monthsInYear() {
      return 12;
    },

    offsetYear() {
      return 120;
    }*/
  },

  watch: {
    /*formDataRegister: {
      handler(v) {
        const {day} = v;
        if (day > this.daysInMonth) this.formDataRegister.day = 0;
      },
      deep: true
    }*/
  }

}
</script>

<style lang="scss">


.modal-auth {
  z-index: 1060;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;

  .modal-dialog {
    @media (min-width: 576px) {
      &.auth {
        max-width: 900px;
        margin: 3rem auto;
      }
    }

    @media (min-width: 576px) {
      &.auth {
        max-width: 900px;
        margin: 3rem auto;
      }
    }

    &.auth {
      .content {
        height: 100%;
        background: #fff;
        padding: 0px 15px;

        .form {
          margin-top: 20px;
        }
      }
    }

    .nav-item {
      .nav-link {
        cursor: pointer;
      }
    }

  }
}


</style>