import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios";
import {BASE_URL} from "./config";
import JwtService from "./jwt.service"
import {GET_IS_LOADING} from "../store/actions.type";
import store from "../store";

export const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = BASE_URL;
        Vue.axios.defaults.headers.post['Content-Type'] = 'application/json';

        // Add a request interceptor
        Vue.axios.interceptors.request.use(async function (config) {
            // const {url} = config;
            // let listBlock = ["me/",'categories'];
            // if (listBlock.includes(url)){
            //
            // }
            // Do something before request is sent
            await store.dispatch(GET_IS_LOADING, true);
            return config;
        }, async function (error) {
            // Do something with request error
            await store.dispatch(GET_IS_LOADING, true)
            return Promise.reject(error);
        });

        Vue.axios.interceptors.response.use(async function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            await store.dispatch(GET_IS_LOADING, false)
            return response;

        }, async function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            await store.dispatch(GET_IS_LOADING, false)
            return Promise.reject(error);
        });

    },

    setHeader() {
        Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`;
    },


    query(resource, params) {
        return Vue.axios.get(`${resource}`, {params})
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[LVT] ApiService ${error}`)
            })
    },

    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[LVT] ApiService ${error}`)
            })
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[LVT] ApiService ${error}`)
            })
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[LVT] ApiService ${error}`)
            })
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[LVT] ApiService ${error}`)
            })
    },

    delete(resource, slug = "") {
        return Vue.axios.delete(`${resource}/${slug}`)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[LVT] ApiService ${error}`)
            })
    },

    remove(resource, params) {
        return Vue.axios.delete(`${resource}`, {
            data: params
        })
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[LVT] ApiService ${error}`)
            })
    }
}


export const AuthorizationService = {
    login(params) {
        return ApiService.post('login', params)
    },

    register(params) {
        return ApiService.post('register', params)
    },

    logout() {
        return ApiService.post('logout')
    },

    refresh() {
        return ApiService.post('refresh');
    },

    update(params) {
        return ApiService.put('me', params)
    },

    get() {
        return ApiService.get('me')
    }
}

export const AddressService = {
    get(slug = "") {
        let url = `addresses`;
        if (slug) {
            url += `/${slug}`
        }
        return ApiService.get(url)
    },

    getActive() {
        return ApiService.get('me/addresses/active')
    },

    store(params) {
        return ApiService.post(`addresses`, params)
    },

    update(slug, params) {
        return ApiService.put(`addresses/${slug}`, params)
    },

    delete(slug) {
        return ApiService.delete(`addresses`, slug)
    }
}

export const ProductService = {
    query(params = {}) {
        return ApiService.query('products', params)
    },
    get(id) {
        return ApiService.get('products', id)
    },

}

export const FavouriteService = {
    getList(params = {}) {
        return ApiService.query('me/favourites', params)
    },

    post(params) {
        return ApiService.post('me/favourites', params)
    },


    delete(params) {
        return ApiService.remove(`me/favourites`, params)
    }
}

export const ReviewService = {
    query(params = {}) {
        return ApiService.query('reviews', params)
    },
    get(id) {
        return ApiService.get('reviews', id)
    },

    getListWaitingForReview() {
        return ApiService.get('me/getListWaitingReview')
    },

    store(params) {
        return ApiService.post(`reviews`, params)
    },

    update(slug, params) {
        return ApiService.put(`reviews/${slug}`, params)
    },
}

export const OrderService = {
    query(params = {}) {
        return ApiService.query('me/orders', params)
    },
    get(id) {
        return ApiService.get('me/orders', id)
    },
    post(params) {
        return ApiService.post('me/orders', params)
    },
}

export const CartService = {
    query(params = {}) {
        return ApiService.query('me/carts', params)
    },
    post(params) {
        return ApiService.post('me/carts', params)
    },
    update(params) {
        return ApiService.put(`me/carts`, params)
    },

    delete(params) {
        return ApiService.remove(`me/carts`, params)
    },

    getCountItems() {
        return ApiService.get('me/carts/count')
    },
}

export const DiscountCodeService = {
    query(params = {}) {
        return ApiService.query('discounts', params)
    },
    get(id) {
        return ApiService.get('discounts', id)
    },

    getListDiscountGlobal() {
        return ApiService.get('me/cart/discounts')
    },
}

export const SupplierService = {
    get(id) {
        return ApiService.get('suppliers', id)
    },
}

export const CategoryService = {
    query(params = {}) {
        return ApiService.query('categories', params)
    },
    get(id) {
        return ApiService.get('categories', id)
    },
}


export const RecommendProductService = {
    query(params = {}) {
        return ApiService.query('recommendations', params)
    },
}

export const BrandService = {
    get(slug) {
        return ApiService.get('brands', slug)
    },
}
