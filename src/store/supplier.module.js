import {SET_SUPPLIER} from "./mutations.type";
import {GET_SUPPLIER} from "./actions.type";
import {SupplierService} from "../common/api.service";

const state = {
    currentSupplier: {},
};
const getters = {
    currentSupplier(state) {
        return state.currentSupplier;
    },
};
const mutations = {
    [SET_SUPPLIER](state, supplier) {
        state.currentSupplier = supplier;
    }
};
const actions = {
    [GET_SUPPLIER](context, slug) {
        return SupplierService.get(slug)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_SUPPLIER, data);
                    return data;
                } else {
                    throw data;
                }
            })
    },
};
export default {state, getters, mutations, actions};