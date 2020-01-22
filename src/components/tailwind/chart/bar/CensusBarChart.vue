<template>
    <div>
        <div class="chart-title" v-text="this.chartTitle"></div>
        <div class="chart bar-chart">
            <BaseBarChart :styles=this.styles v-bind="this.chart "/>
        </div>
    </div>
</template>

<script>
    import BaseBarChart from "./BaseBarChart";
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
