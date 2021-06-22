import {FAVOURITE_CREATE, FAVOURITE_DELETE} from "../store/actions.type";
import {mapGetters} from "vuex";

export const HandleFavourite = {
    data() {
        return {
            favourite: false,
        }
    },

    methods: {
        async handleAddFavourite() {
            const {isAuthenticated} = this;
            if (!isAuthenticated) {
                this.$toast.error('Vui lòng đăng nhập để tiếp tục', {
                    duration: 5000,
                    position: 'top-left'
                })
                return;
            }

            if (this.favourite) {
                try {
                    await this.$store.dispatch(FAVOURITE_DELETE, {product_id: this.product.id});
                    this.$toast.success('Đã bỏ thích', {
                        duration: 5000,
                        position: 'top-left'
                    })
                    this.favourite = false;
                } catch(e){
                    console.log(e)
                }
            } else {
                try {
                    await this.$store.dispatch(FAVOURITE_CREATE, {product_id: this.product.id});
                    this.$toast.success('Đã thích', {
                        duration: 5000,
                        position: 'top-left'
                    })
                    this.favourite = true;
                } catch(e){
                    console.log(e)
                }
            }
        }
    },

    computed: {
        ...mapGetters(["isAuthenticated"]),
        classFavouritedProduct() {
            const {favourite} = this;
            return {
                'single-action': true,
                'like-product': true,
                'active': favourite
            }
        }
    }
}