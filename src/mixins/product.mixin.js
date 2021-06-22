export const ProductMixin = {
    props: {
        // product: {
        //     type: Object,
        //     required: false
        // }
    },
    data() {
        return {
            minProducts: 25,
            defaultImage: 'https://via.placeholder.com/640x480.png/00bb11?text=default',
        }
    },
    computed: {
        brand() {
            const {brand} = this.product;
            return brand || {};
        },

        supplier() {
            const {supplier} = this.product;
            return supplier || {};
        },

        images() {
            const {images} = this.product;
            return images || [];
        },

        firstImages() {
            const {images} = this.product;
            return images[0] ? images[0].url : this.defaultImage;
        },

        ratings() {
            const {ratings} = this.product;
            return ratings || {};
        },

        reviews() {
            const {reviews} = this.listReviews;
            return reviews || [];
        },

        realPrice() {
            const {price, discount} = this.product;
            return price * (100 - discount) / 100;
        },

        grandTotal() {
            const {grand_total} = this.product;
            return grand_total;
        },

        discount() {
            const {discount} = this.product;
            return discount;
        },


        price() {
            const {price} = this.product;
            return price;
        },

        amount() {
            const {amount} = this.product;
            return amount;
        },

        max_buy(){
            const {max_buy} = this.product;
            return max_buy;
        },

        isLimited() {
            const {amount} = this.product;
            return amount && amount < this.minProducts ? true : false;
        },

        isAvailable() {
            const {available} = this.product;
            return available;
        },

        isFavourited() {
            const {favourited} = this.product;
            return favourited;
        },

        slug() {
            const {slug} = this.product;
            return slug;
        },


    }

}