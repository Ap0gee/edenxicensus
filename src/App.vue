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
                    <div class="crystal-container">
                        <span class="crystal-btn" @click.prevent="powerCrystal"></span>
                        <span class="crystal-power">
                            <!--<particle-button />-->
                        </span>
                        <div class="absolute crystal no-select" :class="{'shake': this.crystal.shake, 'hard-shake': this.crystal.hard_shake, 'shudder': this.crystal.shudder }"><img src="/img/crystal.png" width="250" height="250"/></div>
                    </div>
                </smart-widget>
            </smart-widget-grid>
            <div class="px-3">
                <modified-fixed-header v-bind="this.header" v-on:change="onFixedHeaderChange">
                    <div class="flex flex-row flex-no-wrap justify-end max-h-full">
                        <div class="crystal-container--isFixed w-full h-full" :class="{'shrink': this.crystal.condensed}" v-if="this.crystal.condensed">
                            <span class="crystal-btn" @click.prevent="powerCrystal"></span>
                            <span class="crystal-power">

                            </span>
                            <div class="absolute crystal no-select" :class="{'shake': this.crystal.shake, 'hard-shake': this.crystal.hard_shake, 'shudder': this.crystal.shudder }"><img src="/img/crystal.png" width="250" height="250"/></div>
                        </div>
                        <div class="flex-initial">

                        </div>
                    </div>
                </modified-fixed-header>
            </div>
            <smart-widget-grid :layout="this.grid.layouts.body" :isStatic="true">
                <smart-widget slot="0" title="CHARACTER TOTALS" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap justify-start h-full">
                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>
                        <div class="flex flex-auto flex-col flex-no-wrap justify-around h-full">
                            <div class="flex flex-auto flex-col flex-no-wrap justify-center h-full">
                                <div class="flex-initial text-2xl text-darkDisabled">All Characters*</div>
                                <div class="flex-initial text-6xl text-white" v-text="this.totalCharacters"></div>
                            </div>
                            <div class="flex flex-auto flex-col flex-no-wrap justify-center h-full">
                                <div class="flex-initial text-2xl text-darkDisabled">Online Characters</div>
                                <div class="flex-initial text-6xl text-white" v-text="this.totalOnline"></div>
                            </div>
                        </div>
                    </div>
                </smart-widget>
                <smart-widget slot="1" title="RACE AND GENDER DISTRIBUTION" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap justify-center h-full">

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <div class="flex flex-row flex-wrap flex-auto justify-between">
                            <census-doughnut-chart v-bind="this.charts.doughnut.all.genders" />
                            <census-doughnut-chart v-bind="this.charts.doughnut.online.genders" />
                        </div>

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <CensusBarChart v-bind="this.charts.bar.all.race_genders"/>

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <CensusBarChart v-bind="this.charts.bar.online.race_genders"/>

                        <div class="flex flex-col flex-no-wrap flex-auto justify-center">

                        </div>
                    </div>
                </smart-widget>
            </smart-widget-grid>
        </grid-widget-layout>
    </main>
</template>

<script>
    import FirebaseService from '@/services/firebase.service';
    import progressBarMixin from '@/mixins/progress-bar.mixin';
    import GridWidgetLayout from "@cX/layout/GridWidgetLayout";
    import CensusBarChart from "@cX/chart/bar/CensusBarChart";
    import ModifiedFixedHeader from "@cX/ui/header/ModifiedFixedHeader";
    import CensusDoughnutChart from "@cX/chart/doughnut/CensusDoughnutChart";
    import ParticleButton from "@cX/common/ui/ParticleButton";

    const censusModel = require('@/models/census-data.model');
    const  { craftsTransformer } = require('@/transformers/from-object/crafts.transformer');
    const  { facesTransformer} = require("@/transformers/from-object/faces.transformer");
    const  { jobsTransformer } = require("@/transformers/from-object/jobs.transformer");
    const  { nationsTransformer} = require("@/transformers/from-object/nations.transformer");
    const  { racesTransformer} = require("@/transformers/from-object/races.transformer");
    const  { gendersTransformer} = require("@/transformers/from-object/genders.transformer");
    const  { sizesTransformer } = require("@/transformers/from-object/sizes.transformer");
    const  { raceSizesTransformer} = require("@/transformers/from-object/race-sizes.transformer");
    const  { namesTransformer} = require("@/transformers/from-object/names.transformer");
    const  { mentorsTransformer } = require("@/transformers/from-object/mentors.transformer");
    const  { raceGendersTransformer} = require("@/transformers/from-object/race-genders.transformer");
    const  { titlesTransformer} = require("@/transformers/from-object/titles.transformer");

    import { raceGendersChartTransformer } from "@/transformers/from-model/race-genders-chart.transformer";
    import { gendersChartTransformer } from "@/transformers/from-model/genders-chart.transformer";

    const testCensusSnapshot = require('@/misc/test_data/census-snapshot');

    export default {
        name: 'app',
        components: {
            GridWidgetLayout,
            ModifiedFixedHeader,
            CensusBarChart,
            CensusDoughnutChart,
           /* ParticleButton*/
        },
        mixins: [
            progressBarMixin
        ],
        created() {
            //const firebaseService = new FirebaseService(window._config.FIREBASE_CONFIG);
            this.progressSet(0);

           /* this.fetchCharacterResources(firebaseService);
            this.fetchRemoteSnapshot(firebaseService);
            this.fetchTotalCharactersCount(firebaseService);*/
            this.isLoading = true;
            this.allSnapshot = testCensusSnapshot;
            this.onlineSnapshot = testCensusSnapshot;

            console.log(testCensusSnapshot);

            this.totalCharacters = 3103;
            this.totalOnline = 737;
            this.progressFinish();

        },
        mounted() {
            let self = this;
            this.visible = true;
            this.animateCrystal();

            window.setInterval(function() {
                self.animateCrystal();
            }, 5000);

            window.setInterval(function() {
                if (self.crystal.power > 0) {
                    self.crystal.power -= 1;
                }
                if (self.crystal.power < 12) {
                    self.crystal.shudder = false;
                }
                self.isLoading = false;
            }, 1000);
        },
        data: function () {
            return {
                visible: false,
                isLoading: false,
                coorsProxyUrl: "https://cors-anywhere.herokuapp.com",
                eden: {
                    api: {
                        endpoints: {
                            get: {
                                onlineCharacters: 'https://www.edenxi.com/ajax/onlinecharacters',
                                characterProfiles: 'https://edenxi.com/ajax/character'
                            }
                        }
                    },
                    data: {
                        onlineCharacters: [],
                        characterProfiles: [],
                        totalCharacters: 0,
                        totalOnline: 0,
                        snapshots: {
                            all: {},
                            online: {}
                        },
                    }
                },
                header: {
                    threshold: 205
                },
                crystal: {
                    power: 0,
                    shake: false,
                    hard_shake: false,
                    shudder: false,
                    anim: false,
                    condensed: false
                },
                particles: {
                    particleOpacity: 0.7,
                    particlesNumber: 80,
                    particleSize: 4,
                    linesWidth: 1,
                    lineLinked: true,
                    lineOpacity: 0.4,
                    linesDistance: 150,
                    moveSpeed: 3,
                    hoverEffect: true,
                    clickEffect: true
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
                            { x: 0, y: 0, w: 12, h: 29, i:  "1" },
                            { x: 0, y: 0, w: 12, h: 8, i:  "0" }
                        ]
                    }
                },
                charts: {
                    bar: {
                        online: {
                            race_genders: {
                                data: {},
                                options: this.getCommonChartOptions('bar', {
                                    scales: {
                                        yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: '# of characters'
                                            }
                                        }]
                                    }
                                }),
                                transformer: raceGendersChartTransformer,
                                title: "Online Characters"
                            }
                        },
                        all: {
                            race_genders: {
                                data: {},
                                options: this.getCommonChartOptions('bar', {
                                    scales: {
                                        yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: '# of characters'
                                            }
                                        }]
                                    }
                                }),
                                transformer: raceGendersChartTransformer,
                                title: "All Characters"
                            },
                        }
                    },
                    doughnut: {
                        online: {
                            genders: {
                                data: {},

                                options: this.getCommonChartOptions('doughnut', {
                                    elements: {
                                        center: {
                                            text: 'Online Characters',
                                            fontSize: 15,
                                            color: getComputedStyle(document.documentElement)
                                                .getPropertyValue('--text-color-disabled'),
                                            sidePadding: 15
                                        }
                                    }
                                }),
                                transformer: gendersChartTransformer
                            }
                        },
                        all: {
                            genders: {
                                data: {},

                                options: this.getCommonChartOptions('doughnut', {
                                    elements: {
                                        center: {
                                            text: 'All Characters',
                                            fontSize: 15,
                                            color: getComputedStyle(document.documentElement)
                                                .getPropertyValue('--text-color-disabled'),
                                            sidePadding: 15
                                        }
                                    }
                                }),
                                transformer: gendersChartTransformer
                            }
                        }
                    }
                }
            }
        },
        methods: {
            fetchCharacterResources(firebaseService) {
                const self = this;
                self.isLoading = true;

                window.axios.get(`${ self.coorsProxyUrl }/${ self.eden.api.endpoints.get.onlineCharacters }`)
                    .then(function(response) {
                        self.onlineCharacters = response.data.characters;
                        self.progressIncrease(20);
                    })
                    .then(function() {
                        self.fetchCharacterProfiles(firebaseService)
                    })
                    .catch(function(error) {
                        console.log(error);
                        self.progressFail();
                        self.isLoading = false;
                    });
            },
            fetchRemoteSnapshot(firebaseService) {
                let self = this;
                let ref = firebaseService.database.ref(`/data/snapshots/${ window.h.now('Y-M') }`);
                ref.orderByChild('last_updated')
                    .limitToLast(1)
                    .once('value')
                    .then(function (snapshot) {
                        if (snapshot.exists()) {
                            let key = window._.keys(snapshot.val())[0];
                            self.allSnapshot = snapshot.val()[key];
                        }
                    }).then(function () {
                        self.progressIncrease(20);
                    })
            },
            fetchCharacterProfiles(firebaseService) {
                let self = this;
                self.onlineCharacters.forEach(function (character) {
                    let ref = firebaseService.database.ref(`/profiles/${ character.charid }`);
                    ref.once('value')
                        .then(function (snapshot) {
                            if (snapshot.exists()) {
                                self.eden.data.characterProfiles.push(snapshot.val());
                            } else {
                                window.axios.get(`${ self.coorsProxyUrl }/${ self.eden.api.endpoints.get.characterProfiles }?id=${ character.charid }`)
                                    .then(function (response) {
                                        self.eden.data.characterProfiles.push(response.data);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        self.progressFail();
                                        self.isLoading = false;
                                    })
                            }
                        })
                });
            },
            fetchTotalCharactersCount(firebaseService) {
                let self = this;
                let ref = firebaseService.database.ref(`/characters/`);
                ref.once('value')
                    .then(function (snapshot) {
                        self.totalCharacters = window._.keys(snapshot.val()).length;
                    }).then(function () {
                        self.progressIncrease(20);
                    });
            },
            buildLocalSnapshot() {
                this.characterProfiles.forEach(function(profile) {
                    craftsTransformer(profile, censusModel);
                    facesTransformer(profile, censusModel);
                    jobsTransformer(profile, censusModel);
                    nationsTransformer(profile, censusModel);
                    racesTransformer(profile, censusModel);
                    gendersTransformer(profile, censusModel);
                    sizesTransformer(profile, censusModel);
                    raceSizesTransformer(profile, censusModel);
                    namesTransformer(profile, censusModel);
                    mentorsTransformer(profile, censusModel);
                    raceGendersTransformer(profile, censusModel);
                    titlesTransformer(profile, censusModel);
                });
                this.onlineSnapshot = censusModel;
                this.progressFinish();
                this.isLoading = false;
            },
            getCommonChartOptions(type, merged={}) {
                let types = {
                    common: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            position: 'bottom',
                            labels: {
                                fontColor: 'rgba(255, 255, 255, 0.54)'
                            }
                        },
                    },
                    bar: {
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
                    },
                    doughnut: {
                        animation: {
                            animateScale: true
                        }
                    }
                };
                let typedOpts = window._.merge(types['common'], types[type]);
                return window._.merge(typedOpts, merged);
            },
            powerCrystal() {
                this.crystal.power += 1;
                this.animateCrystal();
            },
            animateCrystal() {
                if (! this.crystal.anim) {
                    this.crystal.anim = true;
                    if (this.crystal.power >= 12) {
                        this.hardShakeCrystal();
                    } else {
                        this.shakeCrystal();
                    }
                }
            },
            shakeCrystal() {
                let self = this;
                if (! this.crystal.shake) {
                    this.crystal.shake = true;
                    setTimeout(function () {
                        self.crystal.anim = false;
                        self.crystal.shake = false;
                    }, 900);
                }
            },
            hardShakeCrystal() {
                let self = this;
                if (! this.crystal.hard_shake) {
                    this.crystal.hard_shake = true;

                    if (this.crystal.shudder) {
                        this.crystal.shudder = false;
                    }

                    setTimeout(function () {
                        self.crystal.anim = false;
                        self.crystal.hard_shake = false;

                        if (self.crystal.power >= 12) {
                            self.crystal.shudder = true;
                        }
                    }, 900);
                }
            },
            onFixedHeaderChange(fixed, currentScrollPos, threshold) {
                if (currentScrollPos !== undefined && threshold !== undefined) {
                    this.crystal.condensed = currentScrollPos >= threshold;
                }
            },
            onParticleButtonChange(visible) {
            },
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
            characterProfiles: {
                get: function () {
                    return this.eden.data.characterProfiles;
                },
                set: function (val) {
                    this.eden.data.characterProfiles = val;
                }
            },
            totalCharacters: {
                get: function () {
                    return this.eden.data.totalCharacters;
                },
                set: function (val) {
                    this.eden.data.totalCharacters = val;
                }
            },
            totalOnline: {
                get: function () {
                    return this.eden.data.totalOnline;
                },
                set: function (val) {
                    this.eden.data.totalOnline = val;
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
        },
        watch: {
            allSnapshot: function(newVal) {
                this.charts.bar.all.race_genders.data = newVal;
                this.charts.doughnut.all.genders.data = newVal;
            },
            onlineSnapshot:  function(newVal) {
                this.charts.bar.online.race_genders.data = newVal;
                this.charts.doughnut.online.genders.data = newVal;
            },
            characterProfiles: function(newVal) {
                if(newVal.length === this.onlineCharacters.length) {
                    this.progressIncrease(20);
                    this.buildLocalSnapshot();
                }
            }
        }
    }
</script>

<style scoped>
</style>
