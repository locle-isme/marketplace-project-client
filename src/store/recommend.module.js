import {FETCH_RECOMMEND_PRODUCTS} from "./actions.type";
import {RecommendProductService} from "../common/api.service";
import {SET_LIST_RECOMMEND_PRODUCTS} from "./mutations.type";

const state = {
    recommendProducts: [],
};
const getters = {
    recommendProducts(state) {
        return state.recommendProducts;
    }
};
const mutations = {
    [SET_LIST_RECOMMEND_PRODUCTS](state, _products) {
        return state.recommendProducts = _products;
    }
};
const actions = {
    [FETCH_RECOMMEND_PRODUCTS](context) {
        return RecommendProductService.query()
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_LIST_RECOMMEND_PRODUCTS, data);
                    return data;
                } else {
                    throw data;
                }
            })
    }
};
export default {state, getters, mutations, actions};