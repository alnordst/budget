import moment from 'moment'

const state = () => ({
  pages: [
    {
      name: "Fun Money",
      slug: 'fun-money',
      sources: [
        {
          name: "Allowance",
          active: true,
          regularity: 'monthly',
          date: '07/01/2022',
          amount: 100
        },
        {
          name: 'Game Pass',
          active: true,
          regularity: 'monthly',
          date: '07/04/2022',
          amount: -15
        },
        {
          name: 'Google Domains',
          active: true,
          regularity: 'annually',
          date: '06/24/2022',
          amount: -12
        }
      ],
      widgets: [

      ]
    }
  ]
})

const getters = {
  data: (state) => {
    return state.sources.filter(it => it.active).map(source => {
      let occurences = calcOccurences(source.regularity, source.date)
      return {
        ...source,
        occurences,
        thisMonthAmt: occurences.length * source.amount,
        avgMonthAmt: avgMonth(source.regularity) * source.amount
      }
    })
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}