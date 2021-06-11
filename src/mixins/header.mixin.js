import EventBus from "../common/EventBus";
import {HandleRedirect} from "./redirect.handle";
import {mapGetters} from "vuex";

export const HeaderMixin = {
    mixins:[HandleRedirect],
    data() {
        return {keywordSearch: ""}
    },
    methods: {
        handleSearchProduct() {
            EventBus.$emit('search.product', this.keywordSearch);
            this.keywordSearch = "";
        },

        goHome(){
            this.redirect('home')
        },

        goRegister(){
            this.redirect('register')
        },

        goLogin(){
            this.redirect('login')
        },

        goProfile(){
            this.redirect('customer')
        },

        goNotification(){
            this.redirect('customer.notification')
        }
    },

    computed:{
        ...mapGetters(["isAuthenticated", "user"]),
    }
}