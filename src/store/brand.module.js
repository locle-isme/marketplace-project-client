import {GET_CURRENT_BRAND} from "./actions.type";
import {BrandService} from "../common/api.service";
import {SET_CURRENT_BRAND} from "./mutations.type";

const state = {
    currentBrand: {},
};
const getters = {
    currentBrand(state) {
        return state.currentBrand || {};
    }
};
const mutations = {
    [SET_CURRENT_BRAND](state, brand) {
        state.currentBrand = brand;
    },
};
const actions = {
    [GET_CURRENT_BRAND](context, slug) {
        return BrandService.get(slug)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_CURRENT_BRAND, data);
                    return data;
                } else {
                    throw data;
                }
            })
    }
};
export default {state, getters, mutations, actions};