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
       this.transform();
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
        chartTitle: {
            get: function() {
                return this.chart.title;
            },
            set: function(val) {
                this.chart.title = val;
            }
        },
        styles() {
            return {
                color: "green"
            }
        }
    },
    methods: {
        transform() {
            this.chartData = this.transformer(this.censusData);
        }
    }
}