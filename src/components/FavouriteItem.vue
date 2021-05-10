<template>
  <router-link tag="div" :to="{name:'product.detail', params:{slug: '1'}}" class="product-item col" style="padding: 1rem">
    <div class="d-flex flex-column">
      <div style="z-index: 111">
        <button type="button" class="close" aria-label="Close" @click="test">
          <span aria-hidden="true" style="font-size: 1em">&times;</span>
        </button>
        <img src="https://salt.tikicdn.com/cache/280x280/ts/product/18/d5/c1/12b6f5dee03a86bb0dc6f4fa847df279.jpg"
             class="img-thumbnail" alt="">
      </div>
      <div class="name mt-2 limit-line">
        <span>Combo 10 móc treo quần áo đa năng 9 lỗ tiện dụng tên dài vaivaivaivaivaivaivai</span>
      </div>
      <ItemReview :count="20" :rating="0.6"></ItemReview>
    </div>
    <div class="d-flex align-items-center">
      <div class="price">69.000 ₫</div>
      <div class="discount text-light ml-1">- 45%</div>
    </div>
  </router-link>
</template>

<script>
import ItemReview from "./ItemReview";

export default {
  methods:{
    test(){
      event.preventDefault();
      alert('ok')
    }
  },
  components: {
    ItemReview
  },
  name: "FavouriteItem"
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.product-item {
  cursor: pointer;
}

.product-item:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
}

.product-item .name {
  text-align: left;
  font-weight: 550;
}

.product-item .limit-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.product-item .discount {
  background: #e74646;
  padding: 2px 3px;
  user-select: none;
  border-radius: 5px;
}


</style>