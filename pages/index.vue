<template>
  <v-container fluid>

    <!-- First row of cards -->
    <v-row justify="space-between">
      <v-col>
        <!-- Average Expenditure Chart -->
        <v-card
          class="pa-5 ma-5"
          shaped
        >
          <v-card-title>
            <span class="font-weight-bold display-1 mx-2">
              Average Expenditure
            </span> 
            <v-icon x-large>mdi-trending-down</v-icon>
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
            <span class="font-weight-bold display-1 mx-2">Average Savings</span> 
            <v-icon x-large>mdi-trending-up</v-icon>
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
    <!-- End of First row of cards -->

    <v-row>
    </v-row>

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
    }),
  }
</script>
