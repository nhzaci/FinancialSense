<template>
    <v-app-bar
        dark
        color="orange darken-4"
        app
        clipped-left
    >   

        <!-- Start Icons -->
        <!-- Temporarily removed
        <v-app-bar-nav-icon
            @click="toggleDrawer"
            hide
        />
        -->

        <v-icon large class="mx-2">mdi-trending-up</v-icon>

        <v-toolbar-title class="font-weight-bold" style="font-size:30px;">
            FinancialSense
        </v-toolbar-title>
        <!-- End of start icons -->

        <v-spacer></v-spacer>

        <!-- End Icons -->
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon large>
                        mdi-heart
                    </v-icon>
                </v-btn>
            </template>
            <span>Favourites</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon large>
                        mdi-cog
                    </v-icon>
                </v-btn>
            </template>
            <span>Settings</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon large>
                        mdi-account-circle
                    </v-icon>
                </v-btn>
            </template>
            <span>Account</span>
        </v-tooltip>
        <!-- End of End Icons -->

    </v-app-bar>
</template>

<script>
export default {
    methods: {
        toggleDrawer() {
            this.navDrawerOpen= !this.navDrawerOpen;
            console.log(this.$store.state.navDrawerOpen);
        }
    },
    computed: {
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