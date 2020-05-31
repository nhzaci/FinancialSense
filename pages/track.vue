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
                <OverviewCard title="Balance" :amount="Number(1234.12)"/>
            </v-col>

            <!-- Expenditure -->
            <v-col>
                <OverviewCard title="Expense" :amount="Number(5334.64)"/>
            </v-col>

            <!-- Income -->
            <v-col>
                <OverviewCard title="Income" :amount="Number(6568.76)" />
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
                        >
                            EDIT
                        </v-btn>
                        <v-btn
                            color="error"
                            class="mx-2"
                        >
                            DELETE
                        </v-btn>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

    </v-container>
</template>

<script>
import OverviewCard from '@/components/OverviewCard';

export default {
    data () {
        return {
            duration: '',
            type: '',
            category: ''
        }
    },
    components: {
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
        }
    },
    computed: {
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
    }
}
</script>