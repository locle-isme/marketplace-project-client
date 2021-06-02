import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import("../views/Home")
        },
        {
            name: 'search',
            path: '/search',
            component: () => import("../views/SearchPage")
        },
        {
            name: 'category',
            path: '/category/:slug',
            props: true,
            component: () => import("../views/CategoryDetail")
        },
        {
            name: 'product.detail',
            path: '/products/:slug',
            component: () => import("../views/ProductDetail")
        },

        {
            path: '/stores/:slug',
            component: () => import("../views/store/Store"),
            props: true,
            children: [
                {
                    path: "",
                    name: "store.global",
                    component: () => import("../views/store/StoreGlobal"),
                    props: true,
                },
                {
                    path: "category",
                    name: "store.category",
                    component: () => import("../views/store/StoreCategory"),
                    props: true,
                },
                {
                    path: "info",
                    name: "store.info",
                    component: () => import("../views/store/StoreInfo"),
                    props: true,
                }
            ]
        },
        {
            path: '/customers',
            component: () => import("../views/customers/Customer"),
            props: true,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: "edit",
                    alias: "",
                    name: "customer",
                    component: () => import("../views/customers/CustomerEdit"),
                    props: true,
                },

                {
                    path: "notification",
                    name: "customer.notification",
                    component: () => import("../views/customers/CustomerNotification"),
                    props: true,
                },

                {
                    path: "orders",
                    name: "customer.order.history",
                    component: () => import("../views/customers/CustomerOrderHistory"),
                    props: true,
                },

                {
                    path: "orders/:orderID",
                    name: "customer.order.detail",
                    component: () => import("../views/customers/CustomerOrderDetail"),
                    props: true,
                },


                {
                    path: "address",
                    name: "customer.address",
                    component: () => import("../views/customers/address/CustomerAddress"),
                    props: true,
                },

                {
                    path: "address/create",
                    name: "customer.address.create",
                    component: () => import("../views/customers/address/CustomerAddressCreate"),
                    props: true,
                },

                {
                    path: "address/edit/:addressID",
                    name: "customer.address.edit",
                    component: () => import("../views/customers/address/CustomerAddressEdit"),
                    props: true,
                },

                {
                    path: "reviews",
                    name: "customer.review",
                    component: () => import("../views/customers/CustomerReview"),
                    props: true,
                },

                {
                    path: "favourites",
                    name: "customer.favourite",
                    component: () => import("../views/customers/CustomerFavourite"),
                    props: true,
                },

            ]

        },

        {
            name: 'checkout.cart',
            path: '/checkout/cart',
            meta: {
                requiresAuth: true
            },
            component: () => import("../views/Cart")
        },

        {
            name: 'checkout.payment',
            path: '/checkout/payment',
            meta: {
                requiresAuth: true
            },
            component: () => import("../views/Payment")
        },

    ],

    scrollBehavior() {
        return {x: 0, y: 0}
    }

})