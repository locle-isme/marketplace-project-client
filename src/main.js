import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSwal from 'vue-swal'
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';


import {ApiService} from "./common/api.service";
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"
import {CHECK_AUTH} from "./store/actions.type";
import './assets/css/bootstrap.css'
import './assets/css/all.css'
import './assets/css/custom.css'

import FilterError from './common/filter.error'
import FilterCurrency from './common/filter.currency'
import FilterRound from './common/filter.round'
import FilterDate from './common/filter.date'
import FilterTimeDate from './common/filter.timeDate'

Vue.use(VueToast);
Vue.use(VueSwal)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.filter('error', FilterError)
Vue.filter('currency', FilterCurrency)
Vue.filter('round', FilterRound)
Vue.filter('date', FilterDate)
Vue.filter('time_date', FilterTimeDate)

Vue.config.productionTip = false


ApiService.init();

router.beforeEach((to, from, next) => {
    Promise.all([
        store.dispatch(CHECK_AUTH).then(() => next())
    ])
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isAuthenticated) {
            next({
                name: 'home',
                //query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
