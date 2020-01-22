<template>
    <main id="app">
        <GridWidgetLayout>
            <smart-widget-grid :layout="this.grid.layouts.head" :isStatic="true">
                <smart-widget slot="0" simple>
                    <div class="layout-center"></div>
                </smart-widget>
            </smart-widget-grid>
            <smart-widget-grid :layout="this.grid.layouts.body" :isStatic="true">
                <smart-widget slot="0" title="RACE AND GENDER DISTRIBUTION" subTitle="" :loading="isLoading">
                    <div class="layout-center chart-container">
                        <hr class="sep"/>
                        <CensusBarChart v-bind="this.charts.bar.race_genders_all"/>
                        <hr class="sep"/>
                        <CensusBarChart v-bind="this.charts.bar.race_genders_online"/>
                    </div>
                </smart-widget>
                <smart-widget slot="1" title="1" :loading="isLoading">
                    <div class="layout-center">
                    </div>
                </smart-widget>
            </smart-widget-grid>
        </GridWidgetLayout>
    </main>
</template>

<script>
    import FirebaseService from '@/services/firebase.service';
    import censusSnapshot from '@/misc/test_data/census-snapshot';
    import GridWidgetLayout from "@/components/tailwind/layout/GridWidgetLayout";
    import CensusBarChart from "@/components/tailwind/chart/bar/CensusBarChart";

    import { raceGendersChartTransformer } from "@/transformers/from-model/race-genders-chart.transformer";

    export default {
        name: 'app',
        components: {
            GridWidgetLayout,
            CensusBarChart
        },
        mixins: [

        ],
        created() {
            /*let firebaseService = new FirebaseService(window._config.FIREBASE_CONFIG);
            firebaseService.database.ref('/profiles').once('value')
                .then(function (snapshot) {
                });*/
        },
        mounted() {

        },
        data: function () {
            return {
                isLoading: false,
                coorsProxyUrl: "https://cors-anywhere.herokuapp.com/",
                eden: {
                    api: {
                        endpoints: {
                            get: {
                                onlineCharacters: 'https://www.edenxi.com/ajax/onlinecharacters',
                            }
                        }
                    },
                    data: {
                        onlineCharacters: [],
                        snapshot: censusSnapshot,
                    }
                },
                grid: {
                    layouts: {
                        head: [
                            { x: 0, y: 0, w: 12, h: 3, i: "0" },
                        ],
                        body: [
                            { x: 0, y: 0, w: 12, h: 17, i: "1" },
                            { x: 0, y: 0, w: 12, h: 20, i:  "0" }
                        ]
                    }
                },
                charts: {
                    bar: {
                        race_genders_all: {
                            data: this.censusSnapshot,
                            options: this.getCommonChartOptions({}),
                            transformer: raceGendersChartTransformer,
                            title: "All Characters"
                        },
                        race_genders_online: {
                            data: this.censusSnapshot,
                            options: this.getCommonChartOptions({}),
                            transformer: raceGendersChartTransformer,
                            title: "Active Characters"
                        }
                    }
                }
            }
        },
        methods: {
            fetchOnlineCharacters() {
                const self = this;
                self.isLoading = true;

                window.axios.get(self.coorsProxyUrl + self.eden.api.endpoints.get.onlineCharacters)
                    .then(function(response) {
                        self.onlineCharacters = response.data.characters;
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(function () {
                        self.isLoading = false;
                    });
            },
            getCommonChartOptions(merged={}) {
                return window._.merge({
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'bottom',
                        labels: {
                            fontColor: 'rgba(255, 255, 255, 0.54)'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'rgba(255, 255, 255, 0.54)'
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'rgba(255, 255, 255, 0.54)',
                            }
                        }]
                    }
                }, merged);
            }
        },
        computed: {
            onlineCharacters: {
                get: function () {
                    return this.eden.data.onlineCharacters
                },
                set: function (val) {
                    this.eden.data.onlineCharacters = val;
                }
            },
            censusSnapshot: {
                get: function () {
                    return this.eden.data.snapshot
                },
                set: function (val) {
                    this.eden.data.snapshot = val;
                }
            }
        }
    }
</script>

<style scoped>
</style>
