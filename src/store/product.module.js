import {ProductService} from "../common/api.service";
import {
    FETCH_BRAND_PRODUCTS,
    FETCH_CATEGORY_PRODUCTS, FETCH_HOME_PRODUCTS,
    FETCH_PRODUCTS, FETCH_RELATE_CATEGORY_PRODUCTS, FETCH_SUPPLIER_HOME_PRODUCTS,
    FETCH_SUPPLIER_PRODUCTS,
    GET_PRODUCT
} from "./actions.type";

import {
    SET_BRAND_PRODUCTS,
    SET_CATEGORY_PRODUCTS, SET_HOME_PRODUCTS,
    SET_LIST_FILTERS,
    SET_LIST_PRODUCTS,
    SET_PRODUCT, SET_RELATE_CATEGORY_PRODUCTS, SET_SUPPLIER_HOME_PRODUCTS,
    SET_SUPPLIER_PRODUCTS
} from "./mutations.type";

const state = {
    currentProduct: {images: []},
    products: {data: [], total_count: 0},
    supplierProducts: {data: [], total_count: 0},
    supplierHomeProducts: {data: [], total_count: 0},
    categoryProducts: {data: [], total_count: 0},
    brandProducts: {data: [], total_count: 0},
    homeProducts: {data: [], total_count: 0},
    relateCategoryProducts: {data: [], total_count: 0},
    filters: {
        brands: {data: [], total_count: 0},
        suppliers: {data: [], total_count: 0},
        sort_settings: {data: [], total_count: 0}
    }
};
const getters = {
    currentProduct(state) {
        return state.currentProduct;
    },
    products(state) {
        return state.products || {data: [], total_count: 0};
    },

    supplierProducts(state) {
        return state.supplierProducts;
    },

    supplierHomeProducts(state) {
        return state.supplierHomeProducts;
    },

    categoryProducts(state) {
        return state.categoryProducts;
    },

    brandProducts(state) {
        return state.brandProducts;
    },

    homeProducts(state) {
        return state.homeProducts;
    },

    relateCategoryProducts(state) {
        return state.relateCategoryProducts;
    },

    filters(state) {
        return state.filters || {
            brands: {data: [], total_count: 0},
            suppliers: {data: [], total_count: 0},
            sort_settings: {data: [], total_count: 0}
        };
    }
};


const mutations = {
    [SET_PRODUCT](state, product) {
        state.currentProduct = product;
    },

    [SET_LIST_PRODUCTS](state, list) {
        state.products = list;
    },

    [SET_LIST_FILTERS](state, list) {
        state.filters = list;
    },

    [SET_SUPPLIER_PRODUCTS](state, list) {
        state.supplierProducts = list;
    },

    [SET_SUPPLIER_HOME_PRODUCTS](state, list) {
        state.supplierHomeProducts = list;
    },

    [SET_CATEGORY_PRODUCTS](state, list) {
        state.categoryProducts = list;
    },

    [SET_BRAND_PRODUCTS](state, list) {
        state.brandProducts = list;
    },

    [SET_HOME_PRODUCTS](state, list) {
        state.homeProducts = list;
    },

    [SET_RELATE_CATEGORY_PRODUCTS](state, list) {
        state.relateCategoryProducts = list;
    },
};
const actions = {
    [FETCH_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    const {products, filters} = data;
                    context.commit(SET_LIST_PRODUCTS, products);
                    context.commit(SET_LIST_FILTERS, filters);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [FETCH_SUPPLIER_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    const {products, filters} = data;
                    context.commit(SET_SUPPLIER_PRODUCTS, products);
                    context.commit(SET_LIST_FILTERS, filters);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [FETCH_SUPPLIER_HOME_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    const {products, filters} = data;
                    context.commit(SET_SUPPLIER_HOME_PRODUCTS, products);
                    context.commit(SET_LIST_FILTERS, filters);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [FETCH_CATEGORY_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    const {products, filters} = data;
                    context.commit(SET_CATEGORY_PRODUCTS, products);
                    context.commit(SET_LIST_FILTERS, filters);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [FETCH_BRAND_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    const {products, filters} = data;
                    context.commit(SET_BRAND_PRODUCTS, products);
                    context.commit(SET_LIST_FILTERS, filters);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [FETCH_HOME_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    const {products} = data;
                    context.commit(SET_HOME_PRODUCTS, products);
                    //context.commit(SET_LIST_FILTERS, filters);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [FETCH_RELATE_CATEGORY_PRODUCTS](context, params) {
        return ProductService.query(params)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    const {products} = data;
                    context.commit(SET_RELATE_CATEGORY_PRODUCTS, products);
                    //context.commit(SET_LIST_FILTERS, filters);
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
    },

};
export default {state, getters, mutations, actions}