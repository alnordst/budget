import dayjs from 'dayjs'

const pullDate = (a, b) => {
  let date = a.endOf('month').date() < b.date() ? a.endOf('month').date() : b.date()
  return a.date(date)
}

const calcOccurrences = (regularity, then, now=dayjs()) => {
  return calcOccurrencesFuncs[regularity](dayjs(date), dayjs(now))
}

const calcMonthsToNext = (regularity, date) => {
  return calcMonthsToNextFuncs[regularity](dayjs(date))
}

const calcOccurrencesFuncs = {
  'annually': (then, now) => {
    if(now.month() === then.month())
      return [pullDate(now, then)]
    else
      return []
  },
  'semi-annually': (then, now) => {
    if(now.month() % 6 === then.month() % 6)
      return [pullDate(now, then)]
    else
      return []
  },
  'quarterly': (then, now) => {
    if(now.month() % 3 === then.month() % 3)
      return [pullDate(now, then)]
    else
      return []
  },
  'monthly': (then, now) => {
    return [pullDate(now, then)]
  },
  'semi-monthly': (then, now) => {
    let dates = [pullDate(now, then)]
    if(then.date() <= 14)
      dates.push(pullDate(now, then.add(14, 'day')))
    else
      dates.unshift(pullDate(now, then.subtract(14, 'day')))
    return dates
  },
  'bi-weekly': (then, now) => {
    let offset = now.startOf('month').diff(then, 'days') % 14
    let dates = [now.date(offset + 1)]
    while(dates[dates.length - 1].add(2, 'week').month() === now.month()) {
      dates.push(dates[dates.length - 1].add(2, 'week'))
    }
    return dates
  },
  'weekly': (then, now) => {
    let offset = now.startOf('month').diff(then, 'days') % 7
    let dates = [now.date(offset + 1)]
    while(dates[dates.length - 1].add(1, 'week').month() === now.month()) {
      dates.push(dates[dates.length - 1].add(1, 'week'))
    }
    return dates
  },
  'daily': (now) => {
    let dates = []
    for(let i = 1; i <= now.endOf('month').date(); i++) {
      dates.push(now.date(i))
    }
    return dates
  }
}

const calcMonthsToNextFuncs = {
  'annually': it => (12 + it.month() - now.month()) % 12,
  'semi-annually': it => (12 + it.month() - now.month()) % 6,
  'quarterly': it => (12 + it.month() - now.month()) % 3,
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