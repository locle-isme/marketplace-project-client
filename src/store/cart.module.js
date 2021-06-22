import {
    REMOVE_COUPON_GLOBAL_IN_USE,
    REMOVE_COUPON_SUPPLIER_IN_USE,
    SET_CART, SET_CART_COUNT_ITEMS,
    SET_COUPON_GLOBAL, SET_COUPON_GLOBAL_IN_USE,
    SET_COUPON_SUPPLIER_IN_USE,
} from "./mutations.type";
import {
    CART_ADD,
    CART_EDIT, CART_REMOVE,
    FETCH_CART,
    GET_CART_COUNT_ITEMS,
    GET_LIST_DISCOUNT_CODE_GLOBAL,
} from "./actions.type";
import {CartService, DiscountCodeService} from "../common/api.service";

const state = {
    countItems: 0,
    cart: {suppliers: [], total_count: 0},
    globalCoupons: {data: []},
    couponSupplierInUse: [], // [{supplier_id: null, discount_code: {}}]
    couponGlobalInUse: ""
}

const getters = {
    cart(state) {
        return state.cart;
    },

    countItems(state) {
        return state.countItems || 0;
    },

    globalCoupons() {
        return state.globalCoupons || {data: []};
    },

    couponSupplierInUse(state) {
        return state.couponSupplierInUse || [];
    },

    couponGlobalInUse(state) {
        return state.couponGlobalInUse || "";
    }
}
const mutations = {
    [SET_CART](state, cart) {
        state.cart = cart;
    },

    [SET_CART_COUNT_ITEMS](state, data) {
        const {total_count} = data;
        state.countItems = total_count;
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
    },
    [SET_COUPON_GLOBAL](state, list) {
        state.globalCoupons = list;
    },

    [SET_COUPON_GLOBAL_IN_USE](state, code) {
        state.couponGlobalInUse = code;
    },

    [REMOVE_COUPON_GLOBAL_IN_USE](state) {
        state.couponGlobalInUse = "";
    },
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

    [GET_CART_COUNT_ITEMS](context) {
        return CartService.getCountItems()
            .then(response => {
                const {status, data} = response;
                if (status == 'success') {
                    context.commit(SET_CART_COUNT_ITEMS, data);
                    return data;
                } else {
                    context.commit(SET_CART_COUNT_ITEMS, {total_count: 0});
                    throw data;
                }
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
    },

    [CART_REMOVE](context, params) {
        return CartService.delete(params)
            .then(response => {
                const {data, status} = response;
                if (status == 'success') {
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [GET_LIST_DISCOUNT_CODE_GLOBAL](context) {
        if (context.getters.isAuthenticated) {
            DiscountCodeService.getListDiscountGlobal()
                .then(response => {
                    const {data, status} = response;
                    if (status == 'success') {
                        context.commit(SET_COUPON_GLOBAL, data);
                        return data;
                    } else {
                        throw data;
                    }
                })
        }
    },


}

export default {state, getters, mutations, actions}