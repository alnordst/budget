import Vue from 'vue'
import Vuex from 'vuex'
import breadcrumbs from './modules/breadcrumbs'
import pages from './modules/pages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    breadcrumbs,
    pages
  }
})
