export default {
    data: function() {
        return {
            progress: {
                pct: 0
            }
        }
    },
    methods:{
        progressStart() {
            this.$Progress.start();
            this.loadingProgress = 0;
        },
        progressSet(num) {
            this.$Progress.set(num);
            this.loadingProgress = num;
        },
        progressIncrease(num) {
            this.$Progress.increase(num);
            this.loadingProgress += num;
        },
        progressDecrease(num) {
            this.$Progress.decrease(num);
            this.loadingProgress -= num;
        },
        progressFinish() {
            this.$Progress.finish();
            this.loadingProgress = 100;
        },
        progressFail() {
            this.$Progress.fail();
            this.loadingProgress = 0;
        }
    },
    computed: {
        loadingProgress: {
            get: function () {
                return this.progress.pct;
            },
            set: function (newVal) {
                this.progress.pct = newVal;
            }
        }
    }
}