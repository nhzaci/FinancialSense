<template>
    <v-container class="ma-0 pa-0 px-5">
        <v-card class="pa-5">
          <v-card-title>
              {{ title }}
          </v-card-title>
          <v-card-text class="text-center">
            <span :class="titleSize + ' font-weight-bold'">
                {{ amount }}
            </span>
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
    },
    computed: {
        titleSize() {
            if (this.$vuetify.breakpoint.mdAndUp) {
                return 'display-2';
            }
            return 'headline';
        }
    }
}
</script>