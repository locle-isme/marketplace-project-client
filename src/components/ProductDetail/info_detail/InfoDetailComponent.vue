<template>
  <div class="col-xl-9 col-lg-12" v-if="infoDetails.length">
    <div class="card position-relative">
      <div class="card-title text-uppercase">Thông tin chi tiết</div>
      <div class="card-body">
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
        <div class="table-responsive">
          <table class="product-detail table">
            <tbody>
            <template v-for="(infoDetail, index) in infoDetails">
              <tr :key="'ifdt' + index">
                <td>{{ infoDetail.key }}</td>
                <td>{{ infoDetail.value }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    infoDetails: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(["isLoading"]),
  }
}
</script>

<style>

</style>