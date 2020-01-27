<template>
    <main id="app">
        <vue-progress-bar />
        <vue-particles
            v-bind="this.particles"
            :key="this.particles.key"
        />
        <grid-widget-layout>
            <smart-widget-grid :layout="this.grid.layouts.head" :isStatic="true">
                <smart-widget slot="0" simple>
                    <div class="crystal-container no-select " v-if="!this.crystal.condensed">
                        <span class="crystal-btn no-select" @click.prevent="powerCrystal"></span>
                        <span class="crystal-power no-select">
                            <!--<particle-button />-->
                        </span>
                        <div class="absolute crystal no-select" :class="{'shake': this.crystal.shake, 'hard-shake': this.crystal.hard_shake, 'shudder': this.crystal.shudder}"><img :class="{'spin': this.crystal.spin}" src="/img/crystal.png" width="250" height="250"/></div>
                    </div>
                </smart-widget>
            </smart-widget-grid>
            <div class="px-3">
                <modified-fixed-header v-bind="this.header" v-on:change="onFixedHeaderChange">
                    <div class="flex flex-row flex-no-wrap justify-end max-h-full">
                        <div class="crystal-container--isFixed w-full h-full " :class="{'shrink': this.crystal.condensed}" v-if="this.crystal.condensed">
                            <span class="crystal-btn no-select" @click.prevent="powerCrystal"></span>
                            <span class="crystal-power">

                            </span>
                            <div class="absolute crystal no-select" :class="{'shake': this.crystal.shake, 'hard-shake': this.crystal.hard_shake, 'shudder': this.crystal.shudder}"><img :class="{'spin': this.crystal.spin}" src="/img/crystal.png" width="250" height="250"/></div>
                        </div>
                        <div class="flex-initial nav-btn mr-2 text-xl">
                            <t-dropdown-custom v-bind="this.ui.buttons.nav_dropdown">
                                <ul>
                                    <li class="bg-1">
                                        <a href="#character-totals" class="block no-underline px-4 py-2 hover:bg-accent hover:text-white">TOTALS</a>
                                    </li>
                                    <li class="bg-1">
                                        <a href="#race-distribution" class="block no-underline px-4 py-2 hover:bg-accent hover:text-white">RACES</a>
                                    </li>
                                    <li class="bg-1">
                                        <a href="#gender-distribution" class="block no-underline px-4 py-2 hover:bg-accent hover:text-white">GENDERS</a>
                                    </li>
                                    <li class="bg-1">
                                        <a href="#jobs-distribution" class="block no-underline px-4 py-2 hover:bg-accent hover:text-white">JOBS</a>
                                    </li>
                                </ul>
                            </t-dropdown-custom>
                        </div>
                        <div class="flex-initial nav-btn text-xl">
                            <t-button href="#app"><font-awesome-icon icon="arrow-up" /></t-button>
                        </div>
                    </div>
                </modified-fixed-header>
            </div>
            <smart-widget-grid :layout="this.grid.layouts.body" :isStatic="true">
                <smart-widget id="character-totals" slot="0" title="CHARACTER TOTALS" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap justify-center h-full">
                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>
                        <div class="flex flex-auto flex-col flex-no-wrap justify-around h-full">
                            <div class="flex flex-auto flex-col flex-no-wrap justify-center h-full">
                                <div class="flex-initial text-2xl text-disabled">All Characters</div>
                                <div class="flex-initial text-6xl text-white" v-text="this.totalCharacters"></div>
                            </div>
                            <div class="flex flex-auto flex-col flex-no-wrap justify-center h-full">
                                <div class="flex-initial text-2xl text-disabled">Online Characters</div>
                                <div class="flex-initial text-6xl text-white" v-text="this.totalOnline"></div>
                            </div>
                        </div>
                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <census-line-chart v-bind="this.charts.line.all.averages" />

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <census-line-chart v-bind="this.charts.line.online.averages" />
                    </div>
                </smart-widget>

                <smart-widget id="race-distribution" slot="1" title="RACE DISTRIBUTION" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                        <hr class="sep"/>
                    </div>
                    <div class="flex flex-col flex-no-wrap justify-between h-full">

                        <div class="mt-10">
                            <census-radar-chart v-bind="this.charts.radar.shared.races" />
                        </div>
                    </div>
                </smart-widget>

                <smart-widget id="gender-distribution" slot="2" title="GENDER DISTRIBUTION" subTitle="" :loading="isLoading">
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

                        <census-bar-chart v-bind="this.charts.bar.all.race_genders"/>

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <census-bar-chart v-bind="this.charts.bar.online.race_genders"/>
                    </div>
                </smart-widget>

                <smart-widget id="jobs-distribution" slot="3" title="JOBS DISTRIBUTION" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap justify-center h-full">

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <census-bar-chart v-bind="this.charts.bar.all.jobs" />

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <census-bar-chart v-bind="this.charts.bar.online.jobs" />

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <census-bar-chart v-bind="this.charts.bar.all.jobs_totals" />

                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>

                        <census-bar-chart v-bind="this.charts.bar.online.jobs_totals" />
                    </div>
                </smart-widget>
            </smart-widget-grid>
        </grid-widget-layout>
    </main>
</template>

<script>
    import progressBarMixin from '@/mixins/progress-bar.mixin';
    import powerCrystalMixin from '@/mixins/power-crystal.mixin';
    import particlesMixin from '@/mixins/particles.mixin';
    import activeChartsMixin from '@/mixins/active-charts.mixin';
    import scrollerMixin from '@/mixins/scroller.mixin';

    import GridWidgetLayout from "@cX/layout/GridWidgetLayout";
    import ModifiedFixedHeader from "@cX/ui/header/ModifiedFixedHeader";
    import ParticleButton from "@cX/common/ui/ParticleButton";

    import CensusBarChart from "@cX/chart/bar/CensusBarChart";
    import CensusDoughnutChart from "@cX/chart/doughnut/CensusDoughnutChart";
    import CensusRadarChart from "@cX/chart/radar/CensusRadarChart";
    import CensusLineChart from "@cX/chart/line/CensusLineChart";

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

    const testCensusSnapshot = require('@/misc/test_data/census-snapshot');
    const censusModel = require('@/models/census-data.model');

    export default {
        name: 'app',
        components: {
            GridWidgetLayout,
            ModifiedFixedHeader,
            CensusBarChart,
            CensusDoughnutChart,
            CensusRadarChart,
            CensusLineChart,
        },
        mixins: [
            progressBarMixin,
            powerCrystalMixin,
            particlesMixin,
            activeChartsMixin,
            scrollerMixin
        ],
        created() {
          this.startLoading();
          //this.loadTestData();
        },
        mounted() {
            let self = this;
            this.animateCrystal();

            window.setInterval(function() {
                self.animateCrystal();
            }, 5000);

            window.setInterval(function() {
                if (self.crystal.power > 0) {
                    self.crystal.power -= 1;
                }
                if (self.crystal.power >= 36) {
                    let colors = ['#3700B3', '#03DAC6', '#FF3F80'];
                    let color = colors[Math.floor(Math.random() * 3)];
                    self.particles.color = color;
                    self.particles.linesColor = color;
                    self.particles.shapeType = 'polygon';
                    self.particles.hoverEffect = false;
                    self.particles.clickEffect = false;
                    self.particles.moveSpeed = 9;
                    self.particles.key = !self.particles.key;
                }
                else if (self.crystal.power >= 12) {
                    self.particles.color = "#ff3a29";
                    self.particles.linesColor = "#ff3a29";
                    self.particles.shapeType = 'circle';
                    self.particles.hoverEffect = true;
                    self.particles.clickEffect = true;
                    self.particles.hoverMode = 'bubble';
                    self.particles.clickMode = 'push';
                    self.particles.moveSpeed = 6;
                    self.particles.key = 1;
                }
                else {
                    self.particles.color = "#dedede";
                    self.particles.linesColor= "#dedede";
                    self.particles.shapeType = 'triangle';
                    self.particles.hoverEffect = true;
                    self.particles.clickEffect = true;
                    self.particles.hoverMode = 'grab';
                    self.particles.clickMode = 'repulse';
                    self.particles.moveSpeed = 3;
                    self.particles.key = 0;
                }

                if (self.crystal.power < 36) {
                    self.crystal.spin = false;
                }
                if (self.crystal.power < 12) {
                    self.crystal.shudder = false;
                }

            }, 1000);
        },
        data: function () {
            return {
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
                        onlineAverages: [],
                        characterAverages: [],
                        totalOnline: 0,
                        totalCharacters: 0,
                        snapshots: {
                            all: {},
                            online: {}
                        },
                    }
                },
                ui: {
                    buttons: {
                        nav_dropdown: {
                            'button-props': {
                            },
                            visibleArrow: false,
                            text: 'Test'
                        }
                    }
                },
                header: {
                    threshold: 205
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
                            { x: 0, y: 0, w: 12, h: 36, i:  "3" },
                            { x: 0, y: 0, w: 12, h: 29, i:  "2" },
                            { x: 0, y: 0, w: 12, h: 10, i:  "1" },
                            { x: 0, y: 0, w: 12, h: 26, i:  "0" }
                        ]
                    }
                },
            }
        },
        methods: {
            startLoading() {
                this.progressSet(10);
                this.isLoading = true;
                this.fetchOnlineCharacters();
            },
            loadTestData() {
                this.progressSet(0);
                this.isLoading = true;
                this.allSnapshot = testCensusSnapshot;
                this.onlineSnapshot = testCensusSnapshot;
                console.log(testCensusSnapshot);
                this.totalCharacters = 3103;
                this.totalOnline = 737;
                this.progressFinish();
                this.isLoading = false;
            },
            fetchOnlineCharacters() {
                const self = this;
                window.axios.get(`${ self.coorsProxyUrl }/${ self.eden.api.endpoints.get.onlineCharacters }`)
                    .then(function(response) {
                        self.onlineCharacters = response.data.characters;
                        self.totalOnline = response.data.characters.length;
                        self.progressIncrease(10);
                    })
                    .catch(function(error) {
                        console.log(error);
                        self.progressFail();
                        self.isLoading = false;
                    });
            },
            fetchRemoteSnapshot() {
                let self = this;
                let ref = this.$FirebaseService.database.ref(`/data/snapshots/${ window.h.now('Y-M') }`);
                ref.orderByChild('last_updated')
                    .limitToLast(1)
                    .once('value')
                    .then(function (snapshot) {
                        if (snapshot.exists()) {
                            let key = window._.keys(snapshot.val())[0];
                            self.allSnapshot = snapshot.val()[key];
                        }
                    }).then(function () {
                        self.progressIncrease(10);
                    })
            },
            fetchCharacterProfiles() {
                let self = this;
                self.onlineCharacters.forEach(function (character) {
                    let ref = self.$FirebaseService.database.ref(`/profiles/${ character.charid }`);
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
            fetchTotalCharactersCount() {
                let self = this;
                let ref = this.$FirebaseService.database.ref(`/characters/`);
                ref.once('value')
                    .then(function (snapshot) {
                        self.totalCharacters = window._.keys(snapshot.val()).length;
                    }).then(function () {
                        self.progressIncrease(10);
                    });
            },
            fetchCharacterAverages() {
                let self = this;
                let ref = this.$FirebaseService.database.ref(`/data/characters/averages/total`);
                ref.limitToLast(8)
                    .once('value')
                    .then(function (snapshot) {
                        self.characterAverages = snapshot.val();
                    }).then(function () {
                        self.progressIncrease(10);
                    });
            },
            fetchOnlineAverages() {
                let self = this;
                let ref = this.$FirebaseService.database.ref(`/data/characters/averages/online`);
                ref.limitToLast(8)
                    .once('value')
                    .then(function (snapshot) {
                        self.onlineAverages = snapshot.val();
                    }).then(function () {
                        self.progressIncrease(10);
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
                console.log(censusModel);
                this.onlineSnapshot = censusModel;
                this.progressIncrease(10);
            },
            onFixedHeaderChange(fixed, currentScrollPos, threshold) {
                if (currentScrollPos !== undefined && threshold !== undefined) {
                    this.crystal.condensed = currentScrollPos >= threshold;
                }
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
            characterAverages: {
                get: function () {
                    return this.eden.data.characterAverages;
                },
                set: function (val) {
                    this.eden.data.characterAverages = val;
                }
            },
            onlineAverages: {
                get: function () {
                    return this.eden.data.onlineAverages;
                },
                set: function (val) {
                    this.eden.data.onlineAverages = val;
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
            },
        },
        watch: {
            allSnapshot: function(newVal) {
                //all
                this.charts.bar.all.race_genders.data = newVal;
                this.charts.doughnut.all.genders.data = newVal;
                this.charts.bar.all.jobs.data = newVal;
                this.charts.bar.all.jobs_totals.data = newVal;

                //shared
                this.charts.radar.shared.races.data.push(newVal);

            },
            onlineSnapshot: function(newVal) {
                //online
                this.charts.bar.online.race_genders.data = newVal;
                this.charts.doughnut.online.genders.data = newVal;
                this.charts.bar.online.jobs.data = newVal;
                this.charts.bar.online.jobs_totals.data = newVal;

                //shared
                this.charts.radar.shared.races.data.push(newVal);
            },
            characterAverages: function(newVal) {
                this.charts.line.all.averages.data = newVal;
            },
            onlineAverages: function(newVal) {
                this.charts.line.online.averages.data = newVal;
            },
            characterProfiles: function(newVal) {
                if(newVal.length === this.onlineCharacters.length) {
                    this.progressIncrease(10);
                }
            },
            loadingProgress: function(newVal) {
                switch(newVal) {
                    case 20:
                        this.fetchRemoteSnapshot();
                        break;
                    case 30:
                        this.fetchTotalCharactersCount();
                        break;
                    case 40:
                        this.fetchCharacterAverages();
                        break;
                    case 50:
                        this.fetchOnlineAverages();
                        break;
                    case 60:
                        this.fetchCharacterProfiles();
                        break;
                    case 70:
                        this.buildLocalSnapshot();
                        break;
                    case 80:
                        this.progressFinish();
                        this.isLoading = false;
                        break;
                }
            }
        }
    }
</script>

<style scoped>
</style>
