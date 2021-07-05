<template>
  <div class="modal2">
    <div class="modal-content2">
      <div class="modal-head"><span class="close2" @click="$emit('close', false)">&times;</span></div>
      <div class="modal-body">
        <slot name="gallery_body" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },

  data() {
    return {

    }
  },
  created() {
  }
}
</script>

<style lang="scss">
$width-image: 300px;
.modal2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95) !important;
  width: 100%;
  height: 100%;
  color: #fff;
  z-index: 999999;
  overflow: auto;
  .modal-content2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 3rem 8rem;
    @media screen and (max-width: 960px){
      padding: 1rem;
    }
  }

  .modal-head {
    .close2 {
      cursor: pointer;
      font-size: 2rem;
      float: right;
      user-select: none;
    }
  }

  .modal-body {
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
  }

}


</style>