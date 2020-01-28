<template>
    <div class="flex flex-col flex-no-wrap flex-auto justify-center w-1/3 ml-1 mr-1">
        <div v-if="this.chartTitle" class="chart-title mt-6 mb-4" v-text="this.chartTitle"></div>
        <div v-if="this.chartSubTitle" class="chart-sub-title mb-6" v-text="this.chartSubTitle"></div>
        <div class="chart line-chart">
            <base-pie-chart v-bind="this.chart"/>
        </div>
    </div>
</template>

<script>
    import BasePieChart from "@cX/common/chart/BasePieChart";
    import CensusChartMixin from '@/mixins/census-chart.mixin';

    export default {
        name: "CensusPieChart",
        props: {
            subTitle: {
                type: [String],
                default: () => ("")
            }
        },
        mixins: [
            CensusChartMixin
        ],
        data: function () {
            return {
                chart: {
                    subTitle: this.subTitle
                }
            }
        },
        components: {
            BasePieChart
        },
        computed: {
            chartSubTitle: {
                get: function () {
                    return this.chart.subTitle;
                },
                set: function (newVal) {
                    this.chart.subTitle = newVal;
                }
            }
        }
    }
</script>
