export const state = () => ({
    navDrawerOpen: false,
    routes: [
        { title: 'Home', icon: 'mdi-home', path: '/'},
        { title: 'Track', icon: 'mdi-trending-up', path: '/track'}
    ],
    expenditureArray: [
        { 
            year: 2020, 
            month: 1,
            categories: [
                { title: 'Food', amount: 50.0 },
                { title: 'Groceries', amount: 100.0 },
            ]
        },
        { 
            year: 2020, 
            month: 2, 
            categories: [
                { title: 'Food', amount: 50.0 },
                { title: 'Groceries', amount: 100.0 },
            ]
        },
        { 
            year: 2020, 
            month: 3, 
            categories: [
                { title: 'Food', amount: 50.0 },
                { title: 'Groceries', amount: 100.0 },
            ]
        }
    ]
})

export const mutations = {
    set_navDrawerOpen(state, bool) {
        state.navDrawerOpen = bool
    }
}