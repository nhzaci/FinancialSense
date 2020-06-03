<template>
    <v-expansion-panel>

        <!--Placeholder while loading -->
        <v-expansion-panel-header 
            class="headline font-weight-bold"
            v-if="loading"
        >
            Summary for {{ formattedDate }}
        </v-expansion-panel-header>

        <!-- Actual panel when loaded -->
        <v-expansion-panel-header 
            class="headline font-weight-bold"
            v-if="!loading"
        >
            Summary for {{ formattedDate }} ({{ formattedBalance }})
            <!-- Custom icon for income / expenses -->
            <template v-slot:actions>
                <v-icon color="green" v-if="balance >= 0">mdi-plus</v-icon>
                <v-icon color="red" v-else>mdi-minus</v-icon>
            </template>
        </v-expansion-panel-header>

        <!-- Panel content holding the cards -->
        <v-expansion-panel-content v-if="!loading">
            <v-row>

                <!-- Col 1 -->
                <v-col cols="4">
                    <v-card>
                        <v-card-title style="color:lightBlue;">
                            Balance: {{ balance }}
                        </v-card-title>
                    </v-card>
                </v-col>

                <!-- Col 2 -->
                <v-col cols="4">
                    <v-card>
                        <v-card-title style="color:red;">
                            Expense: {{ expense }}
                        </v-card-title>
                    </v-card>
                </v-col>

                <!-- Col 3 -->
                <v-col cols="4">
                    <v-card>
                        <v-card-title style="color:green;">
                            Income: {{ income }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            dataArray: [],
            loading: true,
            balance: '',
            expense: '',
            income: ''
        }
    },
    props: {
        year: {
            type: String
        },
        month: {
            type: String
        }
    },
    methods: {
    },
    computed: {
        months: {
            get () {
                return this.$store.state.months;
            }
        },
        formattedDate () {
            let date = new Date(this.year, this.month, 1);
            return date.getFullYear() + ' ' + this.months[date.getMonth()];
        },
        formattedBalance () {
            if (this.balance > 0) {
                return '+' + String(this.balance);
            }
            return this.balance;
        }
    },
    created() {
        let url = `http://localhost:3000/api/posts/date/${this.year}/${this.month}`;
        axios.get(url)
            .then(res => {
                this.dataArray = res.data;
                var i, j;
                for (i = 0; i < this.dataArray.length; i++) {
                    let curr = this.dataArray[i];
                        if (curr.type === "Expense") {
                            this.expense += curr.money;
                            this.balance -= curr.money;
                        } else {
                            this.income += curr.money;
                            this.balance += curr.money;
                        }
                }
                this.loading = false;
                const format2DP = x => Math.round(x * 100) / 100;
                this.balance = format2DP(this.balance);
                this.income = format2DP(this.income);
                this.expense = format2DP(this.expense);
            })
            .catch(err => console.log(err));
    }
}
</script>