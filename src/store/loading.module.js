import {SET_IS_LOADING} from "./mutations.type";
import {GET_IS_LOADING} from "./actions.type";

const state = {
    isLoading: false,
};
const getters = {
    isLoading(state) {
        return state.isLoading;
    }
};
const mutations = {
    [SET_IS_LOADING](state, status) {
        state.isLoading = status;
    }
};
const actions = {
    [GET_IS_LOADING](context, status) {
       return new Promise((resolve) => {
           context.commit(SET_IS_LOADING, status);
           resolve(true);
       })
    }
};

export default {state, getters, mutations, actions}