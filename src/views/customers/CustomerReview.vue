<template>
  <div class="col-xl-9 col-md-12">
    <div class="card">
      <div class="card-title">Nhận xét sản phẩm đã mua</div>
      <div class="card-body">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <div class="nav-link" :class="isActive('reviewed')" @click="typeSelect = 'reviewed'">Đã đánh giá <span
                class="badge badge-light">4</span>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link" :class="isActive('already')" @click="typeSelect = 'already'">Chờ đánh giá <span
                class="badge badge-light">4</span>
            </div>
          </li>
        </ul>

        <div v-if="typeSelect == 'reviewed'" class="list-reviewed">
          <div class="row my-2 pb-3 border-bottom">
            <div class="col-12">
              <div class="name-product">Ổ Cứng SSD Samsung 860 Evo 250GB Sata III 2.5 inch - Hàng Nhập Khẩu (Box Tiếng
                Anh)
              </div>
            </div>
            <div class="col-lg-3">
              <img class="img-thumbnail"
                   src="https://salt.tikicdn.com/cache/280x280/ts/product/ad/52/e7/bfc4339c50d2741e70a96de264cf9dfe.jpg"
                   alt="">
            </div>
            <div class="col-lg-9">
              <div class="d-flex flex-column">
                <RatingTitle></RatingTitle>
                <div class="content d-flex flex-column">
                  <div class="comment"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur dolorum fuga harum in neque odio similique temporibus? Illum, quisquam sequi. Assumenda aut ea, ex facere libero porro ratione sit.</span>
                  </div>
                  <div class="created-date"><span>Nhận xét vào 27/02/2021 06:40</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="list-already-review">
          <div class="row my-2 pb-3 border-bottom">
            <div class="col-xl-3">
              <img class="img-thumbnail"
                   src="https://salt.tikicdn.com/cache/280x280/ts/product/ad/52/e7/bfc4339c50d2741e70a96de264cf9dfe.jpg"
                   alt="">
            </div>
            <div class="col-xl-9">
              <div class="d-flex flex-column">
                <div class="name-product">Ổ Cứng SSD Samsung 860 Evo 250GB Sata III 2.5 inch - Hàng Nhập Khẩu (Box Tiếng
                  Anh)
                </div>
                <div class="price">7.000.000đ</div>
                <div class="mt-1"><span>Cung cấp bởi &nbsp;</span><span class="text-primary" style="cursor: pointer">Tiki Trading</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import RatingTitle from "../../components/RatingTitle";

export default {
  name: "CustomerReview",
  data() {
    return {
      typeSelect: 'reviewed'
    }
  },
  methods: {
    isActive(_type) {
      return {
        active: this.typeSelect == _type
      }
    }
  },
  components: {
    RatingTitle
  }
}
</script>

<style scoped>

li.nav-item {
  cursor: pointer;
}

.name-product {
  padding: 5px 0px;
  font-size: 1.2em;
  font-weight: 700;
  color: #1f648b;
  cursor: pointer;
}

.price {
  color: #be0505;
  font-size: 1.1em;
  font-weight: 600;
}

.comment {
  text-align: justify;
  font-size: 0.9em;
}

.created-date span {
  font-size: 0.85em;
  color: rgb(120, 120, 120);
}
</style>