<template lang="pug">
v-col(cols="12" :sm="cols").pa-2
  v-card.pt-2.pb-3.px-3(outlined :class="isBig ? '' : 'd-flex align-center justify-space-between'")
    .overline.nowrap.mr-3 {{capitalType}}
    .body-2
      bills-this-month(v-if="type=='bills-this-month'")
      expected-bills-account-balance(v-if="type=='expected-bills-account-balance'")
      minimum-bills-account-balance(v-if="type=='minimum-bills-account-balance'")
      monthly-avg-spend(v-if="type=='monthly-avg-spend'")
      monthly-income(v-if="type=='monthly-income'")
      percent-spent-of-income(v-if="type=='percent-spent-of-income'")
      percent-unallocated(v-if="type=='percent-unallocated'")
      transaction-list(v-if="type=='transaction-list'")
      unallocated-money(v-if="type=='unallocated-money'")
</template>

<script>
import { capitalCase } from 'change-case'

import BillsThisMonth from './types/BillsThisMonth.vue'
import ExpectedBillsAccountBalance from './types/ExpectedBillsAccountBalance.vue'
import MinimumBillsAccountBalance from './types/MinimumBillsAccountBalance.vue'
import MonthlyAvgSpend from './types/MonthlyAvgSpend.vue'
import MonthlyIncome from './types/MonthlyIncome.vue'
import PercentSpentOfIncome from './types/PercentSpentOfIncome.vue'
import PercentUnallocated from './types/PercentUnallocated.vue'
import TransactionList from './types/TransactionList.vue'
import UnallocatedMoney from './types/UnallocatedMoney.vue'

export default {
  components: {
    BillsThisMonth,
    ExpectedBillsAccountBalance,
    MinimumBillsAccountBalance,
    MonthlyAvgSpend,
    MonthlyIncome,
    PercentSpentOfIncome,
    PercentUnallocated,
    TransactionList,
    UnallocatedMoney
  },
  props: ['type'],
  computed: {
    isBig() {
      return ['transaction-list'].includes(this.type)
    },
    cols() {
      return this.isBig ? 12 : 6
    },
    capitalType() {
      return capitalCase(this.type)
    }
  }
}
</script>