<script>
    import {Bar} from 'vue-chartjs';
    import BaseChartMixin from '@/mixins/base-chart.mixin';

    export default {
        extends: Bar,
        mixins: [
            BaseChartMixin
        ],
        mounted () {
            this.renderChart(this.chartData, this.chartOptions)
        }
    }
</script>