import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios";
import {BASE_URL} from "./config";
import JwtService from "./jwt.service"

export const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = BASE_URL;
        Vue.axios.defaults.headers.post['Content-Type'] = 'application/json';
    },

    setHeader() {
        Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`;
    },


    query(resource, params) {
        return Vue.axios.get(`${resource}`, {params})
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[RWV] ApiService ${error}`)
            })
    },

    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[RWV] ApiService ${error}`)
            })
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[RWV] ApiService ${error}`)
            })
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[RWV] ApiService ${error}`)
            })
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[RWV] ApiService ${error}`)
            })
    },

    delete(resource, slug = "") {
        return Vue.axios.delete(`${resource}/${slug}`)
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[RWV] ApiService ${error}`)
            })
    },

    remove(resource, params) {
        return Vue.axios.delete(`${resource}`, {
            data: params
        })
            .then(({data}) => data)
            .catch((error) => {
                throw new Error(`[RWV] ApiService ${error}`)
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
    }
}

