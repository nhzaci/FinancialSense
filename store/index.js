import axios from 'axios';

export const state = () => ({
    routes: [
        { title: 'Home', icon: 'mdi-home', path: '/'},
        { title: 'Track', icon: 'mdi-trending-up', path: '/track'},
        { title: 'About', icon: 'mdi-currency-usd', path: '/about'},
        { title: 'Contact Us', icon: 'mdi-message-text', path: '/contact'}
    ],
    monthYears: [],
    years: [],
    dbArray: [],
    favourites: [],
    loadingDB: true,
})

export const mutations = {
    set_dbArray (state, db) {
        state.dbArray = db;
    },
    set_loadingDB (state, bool) {
        state.loadingDB = bool;
    },
    set_monthYears (state, monthYears) {
        state.monthYears = monthYears;
    },
    set_years (state, years) {
        state.years = years;
    }
}

export const actions = {
    async get_dbArray({ commit }) {
        //Call API to get data
        axios.get('http://localhost:3000/api/posts')
            .then(res => {
                // fill up dbArray with data
                commit('set_dbArray', res.data);
                commit('set_loadingDB', false)
            })
            .catch(err => console.log(err));
    },
    async get_monthYears({ commit }) {
        axios.get('http://localhost:3000/api/posts/date/getMonthYears')
            .then(res => {
                commit('set_monthYears', res.data)
            })
            .catch(err => console.log(err));
    },
    async get_years({ commit }) {
        axios.get('http://localhost:3000/api/posts/date/getYears')
            .then(res => {
                commit('set_years', res.data)
            })
            .catch(err => console.log(err));
    }
}