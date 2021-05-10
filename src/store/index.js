import Vue from 'vue';
import Vuex from "vuex";

import auth from './auth.module'
import address from './address.module'
import product from './product.module'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        auth,
        address,
        product
    }
})