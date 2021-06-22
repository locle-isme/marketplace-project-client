import Vue from 'vue'
import VueToast from "vue-toast-notification";
Vue.use(VueToast);


export const toastError = (message, position = 'top-left') => {
    return Vue.$toast.error(message, {
        duration: 5000,
        position: position
    });
};
export const toastSuccess = (message, position = 'top-left') => {
    return Vue.$toast.success(message, {
        duration: 5000,
        position: position
    });
};