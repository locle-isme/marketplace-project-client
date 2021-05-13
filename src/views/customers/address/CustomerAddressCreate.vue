<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Tạo sổ địa chỉ</div>
      <div class="card-body">
        <div class="form col-lg-9">
          <div class="form-group row">
            <label for="inputName" class="col-sm-3 col-form-label">Họ tên</label>
            <div class="col-sm-9">
              <input v-model="formData.name" type="text" :class="className" id="inputName" placeholder="Nhập họ tên">
              <div v-if="addressErrors.name" class="invalid-feedback">
                {{ addressErrors.name | error }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPhoneNumber" class="col-sm-3 col-form-label">Số điện thoại</label>
            <div class="col-sm-9">
              <input v-model="formData.phone" type="text" :class="classPhone" id="inputPhoneNumber"
                     placeholder="Nhập Số điện thoại">
              <div v-if="addressErrors.phone" class="invalid-feedback">
                {{ addressErrors.phone | error }}
              </div>
            </div>
          </div>

          <!--          <div class="form-group row">
                      <label for="selectProvince" class="col-sm-3 col-form-label">Tỉnh/TP</label>
                      <div class="col-sm-9">
                        <select class="custom-select my-1 mr-sm-2" id="selectProvince">
                          <option value="0" selected="">Chọn Tỉnh/TP</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="selectDistrict" class="col-sm-3 col-form-label">Quận/huyện</label>
                      <div class="col-sm-9">
                        <select class="custom-select my-1 mr-sm-2" id="selectDistrict">
                          <option value="0" selected="">Chọn Quận/huyện</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="selectWard" class="col-sm-3 col-form-label">Phường xã:</label>
                      <div class="col-sm-9">
                        <select class="custom-select my-1 mr-sm-2" id="selectWard">
                          <option value="0" selected="">Chọn Phường xã</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>-->

          <div class="form-group row">
            <label for="inputAddress" class="col-sm-3 col-form-label">Địa chỉ</label>
            <div class="col-sm-9">
              <textarea v-model="formData.address" type="text" rows="3" :class="classAddress" id="inputAddress">
              </textarea>
              <div v-if="addressErrors.address" class="invalid-feedback">
                {{ addressErrors.address | error }}
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="offset-3"></div>
            <div class="col-sm-8 ml-4">
              <label class="form-check-label" style="user-select: none">
                <input v-model="formData.active" type="checkbox" class="form-check-input" name="active" value="1">Đặt
                làm địa chỉ mặc định
              </label>
            </div>
          </div>

          <div class="form-group row">
            <div class="offset-lg-3 col-lg-4">
              <button class="btn btn-warning btn-block" @click="createAddress()">Tạo địa chỉ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {ADDRESS_CREATE} from "../../../store/actions.type";

export default {
  name: "CustomerAddressCreate",
  data() {
    return {
      formData: {
        name: "",
        address: "",
        phone: ""
      }
    }
  },
  methods: {
    createAddress() {
      this.$store.dispatch(ADDRESS_CREATE, this.formData)
          .then(() => {
            return this.$swal({
              title: "Thành công!",
              text: "Tạo địa chỉ mới thành công!",
              icon: "success",
              button: "Thoát!",
            })
          })
          .then(() => {
            this.$router.push({name: 'customer.address'})
          });
    }
  },
  computed: {
    ...mapGetters(["addressErrors"]),
    className() {
      return {
        'form-control': true,
        'is-invalid': !!this.addressErrors.name,
        'is-valid': !this.addressErrors.name && !!this.formData.name
      }
    },

    classPhone() {
      return {
        'form-control': true,
        'is-invalid': !!this.addressErrors.phone,
        'is-valid': !this.addressErrors.phone && !!this.formData.phone
      }
    },

    classAddress() {
      return {
        'form-control': true,
        'is-invalid': !!this.addressErrors.address,
        'is-valid': !this.addressErrors.address && !!this.formData.address
      }
    },
  }
}
</script>

<style lang="scss">

</style>