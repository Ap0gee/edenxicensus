export default {
    props: {
        data: {
            type: [Object],
            default: () => ({})
        },
        options: {
            type: [Object],
            default: () => ({})
        },
        transformer: {
            type: [Function],
            default: () => ((model) => {
                return model;
            })
        },
        title: {
            type: [String],
            default: () => ("")
        }
    },
    data: function () {
        return {
            snapshot: {
                data: this.data,
            },
            chart: {
                data: {},
                options: this.options,
                title: this.title
            }
        };
    },
    created() {
        this.chartData = this.transformer(this.censusData);
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
            get: function () {
                return this.chart.data;
            },
            set: function(val) {
                this.chart.data = val;
            }
        },
        chartOptions() {
            return this.chart.options;
        },
        chartTitle() {
            return this.chart.title;
        },
        styles() {
            return {}
        }
    },
    watch: {
        data: function(newVal) {
            this.censusData = newVal;
        },
        censusData: function(newVal) {
            console.log('updating chart data', this.chartData);
            this.chartData = this.transformer(this.censusData);
        }
    }
}