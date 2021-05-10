<template>
  <div>
    <div class="d-flex align-items-center">
      <span class="text-uppercase font-weight-bold">{{address.name}}</span>
      <div v-if="address.active">
        <span class="ml-3 text-success" style="font-size: 0.8em;user-select: none">Địa chỉ mặc định</span>
        <span class="fa-stack" style="transform: scale(0.5)">
                    <i class="far fa-circle fa-stack-2x text-success"></i>
                    <i class="fas fa-check fa-stack-1x text-success"></i>
                  </span>
      </div>
    </div>
    <div>
      <span style="color: #606060">Địa chỉ:&nbsp;</span>
      <span>{{address.address}}</span>
    </div>
    <div>
      <span style="color: #606060">Số điện thoại: &nbsp;</span>
      <span>{{ address.phone }}</span></div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object
    }
  },
  name: "ItemAddress",
}
</script>