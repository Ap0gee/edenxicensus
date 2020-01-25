<template>
    <div class="flex flex-col flex-no-wrap flex-auto justify-center w-1/3 ml-1 mr-1">
        <div v-if="this.chartTitle" class="chart-title mt-6 mb-6" v-text="this.chartTitle"></div>
        <div class="chart doughnut-chart mt-10">
            <base-doughnut-chart-extended v-bind="this.chart" />
        </div>
    </div>
</template>

<script>
    import drawTextCenterPlugin from '@/plugins/vue-chart-js/draw-text-center.plugin';
    import BaseDoughnutChart from "@cX/common/chart/BaseDoughnutChart";
    import CensusChartMixin from '@/mixins/census-chart.mixin';

    const BaseDoughnutChartExtended = {
        extends: BaseDoughnutChart,
        mounted () {
            this.addPlugin({
                id: drawTextCenterPlugin.id,
                beforeDraw: drawTextCenterPlugin.beforeDraw
            });
            this.renderChart(this.chartData, this.chartOptions);
        }
    };

    export default {
        name: "CensusDoughnutChart",
        mixins: [
            CensusChartMixin
        ],
        components: {
            BaseDoughnutChartExtended
        },
    }
</script>