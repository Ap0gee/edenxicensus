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
        chartData() {
            return this.chart.data;
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
    methods: {
        transform() {
            this.chartData = this.transformer(this.censusData);
        }
    }
}