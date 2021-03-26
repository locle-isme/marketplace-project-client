<template>
  <div class="modal d-block">
    <div class="modal-dialog auth">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <!--          <h4 class="modal-title">Modal Heading</h4>-->
          <button type="button" class="close" data-dismiss="modal" @click="$emit('exit')">×</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="row">
            <div class="col-xl-4 col-md-8">
              <div v-if="nameTab == 'login'">
                <h3>Đăng nhập</h3>
                <p style="text-align: justify">Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu
                  thích, nhận nhiều ưu đãi hấp
                  dẫn.</p>
              </div>
              <div v-else>
                <h3>Tạo tài khoản</h3>
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
                    <label for="inputEmail" class="col-sm-3 col-form-label">Email/ SĐT</label>
                    <div class="col-sm-9">
                      <input type="email" class="form-control" id="inputEmail"
                             placeholder="Nhập Email hoặc Số điện thoại">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Mật khẩu</label>
                    <div class="col-sm-9">
                      <input type="email" class="form-control" id="inputPassword"
                             placeholder="Mật khẩu từ 3 đến 36 ký tự">
                    </div>
                  </div>
                  <div class="col-xl-9 offset-xl-3 col-md-12 pl-2">
                    <p class="">Quên mật khẩu? Nhấn vào <a href="">đây</a></p>
                  </div>
                  <div class="row">
                    <div class="col">
                      <button class="btn btn-primary col-xl-9 offset-xl-3 col-md-12">Đăng nhập</button>
                    </div>
                  </div>
                </div>
                <div class="form" v-else>
                  <div class="form-group row">
                    <label for="inputName" class="col-sm-3 col-form-label">Họ tên</label>
                    <div class="col-sm-9">
                      <input type="email" class="form-control" id="inputName" placeholder="Nhập họ tên">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputEmail2" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <input type="email" class="form-control" id="inputEmail2"
                             placeholder="Nhập Email hoặc Số điện thoại">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword1" class="col-sm-3 col-form-label">Mật khẩu</label>
                    <div class="col-sm-9">
                      <input type="email" class="form-control" id="inputPassword1"
                             placeholder="Mật khẩu từ 3 đến 36 ký tự">
                    </div>
                  </div>

                  <div class="form-group row align-items-center">
                    <label for="inputEmail2" class="col-sm-3 col-form-label">Giới tính</label>
                    <div class="col-sm-3 ml-4">
                      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="male">
                      <label class="form-check-label" for="gridRadios1">
                        Nam
                      </label>
                    </div>
                    <div class="col-sm-3 ml-4">
                      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="female">
                      <label class="form-check-label" for="gridRadios2">
                        Nữ
                      </label>
                    </div>
                  </div>
                  <div class="form-group row">
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
                  <div class="form-group row">
                    <div class="col-xl-9 offset-xl-3 col-md-12">
                      <button class="btn btn-warning btn-block" @click="login()">Tạo tài khoản</button>
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
export default {
  name: "VAuth",
  data() {
    return {
      nameTab: "login"
    }
  },

  methods: {
    login() {

    }
  }

}
</script>

<style scoped>
@media (min-width: 576px) {
  .modal-dialog.auth {
    max-width: 900px;
    margin: 3rem auto;
  }
}

.modal {
  z-index: 1060;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
}


.modal-dialog.auth .content {
  height: 100%;
  background: #fff;
  padding: 0px 15px;
}

.content .form {
  margin-top: 20px;
}

.nav-item .nav-link {
  cursor: pointer;
}
</style>