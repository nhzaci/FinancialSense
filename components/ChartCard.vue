<template>
  <v-container class="ma-0 pa-0">
    <v-card
      class="pa-5 ma-5"
      shaped
    >
      <v-card-title>
        <span class="font-weight-bold mx-2">{{ title }}</span> 
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
        gradient: gradients[2],
        value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
        gradientDirection: 'top',
        gradients,
        fill: false,
        type: 'trend',
        autoLineWidth: false,
    }),
    props: {
        title: String
    }
}
</script>