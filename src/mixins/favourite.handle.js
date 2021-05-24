import {FAVOURITE_CREATE, FAVOURITE_DELETE} from "../store/actions.type";

export const HandleFavourite = {
    data(){
        return {
            isLoading: false
        }
    },

    methods:{
        handleAddFavourite() {
            this.isLoading = true;
            if (!this.product.favourited) {
                this.$store.dispatch(FAVOURITE_CREATE, {product_id: this.product.id})
                    .then(() => {
                        this.isLoading = false;
                        this.loadingData();
                        this.$toast.success('Đã thích', {
                            duration: 5000,
                            position: 'top-left'
                        })
                    })
            } else {
                this.$store.dispatch(FAVOURITE_DELETE, {product_id: this.product.id})
                    .then(() => {
                        this.isLoading = false;
                        this.loadingData();
                        this.$toast.success('Đã bỏ thích', {
                            duration: 5000,
                            position: 'top-left'
                        })
                    });
            }
        }
    },

    computed:{
        classFavouritedProduct() {
            const {favourited} = this.product;
            return {
                'single-action': true,
                'like-product': true,
                'active': favourited
            }
        }
    }
}