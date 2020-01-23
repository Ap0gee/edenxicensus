<template>
    <base-button>

    </base-button>
</template>

<script>
    import BaseButton from "@cX/common/ui/BaseButton";

    export default {
        name: "NavButton",
        props: {
            text: {
                type: [String],
                default: ""
            },
            action: {
                type: [Function, String],
                default: (e) => {console.log("Button Clicked!")}
            },
        },
        components: {
            BaseButton
        },
        data: function () {
            return {
                button: {
                    text: this.text,
                    action: this.action,
                    classes: this.buttonClasses,
                    type: "button"
                }
            }
        },
        methods: {
            cssClassString(str) {
                return str.replace(/\n|\r/g, " ").trim().split(" ")
            }
        },
        computed: {
            buttonClasses() {
                return this.cssClassString(`

                `);
            }
        }

    }
</script>

<style scoped>

</style>