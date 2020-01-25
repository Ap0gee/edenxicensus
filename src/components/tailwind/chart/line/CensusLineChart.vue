<template>
    <div class="flex flex-col flex-no-wrap flex-auto justify-center mb-10">
        <div v-if="this.chartTitle" class="chart-title mt-6 mb-6" v-text="this.chartTitle"></div>
        <div class="chart line-chart">
            <base-line-chart v-bind="this.chart"/>
        </div>
    </div>
</template>

<script>
    import BaseLineChart from "@cX/common/chart/BaseLineChart";
    import CensusChartMixin from '@/mixins/census-chart.mixin';

    export default {
        name: "CensusBarChart",
        mixins: [
            CensusChartMixin
        ],
        components: {
            BaseLineChart
        },
    }
</script>
