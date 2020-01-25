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
                    <div class="crystal-container" v-if="!this.crystal.condensed">
                        <span class="crystal-btn" @click.prevent="powerCrystal"></span>
                        <span class="crystal-power">
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
                            <span class="crystal-btn" @click.prevent="powerCrystal"></span>
                            <span class="crystal-power">

                            </span>
                            <div class="absolute crystal no-select" :class="{'shake': this.crystal.shake, 'hard-shake': this.crystal.hard_shake, 'shudder': this.crystal.shudder}"><img :class="{'spin': this.crystal.spin}" src="/img/crystal.png" width="250" height="250"/></div>
                        </div>
                        <div class="flex-initial">

                        </div>
                    </div>
                </modified-fixed-header>
            </div>
            <smart-widget-grid :layout="this.grid.layouts.body" :isStatic="true">
                <smart-widget slot="0" title="CHARACTER TOTALS" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap justify-center h-full">
                        <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                            <hr class="sep"/>
                        </div>
                        <div class="flex flex-auto flex-col flex-no-wrap justify-around h-full">
                            <div class="flex flex-auto flex-col flex-no-wrap justify-center h-full">
                                <div class="flex-initial text-2xl text-darkDisabled">All Characters</div>
                                <div class="flex-initial text-6xl text-white" v-text="this.totalCharacters"></div>
                            </div>
                            <div class="flex flex-auto flex-col flex-no-wrap justify-center h-full">
                                <div class="flex-initial text-2xl text-darkDisabled">Online Characters</div>
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

                <smart-widget slot="1" title="RACE DISTRIBUTION" subTitle="" :loading="isLoading">
                    <div class="flex flex-col flex-no-wrap flex-initial justify-center">
                        <hr class="sep"/>
                    </div>
                    <div class="flex flex-col flex-no-wrap justify-between h-full">

                        <div class="mt-10">
                            <census-radar-chart v-bind="this.charts.radar.stacked.races" />
                        </div>
                    </div>
                </smart-widget>

                <smart-widget slot="2" title="GENDER DISTRIBUTION" subTitle="" :loading="isLoading">
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
            </smart-widget-grid>
        </grid-widget-layout>
    </main>
</template>

<script>
    import FirebaseService from '@/services/firebase.service';

    import progressBarMixin from '@/mixins/progress-bar.mixin';
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

    import { raceGendersChartTransformer } from "@/transformers/from-model/race-genders-chart.transformer";
    import { gendersChartTransformer } from "@/transformers/from-model/genders-chart.transformer";
    import { racesChartTransformer } from "@/transformers/from-model/races-chart.transformer";
    import { characterAveragesChartTransformer } from "@/transformers/from-model/character-averages-chart.transformer";

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
            CensusLineChart
           /* ParticleButton*/
        },
        mixins: [
            progressBarMixin
        ],
        created() {
            const firebaseService = new FirebaseService(window._config.FIREBASE_CONFIG);

            this.progressSet(0);
            this.isLoading = true;

           /*
            this.fetchCharacterResources(firebaseService);
            this.fetchRemoteSnapshot(firebaseService);
            this.fetchTotalCharactersCount(firebaseService);
            this.fetch
            */

            this.fetchCharacterAverages(firebaseService);

            this.allSnapshot = testCensusSnapshot;
            this.onlineSnapshot = testCensusSnapshot;
            console.log(testCensusSnapshot);
            this.totalCharacters = 3103;
            this.totalOnline = 737;
            this.progressFinish();
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
                header: {
                    threshold: 205
                },
                crystal: {
                    power: 0,
                    shake: false,
                    hard_shake: false,
                    shudder: false,
                    spin: false,
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
                    clickEffect: true,
                    color: '#dedede',
                    linesColor: '#dedede',
                    shapeType: 'triangle',
                    hoverMode: 'grab',
                    clickMode: 'repulse',
                    key: 0
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
                            { x: 0, y: 0, w: 12, h: 29, i:  "2" },
                            { x: 0, y: 0, w: 12, h: 10, i:  "1" },
                            { x: 0, y: 0, w: 12, h: 26, i:  "0" }
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
                    },
                    radar: {
                        stacked: {
                            races: {
                                data: [], //both models
                                options: this.getCommonChartOptions('radar', {
                                    scale: {
                                        pointLabels: {
                                            fontSize: 16
                                        },
                                        ticks: {
                                            backdrop: false,
                                            backdropColor: getComputedStyle(document.documentElement)
                                                .getPropertyValue('--color-accent'),
                                            fontColor: getComputedStyle(document.documentElement)
                                                .getPropertyValue('--text-color-primary'),
                                            display: true,
                                        },

                                    }

                                }),
                                transformer: racesChartTransformer
                            }
                        }
                    },
                    line: {
                        online: {
                            averages: {
                                data: {},
                                options: this.getCommonChartOptions('line', {
                                    scales: {
                                        yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: '# of characters'
                                            }
                                        }]
                                    }
                                }),
                                transformer: characterAveragesChartTransformer,
                                title: "Online Characters"
                            }
                        },
                        all: {
                            averages: {
                                data: {},
                                options: this.getCommonChartOptions('line', {
                                    scales: {
                                        yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: '# of characters'
                                            }
                                        }]
                                    }
                                }),
                                transformer: characterAveragesChartTransformer,
                                title: "All Characters"
                            }
                        },
                    }
                }
            }
        },
        methods: {
            fetchCharacterResources(firebaseService) {
                const self = this;
                window.axios.get(`${ self.coorsProxyUrl }/${ self.eden.api.endpoints.get.onlineCharacters }`)
                    .then(function(response) {
                        self.onlineCharacters = response.data.characters;
                        self.totalOnline = response.data.characters.length;
                        self.progressIncrease(10);
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
                        self.progressIncrease(10);
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
                        self.progressIncrease(10);
                    });
            },
            fetchCharacterAverages(firebaseService) {
                let self = this;
                let ref = firebaseService.database.ref(`/data/characters/averages/total`);
                ref.limitToLast(8)
                    .once('value')
                        .then(function (snapshot) {
                            self.characterAverages = snapshot.val();
                        }).then(function () {
                            self.progressIncrease(10);
                        });
                ref = firebaseService.database.ref(`/data/characters/averages/online`);
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
                this.onlineSnapshot = censusModel;
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
                    },
                    radar: {

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
                    if (this.crystal.power >= 36) {
                        this.spinCrystal();
                    }
                    else if (this.crystal.power >= 12) {
                        this.crystal.shudder = false;
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
                    setTimeout(function () {
                        self.crystal.anim = false;
                        self.crystal.hard_shake = false;

                        if (self.crystal.power >= 12) {
                            self.crystal.shudder = true;
                        }
                    }, 900);
                }
            },
            spinCrystal() {
                let self = this;
                if (! this.crystal.spin) {
                    this.crystal.spin = true;
                }
                setTimeout(function () {
                    self.crystal.anim = false;
                }, 900);
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
            }
        },
        watch: {
            allSnapshot: function(newVal) {
                //all
                this.charts.bar.all.race_genders.data = newVal;
                this.charts.doughnut.all.genders.data = newVal;

                //stacked
                this.charts.radar.stacked.races.data.push(newVal);
            },
            onlineSnapshot: function(newVal) {
                //online
                this.charts.bar.online.race_genders.data = newVal;
                this.charts.doughnut.online.genders.data = newVal;

                //stacked
                this.charts.radar.stacked.races.data.push(newVal);

                this.progressFinish();
                this.isLoading = false;
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
                    this.buildLocalSnapshot();
                }
            }
        }
    }
</script>

<style scoped>
</style>
