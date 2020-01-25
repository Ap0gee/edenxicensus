<template>
    <div class="max-h-full">
        <particle-effect-button
            :visible.sync="btnOpts.visible"
            :animating.sync="btnOpts.animating"
            :options="btnOpts"
            cls="btn-cls"
        >
            crystal
        </particle-effect-button>
    </div>
</template>

<script>
    import ParticleEffectButton from "vue-particle-effect-buttons"

    export default {
        components: {
            ParticleEffectButton
        },
        mounted() {
            let self = this;
            setTimeout(function() {
                self.btnOpts.visible = true;
            }, 100)
        },
        data() {
            return {
                blah: true,
                btnOpts: {
                    action: () => { console.log('click!') },
                    type: "triangle",
                    easing: "easeInOutCubic",
                    speed: 2,
                    size: 3,
                    particlesAmountCoefficient: 2,
                    oscillationCoefficient: 5,
                    color: function () {
                        return '#BB86FC';
                    },
                    onComplete: () => {
                        this.btnOpts.visible = !this.btnOpts.visible;
                    },
                    onBegin: () => {

                    },
                    visible: false,
                    animating: false
                },
            }
        },
        computed: {
            isVisible() {
                return this.btnOpts.visible;
            }
        },
        watch: {
            isVisible: function (newVal, oldVal) {
                this.$emit('change', newVal);
            }
        }
    };
</script>