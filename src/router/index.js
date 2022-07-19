import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewPage from '../views/ViewPage.vue'
import ManagePages from '../views/ManagePages.vue'
import ManageSources from '../views/ManageSources.vue'
import ManageWidgets from '../views/ManageWidgets.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/page/:pageId',
    component: ViewPage
  },
  {
    path: '/manage-pages',
    component: ManagePages
  },
  {
    path: '/page/:pageId/manage-sources',
    component: ManageSources
  },
  {
    path: '/page/:pageId/manage-widgets',
    components: ManageWidgets
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
