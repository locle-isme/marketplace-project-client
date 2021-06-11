<template>
  <div class="row">
    <div class="col">
      <div class="card-category card">
        <div class="card-title text-uppercase">Danh mục sản phẩm</div>
        <div class="card-body p-0">
          <div class="category-contains">
            <ul class="navbar-nav">
              <template v-for="i in 5">
                <GroupCategory :key="'grct' + i"></GroupCategory>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupCategory from "./GroupCategory";

export default {
  data() {
    return {
      settings: {
        "infinite": true,
        "slidesToShow": 3,
        "speed": 500,
        "rows": 2,
        "slidesPerRow": 1
      },
    }
  },
  components: {
    GroupCategory
  },
  name: "CategoryOverview"
}
</script>

<style lang="scss">
.card-category {
  .card-body {
    position: relative;
    width: 100%;
    height: 100%;

    .category-contains {
      height: 100%;
      overflow: hidden;

      .navbar-nav {
        transform: translate(0px, 0px);
        transition: all 500ms ease 0s;
        flex-direction: row;
        width: 130%;

        .nav-item {
          padding: 0px;
          width: calc(100% / 13);

          .category-item {
            width: 100%;
            padding: 10px 20px;
            border-bottom: solid 1px rgba(0, 0, 0, .05);
            border-right: solid 1px rgba(0, 0, 0, .05);
            cursor: pointer;

            .contain-image {
              background: rgba(206, 206, 206, 0.46);
              width: 80px;
              height: 80px;
              margin-bottom: 0.8rem;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 11;

              .image {
                width: 90%;
                height: 55%;

                img {
                  object-fit: cover;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }

  }
}
</style>