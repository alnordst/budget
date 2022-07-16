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
      return this.data
        .filter(it => it.active && it.amount > 0)
        .reduce((acc, item) => {
          return (acc + item.thisMonthAmt)
        })
    }
  }
}