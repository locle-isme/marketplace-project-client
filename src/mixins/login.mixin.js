import {LOGIN} from "../store/actions.type";
import {HandleRedirect} from "./redirect.handle";
import {mapGetters} from "vuex";

export const LoginMixin = {
    mixins: [HandleRedirect],
    data() {
        return {
            formDataLogin: {
                email: "choeger@example.net",
                password: "Demopass69"
            },
        }
    },

    methods: {
        login() {
            this.$store.dispatch(LOGIN, this.formDataLogin)
                .then(() => {
                    this.$swal({
                        title: "Thành công!",
                        text: "Đăng nhập thành công!",
                        icon: "success",
                        button: "Thoát!",
                    });
                    this.$emit('close');
                    if (this.hasHistory) {
                        this.$router.go(-1);
                    } else {
                        this.redirect('home');
                    }
                })
                .catch(() => {
                    this.$swal({
                        title: "Thất Bại!",
                        text: "Sai email hoặc mật khẩu!",
                        icon: "error",
                        button: "Thoát!",
                    });
                })
        },
    },

    computed: {
        ...mapGetters(["isLoading"]),
        hasHistory() {
            return window.history.length > 2
        }
    },
}