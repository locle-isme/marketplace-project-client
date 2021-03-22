import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import("@/views/Home")
        },
        {
            name: 'search',
            path: '/search',
            component: () => import("@/views/SearchPage")
        },
        {
            name: 'product.detail',
            path: '/product/:slug_product_detail',
            component: () => import("@/views/ProductDetailPage")
        },

        {
            path: '/store/:slug_store',
            component: () => import("@/views/Store"),
            props: true,
            children: [
                {
                    path: "",
                    name: "store.global",
                    component: () => import("@/views/StoreGlobal"),
                    props: true,
                },
                {
                    path: "category",
                    name: "store.category",
                    component: () => import("@/views/StoreCategory"),
                    props: true,
                },
                {
                    path: "info",
                    name: "store.info",
                    component: () => import("@/views/StoreInfo"),
                    props: true,
                }
            ]
        }
    ]
})