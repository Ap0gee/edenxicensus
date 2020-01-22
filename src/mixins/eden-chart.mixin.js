export default {
    props: {
        data: {
            type: [Object],
            default: () => ({})
        },
    },
    data: function () {
        return {
            snapshot: {
                data: this.data,
            },
            chart: {
                data: {},
                options: {}
            }
        }
    },
    computed: {
        censusData: {
            get: function() {
                return this.snapshot.data;
            },
            set: function(val) {
                this.snapshot.data = val;
            }
        },
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