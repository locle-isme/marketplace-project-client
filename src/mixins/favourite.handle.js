import {FAVOURITE_CREATE, FAVOURITE_DELETE} from "../store/actions.type";
import {mapGetters} from "vuex";

export const HandleFavourite = {
    data(){
        return {
        }
    },

    methods:{
        handleAddFavourite() {
            const {isAuthenticated} = this;
            if (!isAuthenticated){
                this.$toast.error('Vui lòng đăng nhập để tiếp tục', {
                    duration: 5000,
                    position: 'top-left'
                })
                return;
            }
            if (!this.product.favourited) {
                this.$store.dispatch(FAVOURITE_CREATE, {product_id: this.product.id})
                    .then(() => {
                        this.loadingProducts();
                        this.$toast.success('Đã thích', {
                            duration: 5000,
                            position: 'top-left'
                        })
                    })
            } else {
                this.$store.dispatch(FAVOURITE_DELETE, {product_id: this.product.id})
                    .then(() => {
                        this.loadingProducts();
                        this.$toast.success('Đã bỏ thích', {
                            duration: 5000,
                            position: 'top-left'
                        })
                    });
            }
        }
    },

    computed:{
        ...mapGetters(["isAuthenticated"]),
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