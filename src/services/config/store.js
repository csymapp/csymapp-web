import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'csymapp',
  storage: window.localStorage
});

export default new Vuex.Store({

  state: {
    token: null, // can not modify a mutation
    user: {
      defaultprofilepic: '/static/images/4e14f517d239010c439617922dc13543.png',
      profilepic: null,
      defaultEmail: 'guest@cseco.co.ke',
      userdata: {}
    },
    isLoggedIn: false,
    starting: {

    },
    themes: {
      
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;

      } else {
        state.isLoggedIn = false;
      }
    },
    setUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token);
    },
    setUser ({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    getCow: (state) => (name) => {
      let cow = state.cows.find(function (obj) {
        return obj.name === name;
      });
      return cow;
    }
  },
  plugins: [vuexLocal.plugin]
});