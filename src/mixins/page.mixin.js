export const PageMixin = {
    data() {
        return {
            currentPage: 1,
            limit: 20,
        }
    },

    methods: {
        loadMorePage() {
            this.currentPage++;
        },

        resetCurrentPage() {
            this.currentPage = 1;
        },
    },

    computed: {
        pages() {
            const {total_count} = this.products;
            return Math.ceil(total_count / this.limit) || 0;
        },

        offset() {
            const {currentPage, limit} = this;
            return currentPage * limit;
        },

        isLoadMore() {
            const {total_count} = this.products;
            const {offset} = this;
            return total_count > offset;
        }
    }
}