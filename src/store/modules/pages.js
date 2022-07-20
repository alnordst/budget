import dayjs from 'dayjs'
import keygen from 'keygenerator'
import util from './pagesUtil'

const state = () => ({
  pageId: undefined,
  pages: [
    {
      name: "Fun Money",
      id: 'abc',
      sources: [
        {
          name: "Allowance",
          id: 'ab',
          active: true,
          regularity: 'monthly',
          date: '07/01/2022',
          amount: 100
        },
        {
          name: 'Game Pass',
          id: 'bc',
          active: true,
          regularity: 'monthly',
          date: '07/04/2022',
          amount: -15
        },
        {
          name: 'Google Domains',
          id: 'cd',
          active: true,
          regularity: 'annually',
          date: '06/24/2022',
          amount: -12
        },
        {
          name: 'Inactive',
          id: 'de',
          active: false,
          regularity: 'semi-annually',
          date: '07/21/2022',
          amount: -30
        }
      ],
      widgets: [
        'transaction-list',
        'monthly-income',
        'monthly-avg-spend',
        'unallocated-money',
        'percent-spent-of-income',
        'percent-unallocated',
        'bills-this-month',
        'expected-bills-account-balance',
        'minimum-bills-account-balance'
      ]
    },
    {
      name: "Main Budget",
      id: 'def',
      sources: [],
      widgets: []
    }
  ]
})

const getters = {
  getPage: (state) => id => state.pages.find(it => it.id == id),
  page: (state, getters) => getters.getPage(state.pageId),
  pageIsSet: (state, getters) => !!getters.page,
  data: (state, getters) => {
    let page = getters.page
    if(page)
      return page.sources.filter(it => it.active).map(source => {
        let occurrences = util.calcOccurrences(source.regularity, source.date)
        return {
          ...source,
          occurrences,
          thisMonthAmt: occurrences.length * source.amount,
          avgMonthAmt: util.annualOccurrenceCounts[source.regularity] * source.amount / 12,
          monthsToNext: util.calcMonthsToNext(source.regularity, source.date)
        }
      })
    else
      return []
  }
}

const mutations = {
  setPage(state, id) {
    state.pageId = id
  },
  createPage(state, title) {
    let id
    while(!id || state.pages.some(page => page.id === id))
      id = keygen._({length: 6})
    state.pages.push({
      name: title ? title : 'Untitled Page',
      id,
      sources: [],
      widgets: []
    })
    state.pages.sort((a, b) => {
      let A = a.name.toUpperCase()
      let B = b.name.toUpperCase()
      return A > B
    })
  },
  renamePage(state, {id, title}) {
    console.log('renaming')
    let page = state.pages.find(it => it.id == id)
    if(page){
      page.name = title ? title : 'Untitled Page'
      state.pages.sort((a, b) => {
        let A = a.name.toUpperCase()
        let B = b.name.toUpperCase()
        return A > B
      })
    }
  },
  removePage(state, id) {
    let index = state.pages.findIndex(it => it.id == id)
    if(index >= 0)
      state.pages.splice(index, 1)
  },
  createSource(state, {pageId, data}) {
    let page = state.pages.find(it => it.id == pageId)
    if(page) {
      let id
      while(!id || page.sources.some(source => source.id === id))
        id = keygen._({length: 6})
      page.sources.push({
        id,
        name: data.name || 'Untitled Source',
        amount: data.amount || 0,
        regularity: data.regularity || 'monthly',
        date: data.date || dayjs().format('YYYY-MM-DD'),
        active: data.active || false
      })
    }
  },
  editSource(state, {pageId, sourceId, data}) {
    let page = state.pages.find(it => it.id == pageId)
    if(page) {
      let source = page.sources.find(it => it.id == sourceId)
      if(source) {
        ['name', 'amount', 'regularity', 'date'].forEach(field => {
          if(field in data)
            source[field] = data[field]
        })
      }
    }
  },
  removeSource(state, {pageId, sourceId}) {
    let page = state.pages.find(it => it.id == pageId)
    if(page) {
      let index = page.sources.findIndex(it => it.id == sourceId)
      if(index >= 0)
        page.sources.splice(index, 1)
    }
  },
  addWidget(state, {pageId, type}) {
    let page = state.pages.find(it => it.id == pageId)
    if(page) {
      page.widgets.push(type)
    }
  },
  moveWidgetUp(state, {pageId, index}) {
    let page = state.pages.find(it => it.id == pageId)
    if(page && index > 0) {
      let temp = page.widgets[index]
      page.widgets.splice(index, 1)
      page.widgets.splice(index-1, 0, temp)
    }
  },
  moveWidgetDown(state, {pageId, index}) {
    let page = state.pages.find(it => it.id == pageId)
    if(page && index < page.widgets.length - 1) {
      let temp = page.widgets[index]
      page.widgets.splice(index, 1)
      page.widgets.splice(index+1, 0, temp)
    }
  },
  removeWidget(state, {pageId, index}) {
    let page = state.pages.find(it => it.id == pageId)
    if(page) {
      page.widgets.splice(index, 1)
    }
  }
}

export default {
  namespaced: false,
  state,
  getters,
  mutations
}