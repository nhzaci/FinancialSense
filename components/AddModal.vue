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
                        <v-col cols="12" md="3">
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
                        <v-col cols="12" md="3">
                            <!-- Indicate expense category -->
                            <v-overflow-btn
                                class="mx-2"
                                :items="expCat"
                                label="Category"
                                target="#addToolbar"
                                v-model="category"
                                v-if="type === 'Expense'"
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
                        <v-col cols="12" md="6">
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
                    <v-btn class="mx-2" color="primary" large @click="save">
                        Save
                    </v-btn>
                    <v-btn class="mx-2" color="error" large @click="clear">
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
import { mapState, mapMutations } from 'vuex';

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
        fieldsFilled() {
            if (this.type !== "" && 
            this.category !== "" && 
            this.note !== "" &&
            this.money !== "") {
                return true;
            }
            return false;
        },
        catchError(err) {
            this.setInfoOpen(false);
            console.log(err);
            this.setErrorText('Something went wrong, error: ' + err);
            this.setErrorOpen(true);
        },
        success(modeString) {
            this.setSuccesText('Successfully ' + modeString);
            this.setSuccessOpen(true);
            this.clearFields();
        },
        async save() {
            if (fieldsFilled) {
                    //Close modal
                    this.addModalOpen = false;
                    this.setWarningOpen(false); // in case warning got opened
                    this.setInfoText('Posting...');
                    this.setInfoOpen(true);

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
                        await axios.put(url + '/id/' + this.modalEditId, headers)
                        .then(res => {
                            this.infoOpen = false;
                            if (res.status === 200) {
                                success('edited your post!');
                            }
                        })
                        .catch(err => {
                            this.catchError(err);
                        });
                    } else {
                        axios.post(url, headers)
                        .then(res => {
                            this.infoOpen = false;
                            if (res.status === 201) {
                                success('added your post!');
                            }
                        })
                        .catch(err => {
                            this.catchError(err);
                        });
                    }
            } else {
                // Form not fully filled
                this.setWarningOpen(true);
                this.setWarningText('Please fill up all fields!');
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
        },
        ...mapMutations({
            setModalEditMode: 'addModal/set_modalEditMode',
            setSuccessText: 'alerts/set_successText',
            setInfoText: 'alerts/set_infoText',
            setWarningText: 'alerts/set_warningText',
            setErrorText: 'alerts/set_errorText',
            setInfoOpen: 'alerts/set_infoOpen',
            setSuccessOpen: 'alerts/set_successOpen',
            setWarningOpen: 'alerts/set_warningOpen',
            setErrorOpen: 'alerts/set_errorOpen'
        })
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
        addModalOpen: {
            get() {
                return this.$store.state.addModal.addModalOpen;
            },
            set(bool) {
                this.$store.commit('addModal/set_addModalOpen', bool);
            }
        },
        ...mapState({
            modalEditId: state => state.addModal.modalEditId,
            modalEditMode: state => state.addModal.modalEditMode,
            trackType: state => state.track.trackType,
            incCat: state => state.track.incCat,
            expCat: state => state.track.expCat,
            successText: state => state.alerts.successText,
            infoText: state => state.alerts.infoText,
            warningText: state => state.alerts.warningText,
            errorText: state => state.alerts.errorText,
            successOpen: state => state.alerts.successOpen,
            warningOpen: state => state.alerts.warningOpen,
            errorOpen: state => state.alerts.errorOpen
        })
    }
}
</script>