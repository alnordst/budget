<template lang="pug">
  span ${{result}}
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
      let shortTerm = expenses.reduce((acc, it) => {
        let n = it.occurrences
          .filter(date => dayjs(date).date() >= dayjs().date())
          .length
        return acc + n * Math.abs(it.amount)
      }, 0)
      return shortTerm
    }
  }
}
</script>