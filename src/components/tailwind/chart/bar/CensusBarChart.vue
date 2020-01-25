<template>
    <div class="flex flex-col flex-no-wrap flex-auto justify-center">
        <div class="chart-title mt-6 mb-6" v-text="this.chartTitle"></div>
        <div class="chart bar-chart">
            <base-bar-chart v-bind="this.chart"/>
        </div>
    </div>
</template>

<script>
    import BaseBarChart from "@cX/common/chart/BaseBarChart";
    import CensusChartMixin from '@/mixins/census-chart.mixin';

    export default {
        name: "CensusBarChart",
        mixins: [
            CensusChartMixin
        ],
        components: {
            BaseBarChart
        },
    }
</script>

<style scoped></style>
