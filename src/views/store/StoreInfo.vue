<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12 col-md-5 border-right">
              <div class="row" style="height: 100%">
                <div class="col d-flex justify-content-center align-items-center">
                  <div class="d-flex flex-column">
                    <h5>Tỉ lệ hủy</h5>
                    <h4 class="text-center" style="color: #1c7430">{{ cancellation_info.rate }} %</h4>
                  </div>
                </div>
                <!--                <div class="col d-flex justify-content-center align-items-center">-->
                <!--                  <div class="d-flex flex-column">-->
                <!--                    <h5>Tỉ lệ đổi trả</h5>-->
                <!--                    <h4 class="text-center" style="color: #1c7430">0 %</h4>-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
            </div>
            <div class="col-sm-12 col-md-7 border-top">
              <div class="box-info">
                <div class="d-flex">
                  <div class="info-label">
                    <span><i class="far fa-calendar-minus"></i>&nbsp;&nbsp;Thành viên từ năm</span>
                  </div>
                  <div class="info-value">
                    <span>{{ currentSupplier.created_at | year }}</span>
                  </div>
                </div>
              </div>

              <div class="box-info">
                <div class="d-flex">
                  <div class="info-label">
                    <span><i class="fas fa-cube"></i>&nbsp;&nbsp;Sản phẩm</span>
                  </div>
                  <div class="info-value">
                    <span>{{ currentSupplier.total_products }}+</span>
                  </div>
                </div>
              </div>


              <div class="box-info">
                <div class="d-flex">
                  <div class="info-label">
                    <span><i class="fas fa-store"></i>&nbsp;Mô tả cửa hàng</span>
                  </div>
                  <div class="info-value">
                    <span>{{ currentSupplier.description == '' ? '(Trống)' : currentSupplier.description }}</span>
                  </div>
                </div>
              </div>

              <!--              <div class="box-info">
                              <div class="d-flex">
                                <div class="info-label">
                                  <span><i class="fas fa-user-plus"></i>&nbsp;Người theo dõi</span>
                                </div>
                                <div class="info-value">
                                  <span>2018</span>
                                </div>
                              </div>
                            </div>-->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {}
  },

  methods: {},

  computed: {
    ...mapGetters(["currentSupplier"]),
    cancellation_info() {
      const {cancellation_info} = this.currentSupplier;
      return cancellation_info || {};
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.box-info {
  padding: 10px 20px;

  .info-label {
    width: 12rem;
  }
}


</style>