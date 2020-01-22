<template>
    <BaseBarChart
        :data="this.chartData"
        :options="this.chartOptions">
    </BaseBarChart>
</template>

<script>
    import BaseBarChart from "./BaseBarChart";
    import EdenChartMixin from '@/mixins/eden-chart.mixin';

    export default {
        name: "RacesAndGendersBarChart",
        mixins: [
            EdenChartMixin
        ],
        components: {
            BaseBarChart
        },
        created() {
            //transoform census data into chart data
        }
    }
</script>

<style scoped></style>

<!--
    labels: [],
    datasets: [
        {
            label:
            backgroundColor: [],
            hoverBackgroundColor: [],
            data: [],
            borderWidth: 1
        }
    ]
!>