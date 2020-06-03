<template>
    <v-speed-dial
        v-model="fab"
        large
        fixed
        bottom
        right
        transition="slide-y-reverse-transition"
    >
        <template v-slot:activator>
            <v-btn
                v-model="fab"
                color="blue darken-2"
                dark
                fab
            >
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-account-circle</v-icon>
            </v-btn>
        </template>
        <v-btn
            fab
            dark
            small
            color="pink"
            @click="toggleModalOpen"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="indigo"
            @click="navOverlay=!navOverlay"
        >
            <v-icon>mdi-navigation</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
    data: () => ({
        fab: false,
    }),
    methods: {
        toggleModalOpen () {
            this.modalEditMode = false;
            this.addModalOpen = !this.addModalOpen;
        }
      },
    computed: {
        navOverlay: {
            get () {
                return this.$store.state.navOverlay;
            },
            set (bool) {
                this.$store.commit('set_navOverlay', bool);
            },
        },
        addModalOpen: {
            get () {
                return this.$store.state.addModal.addModalOpen;
            },
            set (bool) {
                this.$store.commit('addModal/set_addModalOpen', bool);
            },
        },
        modalEditMode: {
            get () {
                return this.$store.state.addModal.modalEditMode;
            },
            set (bool) {
                this.$store.commit('addModal/set_modalEditMode', bool);
            }
        }
    }
}
</script>