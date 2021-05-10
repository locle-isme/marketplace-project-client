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
              <tr :key="address.id">
                <td>
                  <ItemAddress :address="address"></ItemAddress>
                </td>

                <td>
                  <div class="float-right btn-group">
                    <button class="btn btn-sm btn-danger" @click="deleteAddress(address.id)">Xóa</button>
                    <router-link tag="button"
                                 :to="{name:'customer.address.edit', params: {addressID: address.id.toString()}}"
                                 class="btn btn-sm btn-warning">Chỉnh sửa
                    </router-link>
                  </div>
                </td>
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
import ItemAddress from "../../../components/ItemAddress";
import {mapGetters} from "vuex";
import {FETCH_ADDRESSES, ADDRESS_DELETE} from "../../../store/actions.type";

export default {
  name: "CustomerAddress",
  created() {
    this.$store.dispatch(FETCH_ADDRESSES)
  },

  methods: {
    deleteAddress(id) {
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
    ItemAddress
  },
}
</script>

<style scoped>

</style>