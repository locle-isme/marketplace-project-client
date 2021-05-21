import {REMOVE_COUPON_SUPPLIER_IN_USE, SET_CART, SET_COUPON_SUPPLIER_IN_USE,} from "./mutations.type";
import {CART_ADD, CART_EDIT, FETCH_CART,} from "./actions.type";
import {CartService} from "../common/api.service";

const state = {
    cart: {suppliers: [], total_count: 0},
    global_coupons: [],
    couponSupplierInUse: [], // [{supplier_id: null, discount_code: {}}]
    couponGlobalInUse: [],
}

const getters = {
    cart(state) {
        return state.cart;
    },

    coupons(state) {
        return state.coupons;
    },

    currentCoupons(state) {
        return state.currentCoupons;
    },

    couponSupplierInUse(state) {
        return state.couponSupplierInUse;
    },

    couponGlobalInUse(state) {
        return state.couponSupplierInUse;
    }
}
const mutations = {
    [SET_CART](state, cart) {
        state.cart = cart;
    },

    [SET_COUPON_SUPPLIER_IN_USE](state, obj) {
        const {supplier_id} = obj;
        let temp = state.couponSupplierInUse.filter(c => c.supplier_id != supplier_id);
        temp.push(obj);
        state.couponSupplierInUse = temp;
    },

    [REMOVE_COUPON_SUPPLIER_IN_USE](state, obj) {
        const {supplier_id} = obj;
        let temp = state.couponSupplierInUse.filter(c => c.supplier_id != supplier_id);
        state.couponSupplierInUse = temp;
    }
}
const actions = {
    [FETCH_CART](context) {
        return CartService.query()
            .then(response => {
                const {data} = response;
                //console.log(data);
                context.commit(SET_CART, data);
            })
    },

    [CART_ADD](context, params) {
        return CartService.post(params)
            .then(response => {
                const {data, status} = response;
                if (status == 'success') {
                    return data;
                } else {
                    throw data;
                }
            })
            .then(() => {
                return context.dispatch(FETCH_CART);
            })
    },

    [CART_EDIT](context, params) {
        return CartService.update(params)
            .then(response => {
                const {data, status} = response;
                if (status == 'success') {
                    return data;
                } else {
                    throw data;
                }
            })
            .then(() => {
                return context.dispatch(FETCH_CART);
            })
    },


}

export default {state, getters, mutations, actions}