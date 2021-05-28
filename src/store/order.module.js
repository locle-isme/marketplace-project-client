import {FETCH_ORDERS, GET_ORDER, ORDER_CREATE} from "./actions.type";
import {OrderService} from "../common/api.service";
import {SET_LIST_ORDERS, SET_ORDER} from "./mutations.type";

const state = {
    orders: {data: [], total_count: 0},
    currentOrder: {items: []}
};
const getters = {
    orders(state) {
        return state.orders;
    },

    currentOrder(state) {
        return state.currentOrder;
    }
};
const mutations = {
    [SET_LIST_ORDERS](state, orders) {
        state.orders = orders;
    },
    [SET_ORDER](state, order) {
        state.currentOrder = order;
    }
};
const actions = {
    [FETCH_ORDERS](context) {
        return OrderService.query()
            .then(response => {
                const {data} = response;
                context.commit(SET_LIST_ORDERS, data);
            })
    },

    [GET_ORDER](context, orderID) {
        return OrderService.get(orderID)
            .then(response => {
                const {data} = response;
                context.commit(SET_ORDER, data);
            })
    },

    [ORDER_CREATE](context, formData) {
        return OrderService.post(formData)
            .then(response => {
                const {data, status} = response;
                if (status == "success") {
                    return data;
                } else {
                    throw data;
                }
            })
    },
};
export default {state, getters, mutations, actions}