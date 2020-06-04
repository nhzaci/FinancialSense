<template>
    <v-container fluid>

        <!-- Top title banner -->
        <v-row>
            <v-card
                width="100%"
                class="mt-10 mx-10 mt-5 pa-3"
                color="orange darken-4"
                elevation-10
            >
                <v-card-title class="display-1 font-weight-bold">
                    Transaction History
                </v-card-title>
                <v-card-actions>
                    <v-row align="center" justify="end">
                        <v-col>
                            <v-card>
                                <v-card-title>
                                    Filters
                                </v-card-title>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-overflow-btn
                                :items="['Income', 'Expense']"
                                label="Type"
                                :loading="loadingDB"
                            ></v-overflow-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-overflow-btn
                                :items="['Income', 'Expense']"
                                label="Category"
                                :loading="loadingDB"
                            ></v-overflow-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-overflow-btn
                                :items="['YTD', 'All-Time']"
                                label="Duration"
                                :loading="loadingDB"
                            ></v-overflow-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-row>

        <!-- 3 summary cards alike home page -->
        <v-row justify-center class="ma-5">

            <!-- Overall Balance -->
            <v-col>
                <OverviewCard title="Balance" :amount="balance"/>
            </v-col>

            <!-- Expenditure -->
            <v-col>
                <OverviewCard title="Expense" :amount="expense"/>
            </v-col>

            <!-- Income -->
            <v-col>
                <OverviewCard title="Income" :amount="income" />
            </v-col>
            
        </v-row>

        <!-- Skeleton loader while loading -->
        <v-skeleton-loader
            v-if="loadingDB"
            class="px-10"
            height="100"
            type="list-item-two-line"
        />

        <!-- Expansion panels for all transactions here -->
        <v-expansion-panels 
            v-if="!loadingDB"
            class="px-10"
            hover
            focusable
            popout
            multiple
        >
            <v-expansion-panel
                v-for="item in dbArray"
                :key="item._id"
            >

                <!-- Panel header text -->
                <v-expansion-panel-header 
                    class="font-weight-bold display-1" 
                >
                    <span :style="getColour(item)">
                        {{ customHeader(item) }}
                    </span>
                    <!-- Custom icon for income / expenses -->
                    <template v-slot:actions>
                        <v-icon color="green" v-if="item.type=='Income'">mdi-plus</v-icon>
                        <v-icon color="red" v-else>mdi-minus</v-icon>
                    </template>
                </v-expansion-panel-header>

                <!-- Panel content -->
                <v-expansion-panel-content>

                    <!-- Row 1 -->
                    <v-row>
                        <v-col cols="4">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Amount
                                </v-card-title>
                                <v-card-text class="text-center headline font-weight-bold">
                                    {{ item.money }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Type
                                </v-card-title>
                                <v-card-text class="text-center title">
                                    {{ item.type }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Category
                                </v-card-title>
                                <v-card-text class="text-center title">
                                    {{ item.category }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Date
                                </v-card-title>
                                <v-card-text class="text-center title">
                                    {{ formatDate(item.date) }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <!-- Row 2 -->
                    <v-row>
                        <v-card width="100%">
                            <v-card-title class="justify-center">
                                Note
                            </v-card-title>
                            <v-card-text class="text-center title">
                                {{ item.note }}
                            </v-card-text>
                        </v-card>
                    </v-row>

                    <!-- Row 3 -->
                    <v-row align="center" justify="start" class="mt-5">
                        <v-btn
                            color="primary"
                            class="mx-2"
                            @click="edit(item._id)"
                        >
                            EDIT
                        </v-btn>
                        <v-btn
                            color="error"
                            class="mx-2"
                            @click="del(item._id)"
                        >
                            DELETE
                        </v-btn>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <DialogModal @confirm="confirmDelete"/>
    </v-container>
</template>

<script>
import axios from 'axios';
import DialogModal from '@/components/DialogModal';
import OverviewCard from '@/components/OverviewCard';

export default {
    data () {
        return {
            duration: '',
            type: '',
            category: '',
            deleteId: ''
        }
    },
    components: {
        DialogModal,
        OverviewCard
    },
    methods: {
        customHeader (item) {
            let text, sign;
            if (item.type === "Expense" || item.type === "Expenses") {
                text = " spent on "
                sign = "- "
            } else {
                text = " saved from "
                sign = "+ "
            }
            return sign + item.money + ' on ' + this.formatDate(item.date);
        },
        getColour (item) {
            if (item.type === "Expense") {
                return 'color:Crimson'
            } else {
                return 'color:MediumSeaGreen'
            }
        },
        formatDate (date) {
            let dateObj = new Date(date);
            return dateObj.getDate() + ' ' + this.months[dateObj.getMonth()] + ' ' + dateObj.getFullYear()
        },
        edit(id) {
            //Toggle modal for editing, editmode true
            this.modalEditId = id;
            console.log(this.modalEditId)
            this.modalEditMode = true;
            this.addModalOpen = true;
        },
        del(id) {
            //Add id to data
            this.deleteId = id;
            //Modal to confirm
            this.dialogModalOpen = true;
            this.dialogModalTitle = 'Confirm Delete'
            this.dialogModalText = 'Are you sure you want to delete this transaction?'
            this.dialogModalYes = 'Confirm'
            this.dialogModalNo = 'Cancel'
        },
        async confirmDelete() {
            //on confirm, send axios delete request and trigger alert banner
            this.infoOpen = true;
            this.infoText = 'Deleting...';
            let url = `http://localhost:3000/api/posts/id/${this.deleteId}`;
            try {
                let res = await axios.delete(url);
                if (res.status === 200) {
                    this.infoOpen = false;
                    this.successText = 'Your post was successfully deleted';
                    this.successOpen = true;
                }
            } catch (error) {
                this.infoOpen = false;
                console.log(error);
                this.errorText = 'Something went wrong, error: ' + error;
                this.errorOpen = true;
            }
        }
    },
    computed: {
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
        dialogModalTitle: {
            get () {
                return this.$store.state.dialogModal.dialogModalTitle;
            },
            set (bool) {
                this.$store.commit('dialogModal/set_dialogModalTitle', bool);
            }
        },
        dialogModalYes: {
            get () {
                return this.$store.state.dialogModal.dialogModalYes;
            },
            set (bool) {
                this.$store.commit('dialogModal/set_dialogModalYes', bool);
            }
        },
        dialogModalNo: {
            get () {
                return this.$store.state.dialogModal.dialogModalNo;
            },
            set (bool) {
                this.$store.commit('dialogModal/set_dialogModalNo', bool);
            }
        },
        dialogModalText: {
            get () {
                return this.$store.state.dialogModal.dialogModalText;
            },
            set (bool) {
                this.$store.commit('dialogModal/set_dialogModalText', bool);
            }
        },
        dialogModalOpen: {
            get () {
                return this.$store.state.dialogModal.dialogModalOpen;
            },
            set (bool) {
                this.$store.commit('dialogModal/set_dialogModalOpen', bool);
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
        modalEditMode: {
            get () {
                return this.$store.state.addModal.modalEditMode;
            },
            set (bool) {
                this.$store.commit('addModal/set_modalEditMode', bool);
            }
        },
        modalEditId: {
            get () {
                return this.$store.state.addModal.modalEditId;
            },
            set (bool) {
                this.$store.commit('addModal/set_modalEditId', bool);
            }
        },
        balance: {
          get () {
            return this.$store.state.balance
          }
        },
        income: {
          get () {
            return this.$store.state.income
          }
        },
        expense: {
          get () {
            return this.$store.state.expense
          }
        },
        months: {
            get () {
                return this.$store.state.months;
            }
        },
        dbArray: {
            get () {
                return this.$store.state.dbArray;
            }
        },
        loadingDB: {
            get () {
                return this.$store.state.loadingDB;
            }
        },
        filteredDB () {
            let clonedDB = [...this.dbArray];
            //operations to filter if filters are set
            if (this.duration !== '') {

            }
            if (this.type !== '') {
                
            }
            if (this.category !== '') {
                
            }
            return clonedDB
        }
    },
    created() {
        this.$store.dispatch('get_dbArray')
        this.$store.dispatch('get_balance');
        this.$store.dispatch('get_income');
        this.$store.dispatch('get_expense');
    }
}
</script>