<template>
    <v-container class="ma-0 pa-0 px-5">
        <v-card class="pa-5">
          <v-card-title>
              {{ title }}
          </v-card-title>
          <v-card-text>
            <div class="font-weight-bold display-2 text-center">
                {{ amount }}
            </div>
          </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Placeholder Title'
        },
        amount: {
            type: Number,
            default: 0.0
        }
    }
}
</script>