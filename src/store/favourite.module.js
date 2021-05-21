import {FAVOURITE_CREATE, FAVOURITE_DELETE, FETCH_FAVOURITES} from "./actions.type";
import {FavouriteService} from "../common/api.service";
import {SET_LIST_FAVOURITES} from "./mutations.type";

const state = {
    listFavourites: {data: [], total_count: 0}
}
const getters = {
    listFavourites(state) {
        return state.listFavourites || [];
    }
}
const mutations = {
    [SET_LIST_FAVOURITES](state, favourites) {
        state.listFavourites = favourites;
    }
}
const actions = {
    [FETCH_FAVOURITES](context) {
        return FavouriteService.getList()
            .then(response => {
                const {data} = response;
                context.commit(SET_LIST_FAVOURITES, data);
            })
    },

    [FAVOURITE_CREATE](context, params) {
        return FavouriteService.post(params)
            .then(response => {
                const {status, data} = response;
                if (status == "success") {
                    return data;
                } else {
                    throw data;
                }
            })
            .then(() => {
                return context.dispatch(FETCH_FAVOURITES);
            })
    },

    [FAVOURITE_DELETE](context, params) {
        return FavouriteService.delete(params)
            .then(response => {
                const {status, data} = response;
                if (status == "success") {
                    return data;
                } else {
                    throw data;
                }
            })
            .then(() => {
                return context.dispatch(FETCH_FAVOURITES);
            })
    },
}
export default {state, getters, mutations, actions}