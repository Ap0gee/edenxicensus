<template>
    <main id="app">
        <vue-progress-bar />
        <vue-particles
            color="#dedede"
            linesColor="#dedede"
            shapeType="triangle"
            hoverMode="grab"
            clickMode="repulse"
            v-bind="this.particles"
        />
        <grid-widget-layout>
            <smart-widget-grid :layout="this.grid.layouts.head" :isStatic="true">
                <smart-widget slot="0" simple>
                    <div class="absolute crystal"><img src="/img/crystal.png" width="250" height="250"/></div>
                </smart-widget>
            </smart-widget-grid>
            <div class="px-3">
                <modified-fixed-header v-bind="this.header" v-on:change="headerChange">
                </modified-fixed-header>
            </div>
            <smart-widget-grid :layout="this.grid.layouts.body" :isStatic="true">
                <smart-widget slot="0" title="RACE AND GENDER DISTRIBUTION" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap justify-center h-full">
                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>
                        <CensusBarChart v-bind="this.charts.bar.all.race_genders"/>
                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>
                        <CensusBarChart v-bind="this.charts.bar.online.race_genders"/>
                    </div>
                </smart-widget>
            </smart-widget-grid>
        </grid-widget-layout>
    </main>
</template>

<script>
    import FirebaseService from '@/services/firebase.service';
    import progressBarMixin from '@/mixins/progress-bar.mixin';
    import testCensusSnapshot from '@/misc/test_data/census-snapshot';
    import GridWidgetLayout from "@cX/layout/GridWidgetLayout";
    import CensusBarChart from "@cX/chart/bar/CensusBarChart";
    import ModifiedFixedHeader from "@cX/ui/header/ModifiedFixedHeader";

    import { raceGendersChartTransformer } from "@/transformers/from-model/race-genders-chart.transformer";

    export default {
        name: 'app',
        components: {
            GridWidgetLayout,
            ModifiedFixedHeader,
            CensusBarChart
        },
        mixins: [
            progressBarMixin
        ],
        created() {
            /*let firebaseService = new FirebaseService(window._config.FIREBASE_CONFIG);
            firebaseService.database.ref('/profiles').once('value')
                .then(function (snapshot) {
                });*/
            this.progressStart();
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
                        characterProfiles: [],
                        snapshots: {
                            all: testCensusSnapshot,
                            online: {}
                        },
                    }
                },
                header: {
                    threshold: 205
                },
                particles: {
                    particleOpacity:"0.7",
                    particlesNumber:"80",
                    particleSize:"4",
                    linesWidth:"1",
                    lineLinked:"true",
                    lineOpacity:"0.4",
                    linesDistance:"150",
                    moveSpeed:"3",
                    hoverEffect:"true",
                    clickEffect:"true"
                },
                grid: {
                    layouts: {
                        head: [
                            { x: 0, y: 0, w: 12, h: 3, i: "0" },
                        ],
                        nav: [
                            { x: 0, y: 0, w: 12, h: 1, i: "0" },
                        ],
                        body: [

                            { x: 0, y: 0, w: 12, h: 21, i:  "0" }
                        ]
                    }
                },
                charts: {
                    bar: {
                        online: {
                            race_genders: {
                                data: this.onlineSnapshot,
                                options: this.getCommonChartOptions({}),
                                transformer: raceGendersChartTransformer,
                                title: "Online Characters"
                            }
                        },
                        all: {
                            race_genders: {
                                data: this.allSnapshot,
                                options: this.getCommonChartOptions({}),
                                transformer: raceGendersChartTransformer,
                                title: "All Characters"
                            },
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
            },
            headerChange(fixed) {
                console.log(fixed, window.pageYOffset, document.documentElement.scrollTop);
            }
        },
        computed: {
            onlineCharacters: {
                get: function () {
                    return this.eden.data.onlineCharacters;
                },
                set: function (val) {
                    this.eden.data.onlineCharacters = val;
                }
            },
            allSnapshot: {
                get: function () {
                    return this.eden.data.snapshots.all;
                },
                set: function (val) {
                    this.eden.data.snapshots.all = val;
                }
            },
            onlineSnapshot: {
                get: function () {
                    return this.eden.data.snapshots.online;
                },
                set: function (val) {
                    this.eden.data.snapshots.online = val;
                }
            }
        }
    }
</script>

<style scoped>
</style>
