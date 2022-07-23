<template lang="pug">
v-col(cols="12" :sm="cols").pa-2
  v-card.pt-2.pb-3.px-3(outlined :class="isBig ? '' : 'd-flex align-center justify-space-between'")
    .overline.nowrap.mr-3 {{capitalType}}
    .body-2
      bills-this-month(v-if="type=='bills_this_month'")
      expected-bills-account-balance(v-if="type=='expected_bills_account_balance'")
      minimum-bills-account-balance(v-if="type=='minimum_bills_account_balance'")
      monthly-avg-spend(v-if="type=='monthly_avg_spend'")
      monthly-income(v-if="type=='monthly_income'")
      percent-spent-of-income(v-if="type=='percent_spent_of_income'")
      percent-unallocated(v-if="type=='percent_unallocated'")
      transaction-list(v-if="type=='transaction_list'")
      unallocated-money(v-if="type=='unallocated_money'")
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
      return ['transaction_list'].includes(this.type)
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