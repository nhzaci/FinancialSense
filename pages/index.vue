<template>
  <v-container fluid>

    <!-- Top Row of cards -->
    <v-row justify="center">

      <!-- Overall Balance -->
      <v-col>
        <OverviewCard title="Balance" :amount="Number(1234.12)"/>
      </v-col>

      <!-- Expenditure -->
      <v-col>
        <OverviewCard title="Expenditure" :amount="Number(5334.64)"/>
      </v-col>

      <!-- Income -->
      <v-col>
        <OverviewCard title="Savings" :amount="Number(6568.76)" />
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
    
    <!-- Bottom Row of cards -->
    <v-row class="ma-5 pa-5">
      
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
  methods: {
    async getTransactionArray (year, month) {
      let url = `http://localhost:3000/api/posts/${year}/${month}`;
      let retData = undefined;
      let data = await this.axios.get(url)
        .then(res => {
          retData = res.data
        })
        .catch(err => console.log(err));
      return retData;

    }
  },
  created() {
    this.$store.dispatch('get_monthYears');
  }
}
</script>
