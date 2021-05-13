<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Sổ địa chỉ</div>
      <div class="card-body">
        <router-link :to="{name:'customer.address.create'}" class="float-right btn btn-sm btn-primary">Thêm địa chỉ
          mới
        </router-link>
        <div class="table-responsive">
          <table class="table mt-3">
            <tbody>
            <template v-for="address in listAddresses">
              <AddressComponent :key="address.id" @removeAddress="removeAddress" :address="address"></AddressComponent>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressComponent from "../../../components/AddressComponent";
import {mapGetters} from "vuex";
import {FETCH_ADDRESSES, ADDRESS_DELETE} from "../../../store/actions.type";

export default {
  name: "CustomerAddress",
  created() {
    this.$store.dispatch(FETCH_ADDRESSES)
  },

  methods: {
    removeAddress(id) {
      this.$swal({
        title: "Cảnh báo!",
        text: "Bạn có chắc chắn xóa địa chỉ này không!",
        icon: "warning",
        buttons: true,
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
    ...mapGetters(["listAddresses"]),

  },

  components: {
    AddressComponent
  },
}
</script>

<style lang="scss">

</style>