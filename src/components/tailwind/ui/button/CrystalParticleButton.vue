<template>
    <div>
        <particle-effect-button
            :visible.sync="btnOps.visible"
            :animating.sync="btnOps.animating"
            :options="btnOps"
            cls="btn-cls"
        >
            hello eveybody!
        </particle-effect-button>
        <button @click="btnOps.visible=!btnOps.visible">

        </button>
    </div>
</template>

<script>
    import ParticleEffectButton from "vue-particle-effect-buttons"

    export default {
        name: "CrystalParticleButton",
        mounted() {
            this.btnOps.visible = true;
        },
        data() {
            return {
                btnOps: {
                    type: "triangle",
                    easing: "easeOutQuart",
                    size: 6,
                    particlesAmountCoefficient: 4,
                    oscillationCoefficient: 2,
                    color: function () {
                        return Math.random() < 0.5 ? "#000000" : "#ffffff";
                    },
                    onComplete: () => {
                        console.log("complete");
                    },
                    onBegin: () => {
                        console.log("begin");
                    },
                    visible: false,
                    animating: true
                },
            }
        },
        components: {
            ParticleEffectButton
        }
    };
</script>