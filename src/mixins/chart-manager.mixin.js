export default {
    props: {
        data: {
            type: [Array],
            default: () => ([])
        }
    },
    data: function () {
        return {
            managed: {
                raw: this.data,
                data: []
            }
        }
    },
    computed: {
        rawData: {
            get: function() {
                return this.managed.raw;
            }
        },
        managedData: {
            get: function() {
                return this.managed.data;
            },
            set: function(val) {
                this.managed.data = val;
            }
        }
    }
}

