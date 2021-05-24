<template>
  <div class="product row flex-nowrap">
    <div class="img justify-content-center">
      <img :src="firstImages" alt="" @click="redirect('product.detail', {slug: product.id})">
    </div>
    <div class="content d-flex flex-nowrap">
      <div class="description">
        <div class="d-flex flex-column">
          <div class="name" @click="redirect('product.detail', {slug: product.id})">{{ product.name }}
          </div>
          <div class="note" v-if="isLimited">Còn {{ product.amount }} sản phẩm</div>
          <div class="quality-a">
            <div class="btn-group">
              <button :class="classQuantityBtn" :disabled="isLoading" @click="changeQuantity(-1)">-</button>
              <input v-model="quantity" type="text" class="quality-input">
              <button :class="classQuantityBtn" :disabled="isLoading" @click="changeQuantity(1)">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="price d-flex flex-column align-items-center">
          <div class="real-price">{{ realPrice |currency }}</div>
          <div class="d-flex align-items-center">
            <del class="root-price">{{ product.price | currency }}</del>
            <div class="line-straight" v-if="product.discount > 0"></div>
            <div class="discount" v-if="product.discount > 0">-{{ product.discount }}%</div>

          </div>
          <div class="actions d-flex">
            <div class="remove">
              <button class="btn btn-sm btn-warning" @click="removeCartItem()" :disabled="isLoading">
                <i class="fa fa-recycle"></i>
              </button>
            </div>
            <div class="buy-later">
              <button class="btn btn-sm" :class="{'btn-light': !isFavourited, 'btn-danger': isFavourited}" :disabled="isLoading">
                <i class="fa fa-heart" :class="{'text-white': isFavourited}" @click="handleAddFavourite()"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {ProductMixin} from "../../mixins/product.mixin";
import {CART_EDIT} from "../../store/actions.type";
import {HandleFavourite} from "../../mixins/favourite.handle";
import {HandleRedirect} from "../../mixins/redirect.handle";

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
  },


  mixins: [ProductMixin, HandleFavourite, HandleRedirect],

  data() {
    return {
      isLoading: false,
      quantity: 0
    }
  },

  created() {
    this.quantity = this.product.quantity;
  },

  methods: {
    loadingData() {
      this.$emit('loadingData');
    },

    removeCartItem() {
      const {id} = this.product;
      this.isLoading = true;
      this.$store.dispatch(CART_EDIT, {product_id: id, amount: 0})
          .then(() => {
            this.isLoading = false;
            this.$toast.success('Xóa sản phẩm thành công', {
              duration: 5000,
              position: 'top-left'
            })
          })
    },

    changeQuantity(n) {
      let temp = this.quantity + n;
      const {amount, id} = this.product;
      if (temp <= 0) {
        this.removeCartItem();
        return;
      }

      if (temp > amount) {
        this.$toast.error('Số lượng mua không hợp lệ', {
          duration: 5000,
          position: 'top-left'
        })
        return;
      }
      this.quantity = temp;
      this.$store.dispatch(CART_EDIT, {product_id: id, amount: this.quantity});
    }
  },

  computed: {
    classQuantityBtn() {
      return {
        'quality-btn': true,
      }
    }
  },

  watch: {
    quantity(qty) {
      if (typeof qty != "number") this.quantity = 1;
      if (qty > this.product.amount) {
        this.$toast.error('Số lượng mua không hợp lệ', {
          duration: 5000,
          position: 'top-left'
        })
      }
    }
  },
  name: "CartProductComponent"
}
</script>

<style lang="scss">
.line-straight {
  width: 2px;
  height: 13px;
  background-color: #929191;
  margin: 0px 5px;
  border-radius: 4px;
}


.product {
  padding: 8px 20px;

  @media (max-width: 991px) {
    .img {
      width: 90px;
      height: 90px;
    }

    .content {
      width: calc(100% - 90px);
    }
  }

  @media (min-width: 992px) {
    .img {
      width: 130px;
      height: 130px;
      cursor: pointer;
    }

    .content {
      width: calc(100% - 120px);
    }
  }

  .img {
    width: 90px;
    height: 90px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .content {
    .description {
      margin-right: 10px;
      margin-left: 10px;
      width: calc(100% - 125px);

      .name {
        margin-bottom: 5px;
        font-size: 1.2em;
        font-weight: 300;
        color: rgba(15, 0, 7, 0.91);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        cursor: pointer;
      }

      .note {
        margin-bottom: 3px;
        color: #e54242;
        font-size: 0.9em;
      }

      .quality-a {
        margin-bottom: 20px;

        .btn-group {
          border: 1px solid rgb(200, 200, 200);

          .quality-btn {
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;

            &:first-child {
              border-right: 1px solid rgb(200, 200, 200);
            }

            &:last-child {
              border-left: 1px solid rgb(200, 200, 200);
            }

          }

          .quality-input {
            width: 30px;
            border: none;
            outline: none;
            text-align: center;
          }

        }
      }
    }

    .detail {
      width: auto;

      .price {
        .real-price {
          color: #be0505;
          font-size: 1.1em;
          font-weight: 600;
        }

        .root-price {
          font-size: 0.8em;
        }

        .discount {
          @extend .root-price;
        }
      }

      .actions {
        margin-bottom: 15px;

        .remove {
          cursor: pointer;
          font-size: 0.9em;
          color: #239de2;
          padding: 5px;
        }

        .buy-later {
          @extend .remove;
        }
      }
    }
  }
}

</style>