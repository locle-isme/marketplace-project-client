import JwtService from '../common/jwt.service';
import {AuthorizationService, ApiService} from '../common/api.service';
import {LOGIN, LOGOUT, REGISTER, GET_USER, UPDATE_USER, CHECK_AUTH} from "./actions.type";
import {SET_AUTH, SET_PURE, SET_ERRORS} from "./mutations.type";

const state = {
    user: {},
    errors: {},
    isAuthenticated: !!JwtService.getToken()
}
const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated || false;
    },

    user(state) {
        return state.user || {};
    },

    errors(state) {
        return state.errors || {};
    }
}
const mutations = {
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
    },

    [SET_ERRORS](state, errors) {
        state.errors = errors;
    },

    [SET_PURE](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        JwtService.destroyToken();
    }
}
const actions = {
    [LOGIN](context, params) {
        return AuthorizationService.login(params)
            .then((response) => {
                const {status, message, data} = response;
                if (status == "success") {
                    JwtService.saveToken(data.access_token);
                    ApiService.setHeader();
                    return context.dispatch(GET_USER);
                } else {
                    context.commit(SET_ERRORS, [message])
                    throw message;
                }
            })
            .then((response) => {
                const {data} = response;
                context.commit(SET_AUTH, data);
                return data;
            })
    },


    [CHECK_AUTH](context) {
        if (context.getters.isAuthenticated) {
            ApiService.setHeader();
            context.dispatch(GET_USER)
                .then((response) => {
                    const {data} = response;
                    //console.log(response);
                    context.commit(SET_AUTH, data);
                })
                .catch(() => {
                    context.commit(SET_PURE);
                })
        }
    },

    [GET_USER]() {
        return AuthorizationService.get();
    },

    [LOGOUT](context) {
        return AuthorizationService.logout()
            .then((response) => {
                //console.log(response);
                context.commit(SET_PURE);
                return response;
            });
    },

    [REGISTER](context, payload) {
        return AuthorizationService.register(payload)
            .then((response) => {
                const {status, data} = response;
                if (status == "error") {
                    context.commit(SET_ERRORS, data);
                    throw data;
                } else {
                    return data;
                }
            });
    },

    [UPDATE_USER](context, user) {
        return AuthorizationService.update(user)
            .then((response) => {
                const {status, data} = response;
                if (status == "error") {
                    context.commit(SET_ERRORS, data);
                    throw data;
                } else {
                    context.commit(SET_AUTH, data);
                    return data;
                }
            });
    }


}

export default {
    state,
    getters,
    mutations,
    actions,
}