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
    <v-row justify="space-between">
      <v-col>
        <!-- Average Expenditure Chart -->
        <v-card
          class="pa-5 ma-5"
          shaped
        >
          <v-card-title>
            <span class="font-weight-bold mx-2">
              Average Expenditure
            </span> 
            <v-icon large>mdi-trending-down</v-icon>
          </v-card-title>
          <v-sheet color="transparent">
            <v-sparkline
              :value="value"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              auto-draw
            ></v-sparkline>
          </v-sheet>
        </v-card>
      </v-col>

      <v-col>
        <!-- Average Savings Chart -->
        <v-card
          class="pa-5 ma-5"
          shaped
        >
          <v-card-title>
            <span class="font-weight-bold mx-2">Average Savings</span> 
            <v-icon large>mdi-trending-up</v-icon>
          </v-card-title>
          <v-sheet color="transparent">
            <v-sparkline
              :value="value"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              auto-draw
            ></v-sparkline>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
    <!-- End of Middle row of cards -->
    
    <!-- Bottom Row of cards -->
    <v-row class="ma-5 pa-5">
      <v-expansion-panels>
        <v-expansion-panel>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- End of Bottom Row of cards -->

  </v-container>
</template>

<script>
import OverviewCard from '@/components/OverviewCard';

const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

export default {
  components: {
    OverviewCard
  },
  data: () => ({
    months: [
      'January',
      'Feburary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
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
    }
  },
  created() {
    this.$store.dispatch('get_dbArray');
  }
}
</script>
