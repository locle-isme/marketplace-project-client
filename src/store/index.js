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
import category from './category.module'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        auth,
        address,
        product,
        favourite,
        review,
        order,
        cart,
        supplier,
        category,
    }
});
export default store