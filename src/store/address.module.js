import {AddressService} from "../common/api.service";
import {SET_ADDRESSES, SET_ADDRESS_ERRORS, SET_DEFAULT_ADDRESS} from "./mutations.type";
import {ADDRESS_CREATE, ADDRESS_DEFAULT_GET, ADDRESS_DELETE, ADDRESS_EDIT, FETCH_ADDRESSES} from "./actions.type";


const state = {
    listAddresses: [],
    defaultAddress: {},
    addressErrors: {}
}

const getters = {

    listAddresses(state) {
        return state.listAddresses || [];
    },
    defaultAddress(state) {
        return state.defaultAddress || {};
    },

    addressErrors(state) {
        return state.addressErrors || {};
    }

}
const mutations = {
    [SET_ADDRESSES](state, listAddresses) {
        state.listAddresses = listAddresses;
        state.defaultAddress = listAddresses.find(t => t.active == 1);
        state.addressErrors = {};
    },

    [SET_DEFAULT_ADDRESS](state, address) {
        state.defaultAddress = address;
    },

    [SET_ADDRESS_ERRORS](state, errors) {
        state.addressErrors = errors;
    },


}
const actions = {
    [FETCH_ADDRESSES](context, id = "") {
        return AddressService.get(id)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    if (!id) context.commit(SET_ADDRESSES, data);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [ADDRESS_DEFAULT_GET](context) {
        return AddressService.getActive()
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_DEFAULT_ADDRESS, data);
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [ADDRESS_CREATE](context, address) {
        return AddressService.store(address)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    return data;
                } else {
                    context.commit(SET_ADDRESS_ERRORS, data);
                    throw data;
                }
            })

    },

    [ADDRESS_EDIT](context, address) {
        return AddressService.update(address.id, address)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    return data;
                } else {
                    context.commit(SET_ADDRESS_ERRORS, data);
                    throw data;
                }
            })

    },

    [ADDRESS_DELETE](context, id) {
        return AddressService.delete(id)
            .then((response) => {
                const {status, data} = response;
                if (status == "success") {
                    return data;
                } else {
                    context.commit(SET_ADDRESS_ERRORS, data);
                    throw data;
                }
            })
            .then(() => {
                return context.dispatch(FETCH_ADDRESSES)
            })

    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}