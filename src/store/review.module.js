import {SET_CURRENT_REVIEW, SET_LIST_REVIEWS, SET_LIST_WAITING_FOR_REVIEW, SET_MY_REVIEWS} from "./mutations.type";
import {FETCH_REVIEWS, GET_LIST_WAITING_FOR_REVIEW, REVIEW_CREATE, REVIEW_EDIT} from "./actions.type";
import {ReviewService} from "../common/api.service";

const state = {
    listReviews: [],
    listWaitingForReview: [],
    myReviews: [],
    currentReview: []
}
const getters = {
    listReviews(state) {
        return state.listReviews;
    },

    listWaitingForReview(state) {
        return state.listWaitingForReview;
    },

    myReviews(state) {
        return state.myReviews;
    },

    currentReview(state) {
        return state.currentReview;
    },
}
const mutations = {
    [SET_LIST_REVIEWS](state, data) {
        state.listReviews = data;
    },
    [SET_MY_REVIEWS](state, data) {
        state.myReviews = data;
    },
    [SET_LIST_WAITING_FOR_REVIEW](state, data) {
        state.listWaitingForReview = data;
    },
    [SET_CURRENT_REVIEW](state, review) {
        state.currentReview = review;
    },


}
const actions = {
    [FETCH_REVIEWS](context, params = {}) {
        return ReviewService.query(params)
            .then(response => {
                const {data} = response;
                if (!params.user_id) {
                    context.commit(SET_LIST_REVIEWS, data);
                } else {
                    context.commit(SET_MY_REVIEWS, data);
                }

                return data;
            })
    },

    [GET_LIST_WAITING_FOR_REVIEW](context, params = {}) {
        return ReviewService.getListWaitingForReview(params)
            .then(response => {
                const {status, data} = response;
                if (status == "success") {
                    context.commit(SET_LIST_WAITING_FOR_REVIEW, data);
                    return data;
                } else {
                    throw data;
                }
            })

    },

    [REVIEW_CREATE](context, params) {
        return ReviewService.store(params)
            .then(response => {
                const {status, data} = response;
                if (status == "success") {
                    return data;
                } else {
                    throw data;
                }
            })
    },

    [REVIEW_EDIT](context, review) {
        return ReviewService.update(review.id, review)
            .then(response => {
                const {status, data} = response;
                if (status == "success") {
                    return data;
                } else {
                    throw data;
                }
            })
    }

}
export default {state, getters, mutations, actions}