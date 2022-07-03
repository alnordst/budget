const baseBreadcrumbs = [
  {
    text: '3and3.dev',
    href: "https://3and3.dev"
  },
  {
    text: 'Budget',
    href: "/"
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
  namespaced: true,
  state,
  getters,
  mutations
}