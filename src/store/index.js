import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import breadcrumbs from './modules/breadcrumbs'
import pages from './modules/pages'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: '3and3budget',
  storage: window.LocalStorage,
  modules: ['breadcrumbs']
})

export default new Vuex.Store({
  modules: {
    breadcrumbs,
    pages
  },
  plugins: [vuexLocal.plugin]
})