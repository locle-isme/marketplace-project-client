export const HandleRedirect = {
    methods: {
        redirect(_name, params = {}) {
            this.$router.push({name: _name, params: params}).then(() => {
                this.statusShowNavBar = false;
            }).catch(() => {

            });
        },
    }
}