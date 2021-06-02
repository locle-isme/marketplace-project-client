import {GET_CURRENT_CATEGORY} from "./actions.type";
import {CategoryService} from "../common/api.service";
import {SET_CURRENT_CATEGORY} from "./mutations.type";


const state = {
    currentCategory: {childs: []},
};
const getters = {
    currentCategory(state) {
        return state.currentCategory;
    }
};
const mutations = {
    [SET_CURRENT_CATEGORY](state, category) {
        state.currentCategory = category;
    }
};
const actions = {
    [GET_CURRENT_CATEGORY](context, slug) {
        return CategoryService.get(slug)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_CURRENT_CATEGORY, data);
                    return data;
                } else {
                    throw data;
                }
            })
    }
};
export default {state, getters, mutations, actions};