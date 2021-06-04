import {FETCH_SUPPLIER_CATEGORIES, FETCH_SUPPLIER_CATEGORY_CHILDS, GET_CURRENT_CATEGORY} from "./actions.type";
import {CategoryService} from "../common/api.service";
import {SET_CURRENT_CATEGORY, SET_SUPPLIER_CATEGORIES, SET_SUPPLIER_CATEGORY_CHILDS} from "./mutations.type";


const state = {
    currentCategory: {childs: []},
    supplierCategories: [],
    supplierCategoryChilds: [],
};
const getters = {
    currentCategory(state) {
        return state.currentCategory;
    },
    supplierCategories(state) {
        return state.supplierCategories;
    },

    supplierCategoryChilds(state) {
        return state.supplierCategoryChilds;
    }
};
const mutations = {
    [SET_CURRENT_CATEGORY](state, category) {
        state.currentCategory = category;
    },
    [SET_SUPPLIER_CATEGORIES](state, categories) {
        state.supplierCategories = categories;
    },

    [SET_SUPPLIER_CATEGORY_CHILDS](state, categories) {
        state.supplierCategoryChilds = categories;
    },

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
    },

    [FETCH_SUPPLIER_CATEGORIES](context, query) {
        return CategoryService.query(query)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_SUPPLIER_CATEGORIES, data);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [FETCH_SUPPLIER_CATEGORY_CHILDS](context, query) {
        return CategoryService.query(query)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_SUPPLIER_CATEGORY_CHILDS, data);
                    return data;
                } else {
                    throw data;
                }
            })
    }
};
export default {state, getters, mutations, actions};