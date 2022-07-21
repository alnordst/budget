<template lang="pug">
  span {{(result * 100).toFixed()}}%
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'data'
    ]),
    result () {
      let income = this.data
        .filter(it => it.active && it.amount > 0)
        .reduce((acc, item) => {
          return (acc + item.thisMonthAmt)
        }, 0)
      let spending = this.data
        .filter(it => it.active && it.amount < 0)
        .reduce((acc, item) => {
          return (acc - item.avgMonthAmt)
        }, 0)
      return spending / income
    }
  }
}
</script>