<template>
    <main id="app">
        <div
            data-preset="fan"
            class="ldBar label-center"
            data-value="35"
        ></div>
        <TheRacesChartsManager :data="eden.data.onlineCharacters"></TheRacesChartsManager>
        <ul class="characterList">

        </ul>
    </main>
</template>

<script>
    import TheRacesChartsManager from '@cX/chart/manager/TheRacesChartsManager.vue';
    import FirebaseService from '@/services/firebase.service';
    import censusModel from '@/models/census-data.model';
    import { craftsTransformer } from '@/transformers/from-object/crafts.transformer';
    import { facesTransformer } from "@/transformers/from-object/faces.transformer";
    import {  } from "@/transformers/from-object/.transformer";
   /* import {  } from "@/transformers/from-object/.transformer";
    import {  } from "@/transformers/from-object/.transformer";
    import {  } from "@/transformers/from-object/.transformer";
    import {  } from "@/transformers/from-object/.transformer";
    import {  } from "@/transformers/from-object/.transformer";*/


    export default {
        name: 'app',
        components: {
            TheRacesChartsManager
        },
        mixins: [

        ],
        created() {
            let firebaseService = new FirebaseService(window._config.FIREBASE_CONFIG);
            firebaseService.database.ref('/profiles').once('value')
                .then(function (snapshot) {
                    let profiles = snapshot.val();
                    window._.values(profiles).forEach(function(profile) {
                        craftsTransformer(profile, censusModel);
                        facesTransformer(profile, censusModel);
                    });
                }).then(function () {
                    console.log(censusModel)
                })
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
                                characterProfile: 'https://edenxi.com/ajax/character' /* -->
                                    params:
                                        id - character id
                                */

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
                var self = this;
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
        margin-top: 60px;
    }
</style>
