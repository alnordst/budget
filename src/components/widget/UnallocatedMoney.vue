<template lang="pug">
  span ${{result}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'data'
    ]),
    result () {
      return this.data
        .filter(it => it.active)
        .reduce((acc, item) => {
          return (acc + item.avgMonthAmt)
        }, 0)
    }
  }
}
</script>