import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { PER_PAGE } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [],
    display: [],
    rows: 0,
    loading: false
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    SET_ROWS(state, rows) {
      state.rows = rows
    },
    SET_DISPLAY(state, display) {
      state.display = display
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    async fetchData({ commit }) {
      commit("SET_LOADING", true)
      return new Promise(resolve => {
        axios
          .get(
            "https://raw.githubusercontent.com/cristiroma/countries/master/data/json/countries.json"
          ).then(res => {

            setTimeout(async () => {
              resolve(res.data);
              commit("SET_LOADING", false)
            }, 1000);

          })
          .catch(err => console.log(err));
      });
    },
    async fetchCountries({ dispatch, commit }, { perPage }) {
      const countries = await dispatch("fetchData");
      commit("SET_COUNTRIES", countries);
      commit("SET_ROWS", countries.length);
      commit("SET_DISPLAY", countries.slice(0, perPage));
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;
      commit("SET_DISPLAY", state.countries.slice(start, end));
    },
    async updatePagination({ dispatch, commit }, { countries, currentPage, perPage }) {
      commit("SET_COUNTRIES", countries);
      commit("SET_ROWS", countries.length);
      dispatch("paginate", { currentPage, perPage });
    },
    async search({ dispatch }, { text }) {
      const countries = await dispatch("fetchData");
      const values = countries.filter(item => {
        return item.name.toLowerCase().includes(text.toLowerCase())
      });
      dispatch("updatePagination", { countries: values, currentPage: 1, perPage: PER_PAGE });
    }
  },
  getters: {
    rows(state) {
      return state.rows
    },
    countries(state) {
      return state.countries
    },
    display(state) {
      return state.display
    },
    loading(state) {
      return state.loading
    }
  },
  modules: {
  }
})
