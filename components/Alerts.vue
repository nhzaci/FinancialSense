<template>
    <div>
        <v-alert 
            type="success"
            v-model="successOpen"
            dismissible
            elevation-5
            class="ma-5 pa-5"
        >
            {{ successText }}
        </v-alert>
        <v-alert 
            type="info"
            v-model="infoOpen"
            dismissible
            elevation-5
            class="ma-5 pa-5"
        >
            {{ infoText }}
        </v-alert>
        <v-alert 
            type="warning"
            v-model="warningOpen"
            dismissible
            elevation-5
            class="ma-5 pa-5"
        >
            {{ warningText }}
        </v-alert>
        <v-alert 
            type="error"
            v-model="errorOpen"
            dismissible
            elevation-5
            class="ma-5 pa-5"
        >
            {{ errorText }}
        </v-alert>
    </div>
</template>

<script>
export default {
    computed: {
        successText: {
            get () {
                return this.$store.state.alerts.successText
            }
        },
        infoText: {
            get () {
                return this.$store.state.alerts.infoText
            }
        },
        warningText: {
            get () {
                return this.$store.state.alerts.warningText
            }
        },
        errorText: {
            get () {
                return this.$store.state.alerts.errorText
            }
        },
        infoOpen: {
            get () {
                return this.$store.state.alerts.infoOpen
            },
            set (bool) {
                this.$store.commit('alerts/set_infoOpen', bool);
            }
        },
        successOpen: {
            get () {
                return this.$store.state.alerts.successOpen
            },
            set (bool) {
                this.$store.commit('alerts/set_successOpen', bool);
            }
        },
        warningOpen: {
            get () {
                return this.$store.state.alerts.warningOpen
            },
            set (bool) {
                this.$store.commit('alerts/set_warningOpen', bool);
            }
        },
        errorOpen: {
            get () {
                return this.$store.state.alerts.errorOpen
            },
            set (bool) {
                this.$store.commit('alerts/set_errorOpen', bool);
            }
        },
    }
}
</script>