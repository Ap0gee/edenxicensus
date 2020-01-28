import { raceGendersChartTransformer } from "@/transformers/from-model/race-genders-chart.transformer";
import { gendersChartTransformer } from "@/transformers/from-model/genders-chart.transformer";
import { racesChartTransformer } from "@/transformers/from-model/races-chart.transformer";
import { characterAveragesChartTransformer } from "@/transformers/from-model/character-averages-chart.transformer";
import { jobsChartTransformer } from "@/transformers/from-model/jobs-chart.transformer";
import { jobsTotalsChartTransformer } from "@/transformers/from-model/jobs-totals-chart.transformer";
import { ranksTotalsChartTransformer } from "@/transformers/from-model/ranks-totals-chart.transformer";
import { nationsChartTransformer } from "@/transformers/from-model/nations-chart.transformer";
import { craftsChartTransformer } from "@/transformers/from-model/crafts-chart.transformer";

export default {
    data: function () {
        return {
            charts: {
                bar: {
                    online: {
                        race_genders: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                            }),
                            transformer: raceGendersChartTransformer,
                            title: "Online Characters"
                        },
                        jobs: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                }
                            }),
                            transformer: jobsChartTransformer,
                            title: "Online Characters"
                        },
                        jobs_totals: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: '# of levels'
                                        }
                                    }],
                                }
                            }),
                            transformer: jobsTotalsChartTransformer,
                            title: "Online Characters"
                        },
                        nations: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                }
                            }),
                            title: "Online Characters",
                            transformer: nationsChartTransformer
                        },
                        crafts: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: '# of levels'
                                        }
                                    }],
                                }
                            }),
                            title: "Online Characters",
                            transformer: craftsChartTransformer
                        }
                    },
                    all: {
                        race_genders: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                            }),
                            transformer: raceGendersChartTransformer,
                            title: "All Characters"
                        },
                        jobs: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                }
                            }),
                            transformer: jobsChartTransformer,
                            title: "All Characters"
                        },
                        jobs_totals: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: '# of levels'
                                        }
                                    }],
                                }
                            }),
                            transformer: jobsTotalsChartTransformer,
                            title: "All Characters"
                        },
                        nations: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                }
                            }),
                            title: "All Characters",
                            transformer: nationsChartTransformer
                        },
                        crafts: {
                            data: {},
                            options: this.getCommonChartOptions('bar', {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: '# of levels'
                                        }
                                    }],
                                }
                            }),
                            title: "Online Characters",
                            transformer: craftsChartTransformer
                        }
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
                    shared: {
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
                            }),
                            transformer: characterAveragesChartTransformer,
                            title: "Online Characters"
                        },
                    },
                    all: {
                        averages: {
                            data: {},
                            options: this.getCommonChartOptions('line', {
                            }),
                            transformer: characterAveragesChartTransformer,
                            title: "All Characters"
                        },
                    }
                },
                pie: {
                    online: {
                        ranks: {
                            data: {},
                            options: this.getCommonChartOptions('pie', {
                            }),
                            transformer: ranksTotalsChartTransformer,
                            title: "Online Characters",
                            subTitle: "(Total Ranks)"
                        },

                    },
                    all: {
                        ranks: {
                            data: {},
                            options: this.getCommonChartOptions('pie', {
                            }),
                            transformer: ranksTotalsChartTransformer,
                            title: "All Characters",
                            subTitle: "(Total Ranks)"
                        }
                    }
                }
            }
        }
    },
    methods: {
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
                line: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: '# of characters'
                            }
                        }]
                    }
                },
                bar: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'rgba(255, 255, 255, 0.54)'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '# of characters'
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

                },
                pie: {

                }
            };
            let typedOpts = window._.merge(types['common'], types[type]);
            return window._.merge(typedOpts, merged);
        },
    }
};