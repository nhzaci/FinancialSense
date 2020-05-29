<template>
    <v-navigation-drawer
        expand-on-hover
        permanent
        clipped
        app
    >

        <v-list nav>
            <v-list-item
                v-for="route in routes"
                :key="route.title"
                nuxt
                :to="route.path"
            >
                <v-icon>{{ route.icon }}</v-icon>
                <v-list-item-title class="mx-2">
                    {{ route.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
export default {
    computed: {
        routes: {
            get () {
                return this.$store.state.routes;
            }
        },
        navDrawerOpen: {
            get () {
                return this.$store.state.navDrawerOpen;
            },
            set (bool) {
                this.$store.commit('set_navDrawerOpen', bool);
            }
        }
    }
}
</script>