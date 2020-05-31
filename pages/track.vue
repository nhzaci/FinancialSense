<template>
    <v-container fluid>

        <!-- Top title banner -->
        <v-row>
            <v-card
                width="100%"
                class="ma-10 mt-5 pa-3"
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
                    <v-row>
                        <v-col cols="4">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Amount:
                                </v-card-title>
                                <v-card-text class="text-center headline font-weight-bold">
                                    {{ item.money }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Type:
                                </v-card-title>
                                <v-card-text class="text-center">
                                    {{ item.type }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Category:
                                </v-card-title>
                                <v-card-text class="text-center">
                                    {{ item.category }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Note:
                                </v-card-title>
                                <v-card-text class="text-center">
                                    {{ item.note }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="2">
                            <v-card>
                                <v-card-title class="justify-center">
                                    Date:
                                </v-card-title>
                                <v-card-text class="text-center">
                                    {{ formatDate(item.date) }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

    </v-container>
</template>

<script>
export default {
    data () {
        return {
            duration: 'YTD',
            type: '',
            category: ''
        }
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
        }
    },
    created() {
        this.$store.dispatch('get_dbArray')
    }
}
</script>