import dayjs from 'dayjs'

const calcOccurrences = (regularity, date) => {
  return calcOccurrencesFuncs[regularity](dayjs(date))
}

calcOccurrencesFuncs = {
  'annually': it => {
    if(dayjs().month() === it.month())
      return [dayjs().date(it.date())]
    else
      return []
  },
  'semi-annually': it => {
    if(dayjs().month() % 6 === it.month() % 6)
      return [dayjs().date(it.date())]
    else
      return []
  },
  'quarterly': it => {
    if(dayjs().month() % 3 === it.month() % 3)
      return [dayjs().date(it.date())]
    else
      return []
  },
  'monthly': it => {
    return [dayjs().date(it.date())]
  },
  'semi-monthly': it => {
    let dates = [dayjs().date(it.date())]
    if(it.date() <= 14)
      dates.push(dayjs().date(it.date()+14))
    else
      dates.unshift(dayjs().date(it.date()-14))
    return dates
  },
  'bi-weekly': it => {
    let offset = dayjs().startOf(month).diff(it, 'days') % 14
    let dates = [dayjs().date(offset + 1)]
    while(dates[dates.length - 1].add(2, 'week').month() === dayjs().month()) {
      dates.push(dates[date.length - 1].add(2, 'week'))
    }
    return dates
  },
  'weekly': it => {
    let offset = dayjs().startOf(month).diff(it, 'days') % 7
    let dates = [dayjs().date(offset + 1)]
    while(dates[dates.length - 1].add(1, 'week').month() === dayjs().month()) {
      dates.push(dates[date.length - 1].add(1, 'week'))
    }
    return dates
  },
  'daily': it => {
    let dates = []
    for(let i = 1; i <= dayjs().endOf(month).date(); i++) {
      dates.push(dayjs().date(i))
    }
    return dates
  }
}

annualOccurrenceCounts = {
  'annually': 1,
  'semi-annually': 2,
  'quarterly': 4,
  'monthly': 12,
  'semi-monthly': 24,
  'bi-weekly': 365.25 / 14,
  'weekly': 365.25 / 7,
  'daily': 365.25
}

const state = () => ({
  pageIndex: undefined,
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
        'monthly-income',
        'monthly-avg-spend',
        'unallocated-money',
        'percent-spent-of-income',
        'percent-unallocated',
        'bills-this-month',
        'expected-bills-account-balance'
      ]
    }
  ]
})

const getters = {
  page: (state) => state.pages[state.pageIndex],
  data: (state, getters) => {
    return getters.page.sources.filter(it => it.active).map(source => {
      let occurrences = calcOccurrences(source.regularity, source.date)
      return {
        ...source,
        occurrences,
        thisMonthAmt: occurrences.length * source.amount,
        avgMonthAmt: annualOccurrenceCounts[source.regularity] * source.amount
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