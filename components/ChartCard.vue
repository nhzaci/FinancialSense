<template>
  <v-container class="ma-0 pa-0">
    <v-card
      class="pa-5 ma-5"
      shaped
    >
      <v-card-title>
        <span class="font-weight-bold mx-2">{{ title | capitalise }}</span> 
        <v-icon class="mx-2" large>{{ icon }}</v-icon>
      </v-card-title>
      <v-card-text class="ma-0 pa-0">
        <v-skeleton-loader
          v-if="loading"
          type="card"
        ></v-skeleton-loader>
        <v-sparkline
          v-if="!loading"
          :labels="labels"
          :value="value"
          color="white"
          line-width="2"
          padding="16"
          smooth
        ></v-sparkline>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
      loading: true,
      labels: [],
      value: []
    }),
    props: {
        title: String,
        icon: String
    },
    computed: {
      monthYears () {
        return this.$store.state.monthYears;
      },
      shortMonths() {
        return this.$store.state.shortMonths;
      }
    },
    filters: {
      capitalise (string) {
        return String(string).toUpperCase();
      }
    },
    async created() {
      let i;
      for (i = this.monthYears.length-1; i >= 0; i--) {
        let my = this.monthYears[i];
        let url = `http://localhost:3000/api/posts/sum/${this.title}/${my.year}/${my.month}`;
        const resp = await axios.get(url)
        try {
          this.value.push(resp.data);
          this.labels.push(`${this.shortMonths[my.month]} ${my.year}`);
        } catch (error) {
          console.log(error);
        }
      }
      this.loading = false;
    }
}
</script>