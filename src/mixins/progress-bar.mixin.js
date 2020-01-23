export default {
    methods:{
        progressStart() {
            this.$Progress.start();
        },
        progressSet(num) {
            this.$Progress.set(num);
        },
        progressIncrease(num) {
            this.$Progress.increase(num);
        },
        progressDecrease(num) {
            this.$Progress.decrease(num);
        },
        progressFinish() {
            this.$Progress.finish();
        },
        progressFail() {
            this.$Progress.fail();
        }
    }
}