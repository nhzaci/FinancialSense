export const state = () => ({
    navDrawerOpen: false,
    routes: [
        { title: 'Home', icon: 'mdi-home', path: '/'},
        { title: 'Tracking', icon: 'mdi-trending-up', path: '/trending'}
    ]
})

export const mutations = {
    set_navDrawerOpen(state, bool) {
        state.navDrawerOpen = bool
    }
}