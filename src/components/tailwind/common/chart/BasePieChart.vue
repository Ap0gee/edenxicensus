<script>
    import {Pie} from 'vue-chartjs';
    import BaseChartMixin from '@/mixins/base-chart.mixin';

    export default {
        name: "BasePieChart",
        extends: Pie,
        mixins: [
            BaseChartMixin
        ],
        mounted () {
            this.renderChart(this.chartData, this.chartOptions)
        },
        watch: {
            chartData: function(newVal) {
                this.renderChart(this.chartData, this.chartOptions)
            }
        }
    }
</script>