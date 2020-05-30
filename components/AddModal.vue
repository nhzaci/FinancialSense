<template>
    <v-row justify="center">
        <v-dialog 
            v-model="addModalOpen" 
            width="50%" 
        >
            <v-card
                id="addToolbar"
                class="pa-lg-6 pt-lg-3"
                raised
                elevation-5
            >
                <v-card-title>
                    Add Transaction
                </v-card-title>
                <v-container fluid>
                    <v-row align="center">
                        <v-col
                            cols="3"
                        >
                            <!-- Indicate type (exp / inc) -->
                            <v-overflow-btn
                                class="mx-2"
                                :items="trackType"
                                label="Type"
                                target="#addToolbar"
                                v-model="type"
                            ></v-overflow-btn>

                        </v-col>
                        
                        <v-col
                            cols="3"
                        >
                            <!-- Indicate category (shopping, etc) -->
                            <v-overflow-btn
                                class="mx-2"
                                :items="trackCat"
                                label="Category"
                                target="#addToolbar"
                                v-model="category"
                            ></v-overflow-btn>
                        </v-col>

                        <v-col
                            cols="6"
                        >
                            <!-- Indicate note -->
                            <v-text-field 
                                solo
                                class="mx-4" 
                                height="100%"
                                label="Notes"
                            ></v-text-field>

                        </v-col>
                    </v-row>

                    <v-row justify="center">
                        <v-text-field
                            :rules="rules"
                            outlined
                            label="Amount"
                            class="mx-4"
                        >
                            
                        </v-text-field>
                    </v-row>

                </v-container>
                <v-card-actions>
                    <!-- Action buttons -->
                    <v-btn class="mx-4" color="primary" large @click="save">
                        Save
                    </v-btn>
                    <v-btn class="mx-4" color="error" large @click="clear">
                        Clear
                    </v-btn>

                    <v-spacer></v-spacer>
                    
                    <!-- End Fav Icon -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" class="mx-2">
                                <v-icon large>
                                    mdi-heart
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Favourite</span>
                    </v-tooltip>
                    <!-- End Share Icon -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" class="mx-2">
                                <v-icon large>
                                    mdi-share
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Share</span>
                    </v-tooltip>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            type: null,
            category: null,
            note: null,
            money: null,
            rules: [
                value => !!value || "An amount is required!"
            ]
        }
    },
    methods: {
        save() {
            console.log("save button clicked")
        },
        clear () {
            //Modal, check confirmation before cancelling
            console.log("clear button clicked")
        }
    },
    computed: {
        trackType: {
            get () {
                return this.$store.state.track.trackType;
            }
        },
        trackCat: {
            get () {
                return this.$store.state.track.trackCat;
            }
        },
        addModalOpen: {
            get () {
                return this.$store.state.addModalOpen;
            },
            set (bool) {
                this.$store.commit('set_addModalOpen', bool);
            }
        }
    }
}
</script>