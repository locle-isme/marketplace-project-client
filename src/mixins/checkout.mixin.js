import {mapGetters} from "vuex";

export const CheckoutMixin = {
    methods: {
        totalPriceSupplier(supplier) {
            const {products} = supplier;
            let total = products.reduce((accumulator, product) => {
                return accumulator + this.realPrice(product) * product.quantity;
            }, 0);
            return total;
        },

        realPrice(product) {
            const {price, discount} = product;
            return price * (100 - discount) / 100;
        },

        totalCostCategoryOfSupplier(supplier) {
            const {products} = supplier;
            let coupon = this.globalCoupons.data.find(item => item.code == this.couponGlobalInUse);
            const {childs} = coupon.category || [];
            return products.reduce((acc, product) => {
                const {category} = product;
                let value = (category.id == coupon.category.id || childs.indexOf(category.id) > -1) ? this.realPrice(product) : 0;
                return acc + value;
            }, 0)
        },
    },
    computed: {
        ...mapGetters(
            ["cart", "defaultAddress", "couponSupplierInUse",
                "couponGlobalInUse", "globalCoupons"
            ]),
        suppliers() {
            const {suppliers} = this.cart;
            return suppliers || [];
        },

        totalCount() {
            const {total_count} = this.cart;
            return total_count;
        },

        totalPriceDiscountSupplier() {
            return this.suppliers.reduce((accumulator, supplier) => {
                const {discount_codes} = supplier;
                let tempCost = this.totalPriceSupplier(supplier);
                let coupon = this.couponSupplierInUse.find(c => c.supplier_id == supplier.id);
                let tempDiscountCost = 0;
                if (coupon && coupon.discount_code) {
                    let discount_code = discount_codes.find(dc => coupon.discount_code == dc.code);
                    const {max_price, percent, from_price} = discount_code;
                    tempDiscountCost = tempCost > from_price && tempCost * percent / 100 > max_price ? max_price : tempCost * percent / 100;
                }
                return accumulator + tempDiscountCost;
            }, 0);
        },

        totalPriceDiscountCategory() {
            const {suppliers} = this.cart;
            let coupon = this.globalCoupons.data.find(item => item.code == this.couponGlobalInUse);
            if (!coupon) return 0;
            const {max_price, percent, from_price} = coupon;
            let supplier = suppliers.find((_supplier) => {
                let tempCost = this.totalCostCategoryOfSupplier(_supplier);
                return tempCost > from_price;
            })

            if (!supplier) return 0;
            let tempCost = this.totalCostCategoryOfSupplier(supplier);
            return tempCost * percent / 100 > max_price ? max_price : tempCost * percent / 100;
        },

        totalDiscountPrice() {
            return this.totalPriceDiscountSupplier + this.totalPriceDiscountCategory;
        },

        totalTempPrice() {
            let total = this.suppliers.reduce((accumulator, supplier) => {
                return accumulator + this.totalPriceSupplier(supplier);
            }, 0);

            return total;
        },

        totalPrice() {
            return this.totalTempPrice - this.totalDiscountPrice;
        },



    },
}