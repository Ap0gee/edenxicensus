<script>
    import {Radar} from 'vue-chartjs';
    import BaseChartMixin from '@/mixins/base-chart.mixin';

    export default {
        name: "BaseRadarChart",
        extends: Radar,
        mixins: [
            BaseChartMixin
        ],
        mounted() {
            this.renderChart(this.chartData, this.chartOptions)
        },
        watch: {
            chartData: function(newVal) {
                this.renderChart(this.chartData, this.chartOptions)
            }
        }
    }
</script>