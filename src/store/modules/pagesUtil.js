import dayjs from 'dayjs'

const pullDate = (a, b) => {
  let date = a.endOf('month').date() < b.date() ? a.endOf('month').date() : b.date()
  return a.date(date)
}

const calcOccurrences = (regularity, monthOffset, then) => {
  return calcOccurrencesFuncs[regularity](dayjs().add(monthOffset, 'months'), dayjs(then))
}

const calcMonthsToNext = (regularity, date) => {
  return calcMonthsToNextFuncs[regularity](dayjs(date))
}

const calcOccurrencesFuncs = {
  'annually': (now, then) => months(12, now, then),
  'semi-annually': (now, then) => months(6, now, then),
  'quarterly': (now, then) => months(3, now, then),
  'monthly': (now, then) => months(1, now, then),
  'semi-monthly': (now, then) => {
    let dates = [pullDate(now, then)]
    if(then.date() <= 14)
      dates.push(pullDate(now, then.add(14, 'day')))
    else
      dates.unshift(pullDate(now, then.subtract(14, 'day')))
    return dates
  },
  'bi-weekly': (now, then) => days(14, now, then),
  'weekly': (now, then) => days(7, now, then),
  'daily': (now, then) => days(1, now, then)
}

const months = (n, now, then) => {
  if(now.month() % n === then.month() % n)
    return [pullDate(now, then)]
  else
    return []
}

const days = (n, now, then) => {
  let diff = Math.abs(now.startOf('month').diff(then, 'days') % n)
  console.log(diff)
  let daysAfter
  if(diff == 0 || now.startOf('month').isBefore(then))
    daysAfter = diff
  else
    daysAfter = n - diff
  let dates = [now.date(daysAfter + 1)]
  while(dates[dates.length - 1].add(1, 'week').month() === now.month()) {
    dates.push(dates[dates.length - 1].add(1, 'week'))
  }
  return dates
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