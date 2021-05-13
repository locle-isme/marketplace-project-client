<template>
  <div class="cart-product row">
    <div class="d-flex flex-column">
      <div class="seller">ThuanThienTs <i class="fas fa-chevron-right" style="margin-left: 8px;font-size: 0.8em"></i>
      </div>
      <div class="product row flex-nowrap">
        <div class="img justify-content-center">
          <img src="https://salt.tikicdn.com/cache/200x200/ts/product/d9/5f/97/4b8d952402cfe75a08403cf758eee7df.jpg"
               alt="">
        </div>
        <div class="content d-flex flex-nowrap">
          <div class="description">
            <div class="d-flex flex-column">
              <div class="name">Máy tính Mini MiniPC Asus PN-40BElead Chip INTEL PENTIUM SILVER J5005/Wifi INTEL
                802.11AC,BT/Ram + SSD tùy chọn- Hàng Chính Hãng - 8GB - 240GB
              </div>
              <div class="note">Chỉ còn 3 sản phẩm</div>
              <div class="quality-a">
                <div class="btn-group">
                  <button class="quality-btn">-</button>
                  <input type="text" class="quality-input">
                  <button class="quality-btn">+</button>
                </div>
              </div>

              <div class="actions d-flex">
                <div class="remove">Xóa</div>
                <div class="buy-later">Mua lại sau</div>
              </div>
            </div>
          </div>
          <div class="detail">
            <div class="price d-flex flex-column align-items-end">
              <div class="real-price">7.000.000đ</div>
              <div class="d-flex align-items-center">
                <del class="root-price">8.000.000đ</del>
                <div class="line-straight"></div>
                <div class="discount">-11%</div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <div class="seller-discount d-flex border-top">
        <div class="description">Mã Khuyến Mãi<i class="fas fa-chevron-down" style="margin-left: 15px"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">

.line-straight {
  width: 2px;
  height: 13px;
  background-color: #929191;
  margin: 0px 5px;
  border-radius: 4px;
}

.cart-product {
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 0px 0px 15px 0px;
  padding: 10px 5px;
  border-radius: 8px;

  .seller-discount {
    padding: 20px 5px 5px 5px;

    .description {
      font-size: 1.1em;
      color: #242323;
      font-weight: 500;
      cursor: pointer;
    }
  }

  .seller {
    color: rgba(34, 34, 34, 0.8);
    padding: 8px 15px;
    font-size: 0.95em;
    line-height: 5px;
    font-weight: 550;
    margin-bottom: 15px;
    cursor: pointer;
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
          margin-bottom: 15px;
          font-size: 0.95em;
          color: #000;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          cursor: pointer;
        }

        .actions {
          margin-bottom: 15px;

          .remove {
            margin-right: 20px;
            cursor: pointer;
            font-size: 0.9em;
            color: #239de2;
          }

          .buy-later {
            @extend .remove;
          }
        }

        .note {
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
      }
    }
  }


}


</style>