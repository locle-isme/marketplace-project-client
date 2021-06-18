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
import recommend from './recommend.module'
import brand from './brand.module'
import loading from './loading.module'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        address,
        product,
        favourite,
        review,
        order,
        cart,
        supplier,
        category,
        recommend,
        brand,
        loading,
    }
});
export default store