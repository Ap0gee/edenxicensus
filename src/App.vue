<template>
    <main id="app">
        <GridWidgetLayout />
    </main>
</template>

<script>
    import FirebaseService from '@/services/firebase.service';
    import censusSnapshot from '@/misc/test_data/census-snapshot';
    import GridWidgetLayout from "@/components/tailwind/layout/GridWidgetLayout";

    export default {
        name: 'app',
        components: {
            GridWidgetLayout
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
                isLoading: true,
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
                    }
                }
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

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #1f1f1f;
        margin-top: 60px;
    }
</style>
