<template>
    <div class="container mx-auto">
        <div class="grid-widget">
            <smart-widget-grid :layout="layout" :resizable="false">
                <smart-widget slot="0" collapse fullscreen refresh>
                    <div class="layout-center">
                    </div>
                </smart-widget>
                <smart-widget slot="1" title="Collapse" sub-title="Drag on me" collapse fullscreen refresh>
                    <div class="layout-center">
                    </div>
                </smart-widget>
                <smart-widget slot="2" title="Full Screen" sub-title="Drag on me" collapse fullscreen refresh>
                    <div class="layout-center">
                    </div>
                </smart-widget>
                <smart-widget slot="3" title="Full Screen" sub-title="Drag on me" collapse fullscreen refresh>
                    <div class="layout-center">
                    </div>
                </smart-widget>
                <smart-widget slot="4" title="Full Screen" sub-title="Drag on me" collapse fullscreen refresh>
                    <div class="layout-center">
                    </div>
                </smart-widget>
                <smart-widget slot="5" title="Full Screen" sub-title="Drag on me" collapse fullscreen refresh>
                    <div class="layout-center">
                    </div>
                </smart-widget>
            </smart-widget-grid>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GridWidgetLayout',
        components: {

        },
        mixins: [

        ],
        created() {

        },
        mounted() {

        },
        data: function () {
            return {
                layout: [
                    { x: 0, y: 0, w: 12, h: 4, i: "0" },
                    { x: 0, y: 0, w: 12, h: 4, i: "1" },
                    { x: 0, y: 0, w: 12, h: 4, i: "2" },
                    { x: 0, y: 0, w: 12, h: 4, i: "3" },
                    { x: 0, y: 0, w: 12, h: 4, i: "4" },
                    { x: 0, y: 0, w: 12, h: 4, i: "5" }
                ]
            };
        },
        methods: {

        },
        computed: {

        }
    }
</script>
<style scoped></style>