<template>
    <main id="app">
        <GridWidgetLayout>
            <smart-widget-grid :layout="layout" :resizable="false">
                <smart-widget slot="0" title="Total Characters" subTitle="testing" :loading="isLoading">
                    <div class="layout-center">
                         <RacesAndGendersBarChart :data="eden.data.censusSnapshot"></RacesAndGendersBarChart>
                    </div>
                </smart-widget>
                <smart-widget slot="1" title="1" :loading="isLoading">
                    <div class="layout-center">
                    </div>
                </smart-widget>
            </smart-widget-grid>
        </GridWidgetLayout>
    </main>
</template>

<script>
    import FirebaseService from '@/services/firebase.service';
    import censusSnapshot from '@/misc/test_data/census-snapshot';
    import GridWidgetLayout from "@/components/tailwind/layout/GridWidgetLayout";
    import BaseDoughnutChart from "@/components/tailwind/chart/doughnut/BaseDoughnutChart";
    import RacesAndGendersBarChart from "@/components/tailwind/chart/bar/RacesAndGendersBarChart";

    export default {
        name: 'app',
        components: {
            GridWidgetLayout,
            RacesAndGendersBarChart
        },
        mixins: [

        ],
        created() {
            /*let firebaseService = new FirebaseService(window._config.FIREBASE_CONFIG);
            firebaseService.database.ref('/profiles').once('value')
                .then(function (snapshot) {
                });*/
        },
        mounted() {

        },
        data: function () {
            return {
                isLoading: false,
                coorsProxyUrl: "https://cors-anywhere.herokuapp.com/",
                eden: {
                    api: {
                        endpoints: {
                            get: {
                                onlineCharacters: 'https://www.edenxi.com/ajax/onlinecharacters',
                            }
                        }
                    },
                    data: {
                        onlineCharacters: [],
                        censusSnapshot: censusSnapshot,
                    }
                },
                layout: [
                    { x: 0, y: 0, w: 12, h: 4, i: "1" },
                    { x: 0, y: 0, w: 12, h: 4, i: "0" },
                ]
            }
        },
        methods: {
            fetchOnlineCharacters() {
                const self = this;
                self.isLoading = true;

                window.axios.get(self.coorsProxyUrl + self.eden.api.endpoints.get.onlineCharacters)
                    .then(function(response) {
                        self.onlineCharacters = response.data.characters;
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(function () {
                        self.isLoading = false;
                    });
            },
        },
        computed: {
            onlineCharacters: {
                get: function () {
                    return this.eden.data.onlineCharacters
                },
                set: function (val) {
                    this.eden.data.onlineCharacters = val;
                }
            }
        }
    }
</script>

<style scoped>
</style>
