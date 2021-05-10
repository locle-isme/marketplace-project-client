import {ProductService} from "../common/api.service";
import {FETCH_PRODUCTS, GET_PRODUCT} from "./actions.type";
import {SET_LIST_PRODUCTS, SET_PRODUCT} from "./mutations.type";

const state = {
    currentProduct: {images: []},
    listProducts: {products: [], count: 0},
};
const getters = {
    currentProduct(state) {
        return state.currentProduct;
    },
    listProducts(state) {
        return state.listProducts || {products: [], count: 0};
    }

};
const mutations = {
    [SET_PRODUCT](state, product) {
        state.currentProduct = product;
    },
    [SET_LIST_PRODUCTS](state, list) {
        state.listProducts = list;
    }
};
const actions = {
    [FETCH_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_LIST_PRODUCTS, data);
                    return data;
                } else {
                    throw data;
                }
            })
    },
    [GET_PRODUCT](context, id) {
        return ProductService.get(id)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_PRODUCT, data);
                    return data;
                } else {
                    throw data;
                }
            })
    }
};
export default {state, getters, mutations, actions}