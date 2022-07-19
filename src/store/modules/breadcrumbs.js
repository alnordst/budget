const baseBreadcrumbs = [
  {
    text: '3and3.dev',
    href: "https://3and3.dev"
  },
  {
    text: 'Budget',
    to: '/'
  }
]

const state = () => ({
  breadcrumbs: [ ...baseBreadcrumbs ]
})

const getters = {
  breadcrumbs: state => {
    return state.breadcrumbs.map((it, index) => {
      if(index == state.breadcrumbs.length - 1)
        return {
          ...it,
          disabled: true
        }
      else
        return it
    })
  },
  truncatedBreadcrumbs: (state, getters) => {
    return getters.breadcrumbs.slice(-2)
  }
}

const mutations = {
  setAdditionalBreadcrumbs(state, additional) {
    state.breadcrumbs = [ ...baseBreadcrumbs, ...additional ]
  },
  resetBreadcrumbs(state) {
    state.breadcrumbs = [ ...baseBreadcrumbs ]
  }
}

export default {
  namespaced: false,
  state,
  getters,
  mutations
}