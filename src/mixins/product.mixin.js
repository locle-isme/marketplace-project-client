export const ProductMixin = {
    data() {
        return {
            limitedproduct: 30,
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

        isLimited() {
            const {amount} = this.product;
            return amount && amount < this.limitedproduct ? true : false;
        },

        isFavourited() {
            const {favourited} = this.product;
            return favourited;
        }
    }

}