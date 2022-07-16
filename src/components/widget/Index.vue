<template lang="pug">
div
  bills-this-month(v-if="type=='bills-this-month'")
  expected-bills-account-balance(v-if="type=='expected-bills-account-balance'")
  monthly-avg-spend(v-if="type=='monthly-avg-spend'")
  monthly-income(v-if="type=='monthly-income'")
  percent-spent-of-income(v-if="type=='percent-spent-of-income'")
  percent-unallocated(v-if="type=='percent-unallocated'")
  unallocated-money(v-if="type=='unallocated-money'")
</template>

<script>
import BillsThisMonth from './BillsThisMonth.vue'
import ExpectedBillsAccountBalance from './ExpectedBillsAccountBalance.vue'
import MonthlyAvgSpend from './MonthlyAvgSpend.vue'
import MonthlyIncome from './MonthlyIncome.vue'
import PercentSpentOfIncome from './PercentSpentOfIncome.vue'
import PercentUnallocated from './PercentUnallocated.vue'
import UnallocatedMoney from './UnallocatedMoney.vue'

export default {
  props: ['type']
}
</script>