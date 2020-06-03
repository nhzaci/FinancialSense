<template>
    <v-overlay
        :value="navOverlay"
    >
        <v-btn
            v-for="route in routes"
            :key="route.title"
            text
            :to="route.path"
        >
            <v-icon class="mx-2">{{ route.icon }}</v-icon>
            {{ route.title }}
        </v-btn>
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