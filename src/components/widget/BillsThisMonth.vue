<template lang="pug">
  span ${{costThisMonth.toFixed(2)}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'data'
    ]),
    costThisMonth () {
      return this.data
        .filter(it => it.active && it.amount < 0)
        .reduce((acc, item) => {
          return (acc - item.thisMonthAmt)
        }, 0)
    }
  }
}
</script>