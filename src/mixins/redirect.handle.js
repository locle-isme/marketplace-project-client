export const HandleRedirect = {
    methods: {
        redirect(_name, params = {}, query = {}) {
            this.$router.push({name: _name, params: params, query}).then(() => {
                this.statusShowNavBar = false;
            }).catch(() => {

            });
        },
    }
}