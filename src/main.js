import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSwal from 'vue-swal'
import VueToast from 'vue-toast-notification'
import VueElementLoading from 'vue-element-loading'

//import 'vue-toast-notification/dist/theme-default.css';
import 'bootstrap'
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"
import {ApiService} from "./common/api.service"
import {CHECK_AUTH} from "./store/actions.type"

import 'bootstrap/dist/css/bootstrap.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import './assets/css/all.css'
import './assets/css/custom.css'

import FilterError from './common/filter.error'
import FilterCurrency from './common/filter.currency'
import FilterRound from './common/filter.round'
import FilterDate from './common/filter.date'
import FilterTimeDate from './common/filter.timeDate'
import FilterYear from './common/filter.year'
import FilterFixed from './common/filter.fixed'

Vue.use(VueToast);
Vue.use(VueSwal)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('VueElementLoading', VueElementLoading)

Vue.filter('error', FilterError)
Vue.filter('currency', FilterCurrency)
Vue.filter('round', FilterRound)
Vue.filter('date', FilterDate)
Vue.filter('time_date', FilterTimeDate)
Vue.filter('year', FilterYear)
Vue.filter('fixed', FilterFixed)

Vue.config.productionTip = false


ApiService.init();

router.beforeEach(async (to, from, next) => {
    try {
        await Promise.all([
            store.dispatch(CHECK_AUTH),
            //store.dispatch(GET_CART_COUNT_ITEMS),
            //.then(() => store.dispatch(FETCH_CART))
        ]);
        next();
    } catch (err) {
        console.log(err);
        next();
    }
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
