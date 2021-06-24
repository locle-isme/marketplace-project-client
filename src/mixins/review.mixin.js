import {mapGetters} from "vuex";
import {FETCH_REVIEWS, GET_LIST_WAITING_FOR_REVIEW} from "../store/actions.type";
import {HandleRedirect} from "./redirect.handle";

export const ReviewMixin = {
    mixins: [HandleRedirect],
    methods: {
        goHome() {
            this.redirect('home');
        },

        changeType(type) {
            this.$emit('update:typeSelect', type);
        },
        async loadingData() {
            let params = {user_id: this.user.id, offset: 10};
            if (params.user_id) {
                try {
                    return await Promise.all([
                        this.loadingNotReview(),
                        this.loadingReviewed()
                    ])
                } catch (e) {
                    console.log(e)
                }
            }
        },
        async loadingReviewed() {
            const {offset, user} = this;
            let params = {user_id: user.id, offset};
            await this.$store.dispatch(FETCH_REVIEWS, params)
        },

        async loadingNotReview() {
            const {offset} = this;
            await this.$store.dispatch(GET_LIST_WAITING_FOR_REVIEW, {offset})
        },

    },

    computed: {
        ...mapGetters(["user", "listWaitingForReview", "myReviews"])
    }
}