<template>
  <div class="col-xl-9 col-md-12">
    <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
    <div class="card">
      <div class="card-title">Thông tin tài khoản</div>
      <div class="card-body">
        <div class="form col-lg-9">
          <div class="form-group row">
            <label for="inputName" class="col-sm-3 col-form-label">Họ tên</label>
            <div class="col-sm-9">
              <input v-model="user.name" type="text"
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
              <input v-model="user.email" type="email"
                     :class="classEmail"
                     id="inputEmail2"
                     placeholder="Nhập Email" disabled>
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email | error }}
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label for="inputBirthday" class="col-sm-3 col-form-label">Ngày sinh</label>
            <div class="col-sm-9">
              <input v-model="user.birthday" type="date"
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
              <input v-model="user.sex" :class="classSex" type="radio" name="gridRadios"
                     id="gridRadios1" value="male">
              <label class="form-check-label" for="gridRadios1">
                Nam
              </label>
            </div>
            <div class="col-sm-3 ml-4">
              <input v-model="user.sex" :class="classSex" type="radio" name="gridRadios"
                     id="gridRadios2" value="female">
              <label class="form-check-label" for="gridRadios2">
                Nữ
              </label>
            </div>
          </div>
          <!--          <div class="form-group row">
                      <label for="inputName" class="col-sm-3 col-form-label">Ngày sinh</label>
                      <div class="col-sm-3">
                        <select class="custom-select my-1 mr-sm-2" id="selectDay">
                          <option value="0" selected="">Ngày</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                      <div class="col-sm-3">
                        <select class="custom-select my-1 mr-sm-2" id="selectMonth">
                          <option value="0" selected="">Tháng</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                      <div class="col-sm-3">
                        <select class="custom-select my-1 mr-sm-2" id="selectYear">
                          <option value="0" selected="">Năm</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                    -->
          <div class="form-group row">
            <div class="offset-3"></div>
            <div class="col-sm-8 ml-4">
              <label class="form-check-label" style="user-select: none">
                <input v-model="isChangePassword" type="checkbox" class="form-check-input" name="isChangePW"
                       value="1">
                Thay đổi mật khẩu
              </label>
            </div>

          </div>
          <div v-if="isChangePassword">
            <div class="form-group row">
              <label for="inputOldPassword" class="col-sm-3 col-form-label">Mật khẩu cũ</label>
              <div class="col-sm-9">
                <input v-model="user.old_password" type="password"
                       :class="classOldPassword" id="inputOldPassword" placeholder="Mật khẩu từ 6 đến 36 ký tự">
                <div v-if="errors.old_password" class="invalid-feedback">
                  {{ errors.old_password | error }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputNewPassword" class="col-sm-3 col-form-label">Mật khẩu mới</label>
              <div class="col-sm-9">
                <input v-model="user.new_password" type="password"
                       :class="classNewPassword" id="inputNewPassword" placeholder="Mật khẩu từ 6 đến 36 ký tự">
                <div v-if="errors.new_password" class="invalid-feedback">
                  {{ errors.new_password | error }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Điền lại mật khẩu</label>
              <div class="col-sm-9">
                <input v-model="user.new_password_confirmation" for="inputRepassword1" type="password"
                       :class="classNewPasswordConfirmation" id="inputRepassword1"
                       placeholder="Mật khẩu từ 6 đến 36 ký tự">
                <div v-if="errors.new_password_confirmation" class="invalid-feedback">
                  {{ errors.new_password_confirmation | error }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-lg-3 col-lg-4">
              <button class="btn btn-warning btn-block" @click="updateUser()">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {mapGetters} from 'vuex';
import {UPDATE_USER} from "../../store/actions.type";

export default {
  name: "CustomerEdit",
  data() {
    return {
      isChangePassword: false,
      /*formData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        sex: "",
        birthday: ""
      }*/
    }
  },

  methods: {
    initFormData(_user) {
      this.user = _user;
    },

    updateUser() {
      this.$store.dispatch(UPDATE_USER, this.user)
          .then(() => {

            this.$swal({
              title: "Thành công!",
              text: "Cập nhật thông tin thành công!",
              icon: "success",
              button: "Thoát!",
            });

            this.resetFormData();
          });
    },

    resetFormData() {
      this.user.old_password = "";
      this.user.new_password_confirmation = "";
      this.user.new_password = "";
    }
  },

  computed: {
    ...mapGetters(["user", "errors", "isLoading"]),
    className() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.name,
        'is-valid': !this.errors.name && this.user.name != ""
      }
    },

    classEmail() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.email,
        'is-valid': !this.errors.email && this.user.email != ""
      }
    },

    classOldPassword() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.old_password,
        'is-valid': !this.errors.old_password && !!this.user.old_password
      }
    },

    classNewPassword() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.new_password,
        'is-valid': !this.errors.new_password && !!this.user.new_password
      }
    },

    classNewPasswordConfirmation() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.new_password_confirmation,
        'is-valid': !this.errors.new_password_confirmation && !!this.user.new_password_confirmation
      }
    },

    classBirthday() {
      return {
        'form-control': true,
        'is-invalid': !!this.errors.birthday,
        'is-valid': !this.errors.birthday && this.user.birthday != ""
      }
    },

    classSex() {
      return {
        'form-check-input': true,
        'is-invalid': !!this.errors.sex,
        //'is-valid': !this.errors.sex && this.user.sex != ""
      }
    },
  },

  watch: {
    // user: {
    //   handler(e) {
    //     this.initFormData(e);
    //   }
    // }
    isChangePassword(v) {
      this.user.is_change_password = v;
    }
  }
}
</script>

<style lang="scss">

</style>