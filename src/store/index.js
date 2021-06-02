import Vue from 'vue';
import Vuex from "vuex";

import auth from './auth.module'
import address from './address.module'
import product from './product.module'
import favourite from './favourite.module'
import review from './review.module'
import order from './order.module'
import cart from './cart.module'
import supplier from './supplier.module'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        auth,
        address,
        product,
        favourite,
        review,
        order,
        cart,
        supplier,
    }
})