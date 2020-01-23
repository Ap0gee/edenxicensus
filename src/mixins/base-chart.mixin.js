export default {
    props: {
        data: {
            type: [Object],
            default: () => ({})
        },
        options: {
            type: [Object],
            default: () => ({})
        }
    },
    data: function () {
        return {
            chart: {
                data: this.data,
                options: this.options
            }
        }
    },
    computed: {
        chartData() {
            return this.chart.data;
        },
        chartOptions() {
            return this.chart.options;
        },
    }
}