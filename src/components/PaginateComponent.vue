<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li :class="classPreviousButton">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="previousPage()">
          <i aria-hidden="true" class="fas fa-chevron-left"></i>
        </a>
      </li>
      <template v-for="(_number, index) in range">
        <li :key="'n' + index" class="page-item" :class="{active: (index + start) == currentPage}"
            @click.prevent="updatePage(index + start)">
          <a class="page-link">{{ index + start }}</a>
        </li>
      </template>
      <li :class="classNextButton">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage()">
          <i aria-hidden="true" class="fas fa-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    pages: {
      type: [Number, String],
      required: true
    },
    currentPage: {
      type: [Number, String],
      required: false,
      default: 1
    },

    links: {
      type: Number,
      required: false,
      default: 5
    }
  },

  data() {
    return {}
  },

  methods: {
    updatePage(_page) {
      if (this.currentPage == _page) return;
      this.$emit('update:currentPage', _page);
    },

    previousPage() {
      let _currentPage = this.currentPage - this.links > 0 ? this.currentPage - this.links : 1;
      this.updatePage(_currentPage);
    },

    nextPage() {
      let _currentPage = this.currentPage + this.links <= this.pages ? this.currentPage + this.links : this.pages;
      this.updatePage(_currentPage);
    },
  },

  computed: {
    start() {
      const links = Math.floor(this.links / 2);
      return this.currentPage - links > 0 ? this.currentPage - links : 1;
    },

    end() {
      return this.start + this.links > this.pages + 1 ? this.pages + 1 : this.start + this.links;
    },

    range() {
      const {start, end} = this;
      //console.log("range", {start, currentPage, end})
      let n = parseInt(end) - parseInt(start);
      return n < 0 ? 0 : n;
    },

    classPreviousButton() {
      return {
        'page-item': true,
        disabled: this.currentPage <= Math.ceil(this.links / 2)
      }
    },

    classNextButton() {
      return {
        'page-item': true,
        disabled: this.currentPage + Math.ceil(this.links / 2) > this.pages
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pagination {
  margin: 10px 0px;

  .page-item {
    margin: 0px 8px;

    .page-link {
      border-radius: 5px;
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      background-color: rgb(247, 247, 247);
      color: rgb(100, 96, 96);
      cursor: pointer;
    }

    &:not(.disabled) {
      &:hover {
        .page-link {
          user-select: none;
          background-color: rgb(24, 158, 255);
          color: #fff;
        }
      }
    }

    &.disabled {
      .page-link {
        visibility: hidden;
      }
    }

    &.active {
      .page-link {
        background-color: rgb(24, 158, 255);
        color: #fff;
        border: none;
      }

      &:hover {
        .page-link {
          //cursor: not-allowed !important;
        }
      }
    }
  }
}
</style>