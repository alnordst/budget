<template lang="pug">
  span {{result}}
</template>

<script>
import { mapGetters }

export default {
  computed: {
    ...mapGetters('pages', [
      'data'
    ]),
    result () {
      let income = this.data
        .filter(it => it.active && it.amount > 0)
        .reduce((acc, item) => {
          return (acc + item.thisMonthAmt)
        })
      let spending = this.data
        .filter(it => it.active && it.amount < 0)
        .reduce((acc, item) => {
          return (acc - item.avgMonthAmt))
        }, 0)
      return 1 - spending / income
    }
  }
}
</script>