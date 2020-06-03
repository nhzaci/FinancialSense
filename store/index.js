import axios from 'axios';
const apiURL = 'http://localhost:3000/api';

export const state = () => ({
    months: ['January','Feburary','March','April','May','June','July','August','September','October','November','December'],
    shortMonths: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
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
    balance: 0,
    expense: 0,
    income: 0,
    navOverlay: false
})

export const mutations = {
    set_dbArray (state, db) {
        state.dbArray = db;
    },
    append_dbArray (state, item) {
        state.dbArray.push(item);
    },
    set_loadingDB (state, bool) {
        state.loadingDB = bool;
    },
    set_navOverlay (state, bool) {
        state.navOverlay = bool;
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
    set_income(state, val) {
        state.income = val;
    },
    set_balance(state, val) {
        state.balance = val;
    },
    set_expense(state, val) {
        state.expense = val;
    },
}

export const actions = {
    async get_dbArray({ commit }) {
        //Call API to get data
        axios.get(apiURL + '/posts')
            .then(res => {
                // fill up dbArray with data
                commit('set_dbArray', res.data);
                commit('set_loadingDB', false);
            })
            .catch(err => console.log(err));
    },
    async get_monthYears({ commit }) {
        axios.get(apiURL + '/posts/date/getMonthYears')
            .then(res => {
                commit('set_monthYears', res.data);
                commit('set_loadingMonthYears', false);
            })
            .catch(err => console.log(err));
    },
    async get_years({ commit }) {
        axios.get(apiURL + 'posts/date/getYears')
            .then(res => {
                commit('set_years', res.data);
                commit('set_loadingYears', false);
            })
            .catch(err => console.log(err));
    },
    async get_balance({ commit }) {
        axios.get(apiURL + '/posts/sum/balance')
            .then(res => commit('set_balance', Math.round(res.data*100) / 100))
            .catch(err => console.log(err));
    },
    async get_income({ commit }) {
        axios.get(apiURL + '/posts/sum/income')
            .then(res => commit('set_income', Math.round(res.data*100) / 100))
            .catch(err => console.log(err));
    },
    async get_expense({ commit }) {
        axios.get(apiURL + '/posts/sum/expense')
            .then(res => commit('set_expense', Math.round(res.data*100) / 100))
            .catch(err => console.log(err));
    }
}