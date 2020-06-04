<template>
    <v-row justify-center>
        <v-col cols="12" md="6">
            <v-dialog
                v-model="dialogModalOpen"
            >
                <v-card>
                    <v-card-title>
                        {{ dialogModalTitle }}
                    </v-card-title>
                    <v-card-text>
                        {{ dialogModalText }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="success" @click="confirm">{{ dialogModalYes }}</v-btn>
                        <v-btn color="error" @click="dialogModalOpen = false">{{ dialogModalNo }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        id: String
    },
    methods: {
        confirm () {
            this.$emit('confirm');
            this.dialogModalOpen = false;
        }
    },
    computed: {
        dialogModalOpen: {
            get () {
                return this.$store.state.dialogModal.dialogModalOpen;
            },
            set (bool) {
                this.$store.commit('dialogModal/set_dialogModalOpen', bool);
            }
        },
        dialogModalTitle() {
            return this.$store.state.dialogModal.dialogModalTitle;
        },
        dialogModalText() {
            return this.$store.state.dialogModal.dialogModalText;
        },
        dialogModalNo() {
            return this.$store.state.dialogModal.dialogModalNo;
        },
        dialogModalYes() {
            return this.$store.state.dialogModal.dialogModalYes;
        }
    }
}
</script>