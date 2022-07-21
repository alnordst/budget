<template lang="pug">
  span ${{result.toFixed(2)}}
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'data'
    ]),
    result () {
      let expenses = this.data.filter(it => it.active && it.amount < 0)
      let longTerm = expenses.reduce((acc, it) => {
        if(it.monthsToNext)
          return acc + (12 - it.monthsToNext) * Math.abs(it.avgMonthAmt)
        else
          return acc
      }, 0)
      let shortTerm = expenses.reduce((acc, it) => {
        let n = it.occurrences
          .filter(date => dayjs(date).date() >= dayjs().date())
          .length
        return acc + n * Math.abs(it.amount)
      }, 0)
      return longTerm + shortTerm
    }
  }
}
</script>