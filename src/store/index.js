import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [],
    display: [],
    rows: 0
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
    }
  },
  actions: {
    async fetchData() {
      return new Promise(resolve => {
        axios
          .get(
            "https://raw.githubusercontent.com/cristiroma/countries/master/data/json/countries.json"
          ).then(res => {
            resolve(res.data);
          })
          .catch(err => console.log(err));
      });
    },
    async fetchCountries({ dispatch, commit }) {
      const countries = await dispatch("fetchData");
      commit("SET_COUNTRIES", countries);
      commit("SET_ROWS", countries.length);
      commit("SET_DISPLAY", countries.slice(0, 10));
      // dispatch("updatePagination", { myJson, currentPage: 1, perPage: 3 });
      // return myJson;
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
    async search({ dispatch}, { text }) {
      const countries = await dispatch("fetchData");
      const values = countries.filter(item => {
        return item.name.toLowerCase().includes(text.toLowerCase())
      });
      dispatch("updatePagination", { countries: values, currentPage: 1, perPage: 10 });
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
    }
  },
  modules: {
  }
})
