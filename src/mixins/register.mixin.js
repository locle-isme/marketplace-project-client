import {REGISTER} from "../store/actions.type";
import {mapGetters} from "vuex";

export const RegisterMixin = {
    data() {
        return {
            formDataRegister: {
                name: "Ảo thật đấy",
                email: "choeger@example.net",
                password: "Demopass69",
                password_confirmation: "Demopass69",
                sex: "male",
                birthday: "1990-05-05"
                // day: 0,
                // month: 0,
                // year: 0
            }
        }
    },

    methods: {

        register() {
            this.$store.dispatch(REGISTER, this.formDataRegister)
                .then(() => {
                    this.$swal({
                        title: "Tạo tài khoản thành công!",
                        text: "Vui lòng đăng nhập để tiếp tục sử dụng",
                        icon: "success",
                        button: "Thoát!",
                    });
                })
        }
    },

    computed: {
        ...mapGetters(["errors","isLoading"]),
        className() {
            return {
                'form-control': true,
                'is-invalid': !!this.errors.name,
                'is-valid': !this.errors.name && this.formDataRegister.name != ""
            }
        },

        classEmail() {
            return {
                'form-control': true,
                'is-invalid': !!this.errors.email,
                'is-valid': !this.errors.email && this.formDataRegister.email != ""
            }
        },

        classPassword() {
            return {
                'form-control': true,
                'is-invalid': !!this.errors.password,
                'is-valid': !this.errors.password && this.formDataRegister.password != ""
            }
        },

        classPasswordConfirmation() {
            return {
                'form-control': true,
                'is-invalid': !!this.errors.password_confirmation,
                'is-valid': !this.errors.password_confirmation && this.formDataRegister.password_confirmation != ""
            }
        },

        classBirthday() {
            return {
                'form-control': true,
                'is-invalid': !!this.errors.birthday,
                'is-valid': !this.errors.birthday && this.formDataRegister.birthday != ""
            }
        },

        classSex() {
            return {
                'form-check-input': true,
                'is-invalid': !!this.errors.sex,
                //'is-valid': !this.errors.sex && this.formDataRegister.sex != ""
            }
        },
    },
}