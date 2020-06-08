<template>
  <v-container fluid>

    <!-- Top Row of cards -->
    <v-row justify="center">

      <!-- Overall Balance -->
      <v-col cols="12" lg="4">
          <OverviewCard title="Balance" :amount="balance"/>
          <!-- Average Balance Chart -->
          <ChartCard title="balance" icon="mdi-currency-usd" v-if="!loadingMonthYears"/>
          <v-skeleton-loader
            type="card"
            v-else
          ></v-skeleton-loader>
      </v-col>

      <!-- Expenditure -->
      <v-col cols="12" lg="4">
          <OverviewCard title="Expense" :amount="expense"/>
          <!-- Average Expense Chart -->
          <ChartCard title="expense" icon="mdi-trending-down" v-if="!loadingMonthYears"/>
          <v-skeleton-loader
            type="card"
            v-else
          ></v-skeleton-loader>
      </v-col>

      <!-- Income -->
      <v-col cols="12" lg="4">
          <OverviewCard title="Income" :amount="income" />
          <!-- Average Income Chart -->
          <ChartCard title="income" icon="mdi-trending-up" v-if="!loadingMonthYears"/>
          <v-skeleton-loader
            type="card"
            v-else
          ></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Bottom Row -->
    <v-row class="pa-5">
      
      <v-skeleton-loader 
        v-if="loadingMonthYears"
        type="list-item-two-lines"
      ></v-skeleton-loader>
      
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
    balance() {
      return this.$store.state.balance
    },
    income() {
      return this.$store.state.income
    },
    expense() {
      return this.$store.state.expense
    },
    expenditureArray() {
      return this.$store.state.expenditureArray
    },
    dbArray() {
      return this.$store.state.dbArray;
    },
    monthYears() {
      return this.$store.state.monthYears;
    },
    loadingMonthYears() {
        return this.$store.state.loadingMonthYears;
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
