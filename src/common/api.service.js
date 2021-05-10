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
        return Vue.axios.get(`${resource}`, {params}).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },

    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },

    delete(resource, slug = "") {
        return Vue.axios.delete(`${resource}/${slug}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },
}


export const AuthorizationService = {
    login(params) {
        return ApiService.post('login', params)
            .then(({data}) => data);
    },

    register(params) {
        return ApiService.post('register', params)
            .then(({data}) => data);
    },

    logout() {
        return ApiService.post('logout')
            .then(({data}) => data);
    },

    refresh() {
        return ApiService.post('refresh');
    },

    update(params) {
        return ApiService.put('me', params)
            .then(({data}) => data);
    },

    get() {
        return ApiService.get('me')
            .then(({data}) => data);
    }
}

export const AddressService = {
    get(slug = "") {
        let url = `addresses`;
        if (slug) {
            url += `/${slug}`
        }
        return ApiService.get(url)
            .then(({data}) => data);
    },

    store(params) {
        return ApiService.post(`addresses`, params)
            .then(({data}) => data);
    },

    update(slug, params) {
        return ApiService.put(`addresses/${slug}`, params)
            .then(({data}) => data);
    },

    delete(slug) {
        return ApiService.delete(`addresses`, slug)
            .then(({data}) => data);
    }
}

export const ProductService = {
    query(params = {}) {
        return ApiService.query('products', params)
            .then(({data}) => data);
    },
    get(id) {
        return ApiService.get('products', id)
            .then(({data}) => data);
    },

    getList(params = {}) {
        return ApiService.query('products', params)
            .then(({data}) => data);
    }
}