<template>
  <div class="product row flex-nowrap">
    <div class="img justify-content-center">
      <img :src="firstImages" alt="" @click="goProduct()">
    </div>
    <div class="content d-flex flex-nowrap">
      <div class="description">
        <div class="d-flex flex-column">
          <div class="name" @click="goProduct()">{{ product.name }}
          </div>
          <div class="note" v-if="isLimited && isAvailable">Còn {{ product.amount }} sản phẩm</div>
          <div v-if="isAvailable" class="quality-a">
            <div class="btn-group">
              <button :class="classQuantityBtn" :disabled="isLoading" @click="changeQuantity(-1)">
                <i class="fa fa-minus"></i></button>
              <input :value="quantity" type="number" class="quality-input" @keyup="changeValueQuantity($event)">
              <button :class="classQuantityBtn" :disabled="isDisabledUpQuantityBtn" @click="changeQuantity(1)">
                <i class="fa fa-plus"></i>
              </button>
            </div>

          </div>
          <div v-else class="note">Sản phẩm không sẵn có</div>
        </div>
      </div>
      <div class="detail">
        <div class="price d-flex flex-column align-items-center">
          <div class="real-price">{{ grandTotal |currency }}</div>
          <div class="d-flex align-items-center">
            <del v-if="discount > 0" class="root-price">{{ price | currency }}</del>
            <div class="line-straight" v-if="discount > 0"></div>
            <div class="discount" v-if="discount > 0">-{{ discount }}%</div>
          </div>
          <div class="actions d-flex">
            <div class="remove">
              <button class="btn text-info" @click="removeCartItem()" :disabled="isLoading">
                <img src="/images/actions/trash.svg" alt="">
              </button>
            </div>
            <div class="buy-later">
              <button class="btn" :disabled="isLoading">
                <i class="fa fa-heart" :class="classIconHeart" @click="handleAddFavourite()"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {ProductMixin} from "../../mixins/product.mixin";
import {
  CART_EDIT, FETCH_CART,
  GET_CART_COUNT_ITEMS, CART_REMOVE
} from "../../store/actions.type";
import {HandleFavourite} from "../../mixins/favourite.handle";
import {HandleRedirect} from "../../mixins/redirect.handle";
import firstError from "../../common/filter.error"
import {
  toastError,
  toastSuccess
} from "../../common/toast";
import {SET_RESET_COUPON_IN_CART} from "../../store/mutations.type";

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
    const {quantity, favourited} = this.product;
    this.quantity = quantity;
    this.favourite = favourited;
  },

  methods: {
    loadingData() {
      this.$emit('loadingData');
    },

    async removeCartItem() {
      const {id} = this.product;
      this.isLoading = true;
      this.$swal({
        //title: 'Are you sure?',
        text: "Bạn muốn xóa sản phẩm này?",
        icon: 'warning',
        buttons: ["Không", "Có"],
      })
          .then(async (answer) => {
            if (answer) {
              try {
                await this.$store.dispatch(CART_REMOVE, {product_id: id});
                await this.$store.dispatch(GET_CART_COUNT_ITEMS);
                await this.$store.dispatch(FETCH_CART);
                toastSuccess('Xóa sản phẩm thành công');
              } catch (e) {
                console.log(e)
                toastError('Có lỗi xảy ra');
              }
              console.log('answer')
            } else {
              this.quantity = 1;
            }
          })

      this.isLoading = false;
    },

    changeQuantity(n) {
      this.quantity += n;
      this.updateQuantity();
    },

    changeValueQuantity({target: {value}}) {
      if (value == "") return;
      this.quantity = value;
      this.updateQuantity();
    },

    async updateQuantity() {
      const {quantity} = this;
      const {amount, max_buy, id} = this.product;
      if (quantity > max_buy) {
        this.quantity = max_buy;
        return toastError(`Sản phẩm có số lượng mua tối đa là ${max_buy}`);
      }

      if (quantity > amount) {
        this.quantity = amount;
        return toastError(`Số lượng mua lớn hơn số lượng sản phẩm hiện có`);
      }

      if (quantity <= 0) {
        return this.removeCartItem();
      }
      try {
        await this.$store.dispatch(CART_EDIT, {product_id: id, quantity: this.quantity});
        await Promise.all([
          this.$store.dispatch(FETCH_CART),
          this.$store.dispatch(SET_RESET_COUPON_IN_CART),
        ])
      } catch (errs) {
        for (let name_err in errs) {
          toastError(firstError(errs[name_err]));
        }
      }
    },

    goProduct() {
      const {slug} = this.product;
      this.redirect('product.detail', {slug})
    }
  },

  computed: {
    classQuantityBtn() {
      return {
        'quality-btn': true,
      }
    },

    classIconHeart() {
      const {favourite} = this;
      return {
        'text-dark': !favourite,
        'text-danger': favourite
      };
    },

    isDisabledUpQuantityBtn() {
      const {amount} = this.product;
      const {quantity} = this;
      return quantity >= amount || this.isLoading;
    }
  },

  watch: {
    quantity(v) {
      const {isAvailable} = this;
      //const {amount, max_buy} = this.product;
      let tempValue = v;
      if (typeof v == "string") {
        tempValue = parseInt(v);
      }

      if (Number.isNaN(v)) {
        tempValue = 1;
      }

      /*if (v === 0 || v === "0") {
        await this.removeCartItem();
      }*/

      if (!isAvailable) {
        return;
      }

      this.quantity = tempValue;
      //await this.updateQuantity();
    }
  },
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

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
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