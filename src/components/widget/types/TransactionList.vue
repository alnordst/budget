<template lang="pug">
v-data-table(
  :headers="headers"
  :items="transactions"
  disable-filtering
  disable-pagination
  disable-sort
  hide-default-footer
  mobile-breakpoint="0"
)
  template(v-slot:item.amount="{ item }")
    span(:class="item.amount > 0 ? 'green--text text--darken-2' : ''")
      span {{`${item.amount > 0 ? '+' : ''}`}}${{Math.abs(item.amount).toFixed(2)}}
  template(v-slot:item.date="{ item }")
    span(:class="hasPassed(item.date) ? 'grey--text text--darken-1' : ''")
      span {{format(item.date)}}
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    headers: [
      { text: 'Date', value: 'date' },
      { text: 'Amount', value: 'amount' },
      { text: 'Source', value: 'name' }
    ]
  }),
  computed: {
    ...mapGetters([
      'data'
    ]),
    transactions() {
      return this.data
        .filter(it => it.active)
        .reduce((acc, it) => {
          acc.push(...it.occurrences.map(date => ({
            name: it.name,
            amount: it.amount,
            date
          })))
          return acc
        }, [])
        .sort((a, b) => {
          if(dayjs(a.date).isBefore(b.date, 'day'))
            return -1
          else if(dayjs(a.date).isAfter(b.date, 'day'))
            return 1
          else
            return 0
        })
    }
  },
  methods: {
    format(date) {
      return dayjs(date).format('M/DD')
    },
    hasPassed(date) {
      return dayjs().isAfter(date, 'day')
    }
  }
}
</script>