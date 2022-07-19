import dayjs from 'dayjs'

const calcOccurrences = (regularity, date) => {
  return calcOccurrencesFuncs[regularity](dayjs(date))
}

const calcMonthsToNext = (regularity, date) => {
  return calcMonthsToNextFuncs[regularity](dayjs(date))
}

const calcOccurrencesFuncs = {
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
    let offset = dayjs().startOf('month').diff(it, 'days') % 14
    let dates = [dayjs().date(offset + 1)]
    while(dates[dates.length - 1].add(2, 'week').month() === dayjs().month()) {
      dates.push(dates[dates.length - 1].add(2, 'week'))
    }
    return dates
  },
  'weekly': it => {
    let offset = dayjs().startOf('month').diff(it, 'days') % 7
    let dates = [dayjs().date(offset + 1)]
    while(dates[dates.length - 1].add(1, 'week').month() === dayjs().month()) {
      dates.push(dates[dates.length - 1].add(1, 'week'))
    }
    return dates
  },
  'daily': () => {
    let dates = []
    for(let i = 1; i <= dayjs().endOf('month').date(); i++) {
      dates.push(dayjs().date(i))
    }
    return dates
  }
}

const calcMonthsToNextFuncs = {
  'annually': it => (12 + it.month() - dayjs().month()) % 12,
  'semi-annually': it => (12 + it.month() - dayjs().month()) % 6,
  'quarterly': it => (12 + it.month() - dayjs().month()) % 3,
  'monthly': () => 0,
  'semi-monthly': () => 0,
  'bi-weekly': () => 0,
  'weekly': () => 0,
  'daily': () => 0
}

const annualOccurrenceCounts = {
  'annually': 1,
  'semi-annually': 2,
  'quarterly': 4,
  'monthly': 12,
  'semi-monthly': 24,
  'bi-weekly': 365.25 / 14,
  'weekly': 365.25 / 7,
  'daily': 365.25
}

export default {
  calcOccurrences,
  annualOccurrenceCounts,
  calcMonthsToNext
}