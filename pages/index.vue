<template>
  <v-container fluid>

    <!-- Top Row of cards -->
    <v-row justify="center">

      <!-- Overall Balance -->
      <v-col>
        <v-card class="ma-5 pa-5">
          <v-card-title>
            Overall Balance
          </v-card-title>
          <v-card-content>
            <div class="font-weight-bold display-2 text-center">
              1,234.13
            </div>
          </v-card-content>
        </v-card>
      </v-col>

      <!-- Expenditure -->
      <v-col>
        <v-card class="ma-5 pa-5">
          <v-card-title>
            Overall Expenditure 
          </v-card-title>
          <v-card-content>
            <div class="font-weight-bold display-2 text-center">
              1,234.13
            </div>
          </v-card-content>
        </v-card>
      </v-col>

      <!-- Income -->
      <v-col>
        <v-card class="ma-5 pa-5">
          <v-card-title>
            Overall Savings 
          </v-card-title>
          <v-card-content>
            <div class="font-weight-bold display-2 text-center">
              1,234.13
            </div>
          </v-card-content>
        </v-card>
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
        <v-expansion-panel
          v-for="expenditure in expenditureArray"
          :key="expenditure.month"
        >
          <v-expansion-panel-header class="title">
            {{ months[expenditure.month-1] }}
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="category in expenditure.categories"
                :key="category.title"
              >

                <!-- List content -->
                <v-list-item-content>
                  <v-list-item-title>{{ category.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ category.amount}}</v-list-item-subtitle>
                </v-list-item-content>
                <!-- End of list content -->

              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- End of Bottom Row of cards -->

  </v-container>
</template>

<script>
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
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
      }
    }
  }
</script>
