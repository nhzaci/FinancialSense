<template>
    <v-container fluid>

        <!-- Floating tool bar to add new transactions -->

        <v-skeleton-loader
            v-if="loadingDB"
            height="94"
            width="60%"
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
import AddToolbar from '@/components/AddToolbar';

export default {
    components: {
        AddToolbar
    },
    methods: {
        colourHeader (item) {
            if (item.type === "Expenses") {
                return '<span style="color:red;">' + item.money + ' - ' + item.category + '</span>';
            } else {
                return '<span style="color:green;">' + item.money + ' - ' + item.category + '</span>';
            }
        }
    },
    computed: {
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