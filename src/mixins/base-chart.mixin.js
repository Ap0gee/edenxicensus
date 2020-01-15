export default {
    props: {
        data: {
            type: [Object],
            default: () => ({})
        },
        options: {
            type: [Object],
            default: () => ({
            })
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
        chartData: {
            get: function() {
                return this.chart.data;
            },
            set: function(val) {
                this.chart.data = val;
            }
        },
        chartOptions: {
            get: function() {
                return this.chart.options;
            },
            set: function(val) {
                this.chart.options = val;
            }
        },
    }
}