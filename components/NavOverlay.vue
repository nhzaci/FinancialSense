<template>
    <v-overlay
        :value="navOverlay"
    >
        <v-row
            v-for="route in routes"
            :key="route.title"
            justify="center"
        >
            <v-btn
                text
                :to="route.path"
                x-large
            >
                {{ route.title }}
            </v-btn>
        </v-row>
        <v-row justify="center">
            <v-btn
                @click="navOverlay=!navOverlay"
                x-large
                icon
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-row>
    </v-overlay>
</template>

<script>
export default {
    computed: {
        routes() {
            return this.$store.state.routes
        },
        navOverlay: {
            get () {
                return this.$store.state.navOverlay;
            },
            set (bool) {
                this.$store.commit('set_navOverlay', bool);
            },
        },
    }
}
</script>