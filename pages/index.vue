<template>
  <v-container fluid>

    <!-- Top Row of cards -->
    <v-row justify="center">

      <!-- Overall Balance -->
      <v-col>
        <OverviewCard title="Balance" :amount="balance"/>
      </v-col>

      <!-- Expenditure -->
      <v-col>
        <OverviewCard title="Expense" :amount="expense"/>
      </v-col>

      <!-- Income -->
      <v-col>
        <OverviewCard title="Income" :amount="income" />
      </v-col>
    </v-row>

    <!-- Middle row of cards -->
    <v-row justify="center">
      <v-col>
        <!-- Average Expenditure Chart -->
        <ChartCard title="Expenditure" />
      </v-col>

      <v-col>
        <!-- Average Savings Chart -->
        <ChartCard title="Savings" />
      </v-col>
    </v-row>
    <!-- End of Middle row of cards -->
    
    <!-- Bottom Row -->
    <v-row class="pa-5">
      
      <v-skeleton-loader 
        v-if="loadingMonthYears"
        type="list-item-two-lines"
      />
      <v-expansion-panels 
        popout 
        v-else
        hover
        focusable
      >
        <AsyncExpPanel 
          v-for="mthYr in monthYears" 
          :key="mthYr.year + mthYr.month" 
          :year="String(mthYr.year)"
          :month="String(mthYr.month)"
        />
      </v-expansion-panels>
    </v-row>
    <!-- End of Bottom Row of cards -->

  </v-container>
</template>

<script>
import axios from 'axios';
import AsyncExpPanel from '@/components/AsyncExpPanel';
import ChartCard from '@/components/ChartCard';
import OverviewCard from '@/components/OverviewCard';

export default {
  components: {
    AsyncExpPanel,
    ChartCard,
    OverviewCard
  },
  data: () => ({
  }),
  computed: {
    balance: {
      get () {
        return this.$store.state.balance
      }
    },
    income: {
      get () {
        return this.$store.state.income
      }
    },
    expense: {
      get () {
        return this.$store.state.expense
      }
    },
    expenditureArray: {
      get () {
        return this.$store.state.expenditureArray
      }
    },
    dbArray: {
      get() {
        return this.$store.state.dbArray;
      }
    },
    monthYears: {
      get() {
        return this.$store.state.monthYears;
      }
    },
    loadingMonthYears: {
      get () {
        return this.$store.state.loadingMonthYears;
      }
    },
  },
  created() {
    this.$store.dispatch('get_monthYears');
    this.$store.dispatch('get_balance');
    this.$store.dispatch('get_income');
    this.$store.dispatch('get_expense');
  }
}
</script>
