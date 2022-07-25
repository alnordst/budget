import dayjs from 'dayjs'
import keygen from 'keygenerator'
import util from './pagesUtil'

const widgetFiles = require.context(
  '@/components/widget/types',
  true,
  /^.*\.vue$/
)

const state = () => ({
  pageId: undefined,
  pages: []
})

const getters = {
  widgetTypes: () => widgetFiles.keys().map(it => it.slice(2, -4)),
  pagesToJson: (state) => JSON.stringify(state.pages),
  getPage: (state) => id => state.pages.find(it => it.id == id),
  page: (state, getters) => getters.getPage(state.pageId),
  pageIsSet: (state, getters) => !!getters.page,
  data: (state, getters) => {
    let page = getters.page
    if(page)
      return page.sources.filter(it => it.active).map(source => {
        let occurrences = util.calcOccurrences(source.regularity, 0, source.date)
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
  pagesFromJson: (state, {data, replace}) => {
    let rawData = JSON.parse(data)
    if(Array.isArray(rawData)) {
      //todo clean data
      if(replace)
        state.pages = rawData
      else
        state.pages.push(...rawData)
    }
  },
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
    if(index >= 0) {
      state.pages.splice(index, 1)
    }
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
      if(index >= 0) {
        page.sources.splice(index, 1)
      }
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