<template>
    <v-container fluid>

        <v-skeleton-loader
            v-if="loadingDB"
            height="94"
            type="list-item-two-line"
        />
        
        <v-expansion-panels popout v-else>
            <v-expansion-panel
                v-for="item in dbArray"
                :key="item._id"
            >
                <v-expansion-panel-header 
                    class="font-weight-bold display-1" 
                    v-html="colourHeader(item)"
                />
                <v-expansion-panel-content>
                    <p>
                        <span class="font-weight-bold">Type: </span>{{ item.type }}
                    </p>
                    <p>
                        <span class="font-weight-bold">Category: </span>{{ item.category }}
                    </p>
                    <p>
                        <span class="font-weight-bold">Note: </span>{{ item.note }}
                    </p>
                    <p>
                        <span class="font-weight-bold">Date: </span>{{ item.date }}
                    </p>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

    </v-container>
</template>

<script>

export default {
    components: {
    },
    methods: {
        colourHeader (item) {
            let color;
            let text;
            if (item.type === "Expenses") {
                color = 'red';
                text = 'spent';
            } else {
                color = 'green';
                text = 'saved';
            }
            return `<span style="color:${color};"> ${item.money} ${text} on ${item.category} on ${this.formatDate(item.date)} </span>`;
            
        },
        formatDate (date) {
            let dateObj = new Date(date);
            return dateObj.getFullYear() + ' ' + this.months[dateObj.getMonth()]
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