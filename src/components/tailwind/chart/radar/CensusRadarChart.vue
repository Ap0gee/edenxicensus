<template>
    <div class="flex flex-col flex-no-wrap flex-auto justify-center">
        <div v-if="this.chartTitle" class="chart-title mt-6 mb-6" v-text="this.chartTitle"></div>
        <div class="chart radar-chart">
            <base-radar-chart v-bind="this.chart"/>
        </div>
    </div>
</template>

<script>
    import BaseRadarChart from "@cX/common/chart/BaseRadarChart";
    import CensusChartMixin from '@/mixins/census-chart.mixin';

    export default {
        name: "CensusRadarChart",
        mixins:  [
            CensusChartMixin
        ],
        components: {
            BaseRadarChart
        }
    }
</script>