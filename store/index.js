import axios from 'axios';

export const state = () => ({
    months: ['January','Feburary','March','April','May','June','July','August','September','October','November','December'],
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
    loadingYears: true,
    loadingMonthYears: true,
    addModalOpen: false
})

export const mutations = {
    set_dbArray (state, db) {
        state.dbArray = db;
    },
    set_loadingDB (state, bool) {
        state.loadingDB = bool;
    },
    set_loadingMonthYears (state, bool) {
        state.loadingMonthYears = bool;
    },
    set_loadingYears (state, bool) {
        state.loadingYears = bool;
    },
    set_monthYears (state, monthYears) {
        state.monthYears = monthYears;
    },
    set_years (state, years) {
        state.years = years;
    },
    set_addModalOpen (state, bool) {
        state.addModalOpen = bool;
    }
}

export const actions = {
    async get_dbArray({ commit }) {
        //Call API to get data
        axios.get('http://localhost:3000/api/posts')
            .then(res => {
                // fill up dbArray with data
                commit('set_dbArray', res.data);
                commit('set_loadingDB', false);
            })
            .catch(err => console.log(err));
    },
    async get_monthYears({ commit }) {
        axios.get('http://localhost:3000/api/posts/date/getMonthYears')
            .then(res => {
                commit('set_monthYears', res.data);
                commit('set_loadingMonthYears', false);
            })
            .catch(err => console.log(err));
    },
    async get_years({ commit }) {
        axios.get('http://localhost:3000/api/posts/date/getYears')
            .then(res => {
                commit('set_years', res.data);
                commit('set_loadingYears', false);
            })
            .catch(err => console.log(err));
    }
}