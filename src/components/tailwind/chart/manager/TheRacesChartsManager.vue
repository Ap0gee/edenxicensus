<template>
    <div class="flex flex-row flex-no-wrap items-center justify-center">
        <div class="lg:h-48 lg:w-48 lg:m-4 sm:h-16 sm:w-16" v-for="(race, index) in races" :key="index">
          <!--  <DoughnutChart
                :data="race.chart.data"
                :options="race.chart.options"
            ></DoughnutChart>-->
        </div>
    </div>
</template>
<script>
    import ChartManagerMixin from '@/mixins/chart-manager.mixin';

    /*data: {
        labels: [],
                datasets: [
            {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#e0e0e0"],
                hoverBackgroundColor: ["#3e95cd", "#e0e0e0"],
                data: [27, 73],
                borderWidth: 1
            }
        ]
    },*/

   /* options: {
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        elements: {
            center: {
                text: 'Tarutaru',
                        color: '#36A2EB', //Default black
                        fontStyle: 'Helvetica', //Default Arial
                        sidePadding: 15 //Default 20 (as a percentage)
            }
        }
    }*/

    export default {
        mixins: [
        ],
        data: function () {
            return {
                isLoading: false,
                doughnutChart: {
                },
            }
        },
        mounted() {

        }
    }
</script>
<style scoped></style>