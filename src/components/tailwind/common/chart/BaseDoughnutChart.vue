<script>
    import {Doughnut} from 'vue-chartjs';
    import BaseChartMixin from '@/mixins/base-chart.mixin';
    import drawTextCenterPlugin from '@/plugins/vue-chart-js/draw-text-center.plugin';

    export default {
        name: "BaseDoughnutChart",
        extends: Doughnut,
        mixins: [
            BaseChartMixin
        ],
        mounted () {
            this.addPlugin(
                drawTextCenterPlugin.id,
                drawTextCenterPlugin.beforeDraw
            );
            this.renderChart(this.chartData, this.chartOptions)
        }
    }
</script>