import {mapGetters} from "vuex";

export const SearchMixin = {
    data() {
        return {
            currentPage: 1,
            tempPrice: {min: 0, max: 0},
            queryData: {}
        }
    },

    methods: {
        syncQueryData() {
            const query = this.$route.query;
            const {stars, brands, suppliers, sortBy, price, page} = query;
            if (stars) {
                this.queryData.ratings = stars.split(",");
            }

            if (brands) {
                this.queryData.brands = brands.split(",");
            }

            if (suppliers) {
                this.queryData.suppliers = suppliers.split(",");
            }

            if (sortBy) {
                this.queryData.sortBy = sortBy;
            }

            if (price) {
                const tempPrice = decodeURI(price).split(",");
                this.tempPrice.min = tempPrice[0];
                this.tempPrice.max = tempPrice[1];
                this.approvalPrice();
            }

            if (page) {
                this.currentPage = page;
            }
        },

        resetQueryData() {
            this.resetCurrentPage();
            this.queryData.ratings = [];
            this.queryData.prices.min = 0;
            this.queryData.prices.max = 0;
            this.queryData.sortBy = "default";
        },

        approvalPrice() {
            const {prices} = this.queryData;
            const {min, max} = this.tempPrice;


            if (parseInt(min) < 0 || parseInt(max) < 0) {
                this.$toast.error("Giá không hợp lệ", {position: "top-left"});
                return;
            }


            if (parseInt(min) > parseInt(max)) {
                this.$toast.error("Giá không hợp lệ", {position: "top-left"});
                return;
            }


            prices.min = parseInt(min);
            prices.max = parseInt(max);
            //this.goSearchCategory();
        },

        formatDataQuery(ar) {
            return ar.length > 0 ? ar.join(",") : "";
        },

        goHome() {
            this.redirect('home');
        },


    },
    computed: {
        ...mapGetters(["isLoading"]),
        price() {
            const {prices} = this.queryData;
            return `${prices.min},${prices.max}`;
        },

        sortBy() {
            const {sortBy} = this.queryData;
            return sortBy;
        },

        ratings() {
            const {ratings} = this.queryData;
            return ratings;
        },

        brands() {
            const {brands} = this.queryData;
            return brands;
        },

        suppliers() {
            const {suppliers} = this.queryData;
            return suppliers;
        },

        sortSettings() {
            const {sort_settings} = this.filters;
            return sort_settings;
        },

        listBrands() {
            const {brands} = this.filters;
            return brands;
        },

        listSuppliers() {
            const {suppliers} = this.filters;
            return suppliers;
        },

    }
}