<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Sổ địa chỉ</div>
      <div class="card-body">
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
        <div v-if="totalCount > 0" class="float-right btn btn-sm btn-primary" @click="goCreateAddress">Thêm địa chỉ
          mới
        </div>
        <div class="table-responsive">
          <table class="table mt-3">
            <tbody>
            <template v-for="address in listAddresses">
              <AddressItem :key="'adress' + address.id" @removeAddress="removeAddress" :address="address"></AddressItem>
            </template>
            </tbody>
          </table>
        </div>

        <div v-if="totalCount == 0" class="card-empty">
          <img class="bg-empty" src="/images/undraw/undraw_delivery_address_03n0.png" alt="">
          <p class="description">Bạn chưa thêm địa chỉ nhận hàng nào</p>
          <button class="btn btn-sm btn-danger" @click="goCreateAddress">Thêm ngay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressItem from "../../../components/Customer/address/AddressItem";
import {mapGetters} from "vuex";
import {FETCH_ADDRESSES, ADDRESS_DELETE} from "../../../store/actions.type";
import {HandleRedirect} from "../../../mixins/redirect.handle";

export default {
  mixins: [HandleRedirect],
  created() {
    this.$store.dispatch(FETCH_ADDRESSES)
  },

  methods: {
    goCreateAddress() {
      this.redirect('customer.address.create');
    },
    removeAddress(id) {
      this.$swal({
        title: "Cảnh báo!",
        text: "Bạn có chắc chắn xóa địa chỉ này không!",
        icon: "warning",
        buttons: ['Thoát', 'Xóa'],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch(ADDRESS_DELETE, id)
              .then(() => {
                this.$swal({
                  text: "Xóa thành công",
                  icon: "success",
                  buttons: true
                })
              })
        }
      });
    }
  },

  computed: {
    ...mapGetters(["listAddresses", "isLoading"]),
    totalCount() {
      const {listAddresses} = this;
      return listAddresses || 0;
    }
  },

  components: {
    AddressItem
  },
}
</script>

<style lang="scss">

</style>