<template>
    <v-row justify="center">
        <v-dialog 
            max-width="auto"
            v-model="addModalOpen" 
        >
            <v-card
                id="addToolbar"
                class="pa-lg-6 pt-lg-3"
                raised
                elevation-5
            >
                <v-card-title>
                    {{ mode }} Transaction
                </v-card-title>

                <v-container fluid>
                    
                    <!-- First row -->
                    <v-row align="center">
                        
                        <!-- Col 1 -->
                        <v-col cols="3">
                            <!-- Indicate type (exp / inc) -->
                            <v-overflow-btn
                                class="mx-2"
                                :items="trackType"
                                label="Type"
                                target="#addToolbar"
                                v-model="type"
                            ></v-overflow-btn>
                        </v-col>
                        
                        <!-- Col 2 -->
                        <v-col cols="3">
                            <!-- Indicate expense category -->
                            <v-overflow-btn
                                class="mx-2"
                                :items="expCat"
                                label="Category"
                                target="#addToolbar"
                                v-model="category"
                                v-if="type==='Expense'"
                            ></v-overflow-btn>

                            <!-- Indicate income category -->
                            <v-overflow-btn
                                class="mx-2"
                                :items="incCat"
                                label="Category"
                                target="#addToolbar"
                                v-model="category"
                                v-else
                            ></v-overflow-btn>
                        </v-col>

                        <!-- Col 3 -->
                        <v-col cols="6">
                            <!-- Indicate note -->
                            <v-text-field 
                                solo
                                class="mx-4" 
                                height="100%"
                                label="Notes"
                                v-model="note"
                                :rules="noteRules"
                            ></v-text-field>

                        </v-col>
                    </v-row>

                    <!-- Second row -->
                    <v-row justify="center">
                        <v-text-field
                            :rules="rules"
                            outlined
                            label="Amount"
                            v-model="money"
                            class="mx-4"
                        ></v-text-field>
                    </v-row>

                </v-container>

                <!-- Card bottom -->
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

        <!-- Second v-dialog for confirmation of deletion -->
    </v-row>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            type: '',
            category: '',
            note: '',
            money: '',
            rules: [
                value => !!value || "An amount is required!",
                value => {
                    const pattern = /^\$?\d+(\.\d{2})?$/
                    return pattern.test(value) || "Invalid amount, commas are not allowed"
                } //pattern looks for numbers and optional decimal with 2 numbers
            ],
            noteRules: [
                value => !!value || "A note is required!"
            ]
        }
    },
    methods: {
        save() {
            if (this.type !== "" && 
                this.category !== "" && 
                this.note !== "" && 
                this.money !== "") {
                    //Close modal
                    this.addModalOpen = false;
                    this.warningOpen = false; // in case warning got opened
                    this.infoText = 'Posting...'
                    this.infoOpen = true;

                    //headers required
                    var headers = {
                        type: this.type,
                        category: this.category,
                        note: this.note,
                        money: this.money
                    };

                    //if all fields filled, send post
                    let url = 'http://localhost:3000/api/posts';
                    if (this.modalEditMode) {
                        axios.put(url + '/id/' + this.modalEditId, headers)
                        .then(res => {
                            this.infoOpen = false;
                            if (res.status === 200) {
                                this.successText = 'Successfully added your new post';
                                this.successOpen = true;
                                //On success, clear all v-model fields
                                this.clearFields();
                            }
                        })
                        .catch(err => {
                            this.infoOpen = false;
                            console.log(err);
                            this.errorText = 'Something went wrong, error: ' + err;
                            this.errorOpen = true;
                        });
                    } else {
                        axios.post(url, headers)
                        .then(res => {
                            this.infoOpen = false;
                            if (res.status === 200) {
                                this.successText = 'Successfully added your new post';
                                this.successOpen = true;
                                //On success, clear all v-model fields
                                this.clearFields();
                            }
                        })
                        .catch(err => {
                            this.infoOpen = false;
                            console.log(err);
                            this.errorText = 'Something went wrong, error: ' + err;
                            this.errorOpen = true;
                        });
                    }
            } else {
                // Form not fully filled
                this.warningOpen = true;
                this.warningText = 'Please fill up all fields!'
            }
        },
        clear () {
            //Modal, check confirmation before cancelling
            console.log("clear button clicked")
        },
        clearFields () {
            this.type = "";
            this.category = "";
            this.money = "";
            this.note = "";
        }
    },
    computed: {
        mode() {
            if (this.modalEditMode) {
                axios.get('http://localhost:3000/api/posts/id/' + this.modalEditId)
                    .then(res => {
                        this.type = res.data.type;
                        this.category = res.data.category;
                        this.money = res.data.money;
                        this.note = res.data.note;
                    })
                    .catch(err => console.log(err));
                return "Edit";
            } else {
                this.type = "";
                this.category = "";
                this.money = "";
                this.note = "";
                return "Add";
            }
        },
        modalEditId: {
            get () {
                return this.$store.state.addModal.modalEditId
            }
        },
        modalEditMode: {
            get () {
                return this.$store.state.addModal.modalEditMode;
            },
            set (bool) {
                this.$store.commit('addModal/set_modalEditMode', bool);
            }
        },
        trackType: {
            get () {
                return this.$store.state.track.trackType;
            }
        },
        incCat: {
            get () {
                return this.$store.state.track.incCat;
            }
        },
        expCat: {
            get () {
                return this.$store.state.track.expCat;
            }
        },
        addModalOpen: {
            get () {
                return this.$store.state.addModal.addModalOpen;
            },
            set (bool) {
                this.$store.commit('addModal/set_addModalOpen', bool);
            }
        },
        successText: {
            get () {
                return this.$store.state.alerts.successText
            },
            set (text) {
                this.$store.commit('alerts/set_successText', text);
            }
        },
        infoText: {
            get () {
                return this.$store.state.alerts.infoText
            },
            set (text) {
                this.$store.commit('alerts/set_infoText', text);
            }
        },
        warningText: {
            get () {
                return this.$store.state.alerts.warningText
            },
            set (text) {
                this.$store.commit('alerts/set_warningText', text);
            }
        },
        errorText: {
            get () {
                return this.$store.state.alerts.errorText
            },
            set (text) {
                this.$store.commit('alerts/set_errorText', text);
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