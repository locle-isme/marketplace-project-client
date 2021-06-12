<template>
  <div class="card-store d-flex flex-column">
    <div class="card-store-info d-flex align-items-center" @click="redirect('store.global',{slug: supplier.id})">
      <div class="avatar">
        <img :src="supplier.avatar" alt="">
      </div>
      <span class="name-store">{{ supplier.nameOfShop }}</span>
    </div>
    <div class="seller-detail row">
      <div class="col">
        <div class="d-flex flex-column align-items-center">
          <div class="rate">4.8 <i class="fas fa-star text-warning"></i>
          </div>
          <small class="review">(88 đánh giá)</small>
        </div>
      </div>
      <!--      <div class="col">-->
      <!--        <div class="d-flex flex-column align-items-center">-->
      <!--          <div class="follow">12</div>-->
      <!--          <span class="review">Theo dõi</span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="buyer-action d-flex justify-content-center mt-3">
      <button class="btn btn-sm btn-outline-info" @click="redirect('store.global',{slug: supplier.id})">
        <i class="fa fa-shopping-bag"></i> Xem shop
      </button>
      <!--      <button class="btn btn-sm btn-outline-info">-->
      <!--        <i class="fas fa-plus"></i> Theo dõi-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script>

import {HandleRedirect} from "../../mixins/redirect.handle";

export default {
  mixins: [HandleRedirect],
  props: {
    supplier: {
      type: Object
    },
  },
}
</script>

<style lang="scss">

.card-store {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
  padding: 20px 18px;
  border-radius: 5px;

  .card-store-info {
    cursor: pointer;

    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .name-store {
      margin-left: 15px;
      font-size: 1rem;
      font-weight: 600;
      color: #3e3e3e;
    }

  }

  .seller-detail {
    margin: 10px 0px;

    .rate {
      font-size: 1.2em;
      font-weight: 600;
    }

    .follow {
      @extend .rate;
    }

    .review {
      color: rgba(88, 88, 88, 0.61);
    }
  }

  .buyer-action {
    .btn {
      margin-right: 3px;
    }
  }

}
</style>