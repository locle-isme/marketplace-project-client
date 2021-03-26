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
            path: '/product/:slug',
            component: () => import("@/views/ProductDetailPage")
        },

        {
            path: '/store/:slug',
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
        },

        {
            name: 'checkout.cart',
            path: '/checkout/cart',
            component: () => import("@/views/Cart")
        },

    ]
})