import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist'

import tables from "./modules/base/tables";
import toolbar from "./modules/base/toolbar";
import users from "./modules/users";

const vuexPersist = new VuexPersist({
  key: 'myWMS',
  storage: window.sessionStorage
})

const defaultState = () => {
  return {
    users: {
      user: [],
    },
    alert: false,
    message: {
      text: "",
      type: "",
      status: "",
    },
  };
};

Vue.use(Vuex);
const store = () =>
  new Vuex.Store({
    state: {
      currentInterface: 0, // inicia pela ui do mywms
      loggedIn: false,
      alert: null,
      loading: null,
      message: {
        text: "",
        type: "",
        status: "",
      },
    },

    modules: {
      tables,
      toolbar,
      users,
    },

    plugins: [vuexPersist.plugin], //Persiste valor do state 'session storage'

    getters: {
      getObjectText: (state) => {
        return state.message;
      },
      getLoggedIn(state) {
        return state.loggedIn;
      },

      isAuthenticated(state) {
        return state.loggedIn;
      },

      getCurrentInterface: (state) => {
        return state.currentInterface;
      },

      /*    todo pega usuário atual
            loggedInUser(state) {
              return state.auth.user
            },*/

      isDarkTheme() {
        return this.$vuetify.theme.dark === true;
      }
    },

    mutations: {
      setLoggedIn: (state, newValue) => {
        state.loggedIn = newValue
      },
      setCurrentInterface: (state, newValue) => {
        state.currentInterface = newValue
      },

      CLEAR_STORE(state) {
        Object.assign(state, defaultState());
      },
    },

    actions: {
      loggedIn({commit}, value) {
        commit("setLoggedIn", value);
      },
      currentInterface({commit}, value) {
        commit("setCurrentInterface", value);
      },
      
      clearStore({commit}) {
        commit("CLEAR_STORE");
      },
    },

  });

export default store;
