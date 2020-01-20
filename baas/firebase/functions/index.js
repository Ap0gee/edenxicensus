'use strict';

const axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const _ = require('lodash');
const h = require('./utils/helpers');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const censusModel = require('./models/census-data.model');
const  { craftsTransformer } = require('./transformers/from-object/crafts.transformer');
const  { facesTransformer} = require("./transformers/from-object/faces.transformer");
const  { jobsTransformer } = require("./transformers/from-object/jobs.transformer");
const  { nationsTransformer} = require("./transformers/from-object/nations.transformer");
const  { racesTransformer} = require("./transformers/from-object/races.transformer");
const  { gendersTransformer} = require("./transformers/from-object/genders.transformer");
const  { sizesTransformer } = require("./transformers/from-object/sizes.transformer");
const  { raceSizesTransformer} = require("./transformers/from-object/race-sizes.transformer");
const  { namesTransformer} = require("./transformers/from-object/names.transformer");
const  { mentorsTransformer } = require("./transformers/from-object/mentors.transformer");
const  { raceGendersTransformer} = require("./transformers/from-object/race-genders.transformer");
const  { titlesTransformer} = require("./transformers/from-object/titles.transformer");

/* Collect Online Characters
=======================================================================================================================*/

/**
 * Collect and store all online characters gathered from the remote resource.
 * @type {HttpsFunction}
 */
exports.collectOnlineCharacters = functions.https.onRequest(async (req, res) => {
    console.log('Collecting online characters...');
    axios.get('https://cors-anywhere.herokuapp.com/https://www.edenxi.com/ajax/onlinecharacters')
    .then(function (response) {
        let last_updated = h.now();
        let ref = admin.database().ref(
            `/data/characters/averages/online/${ h.now('Y-M-D') }/${ last_updated }`
        );
        ref.set({
            unique: response.data.unique,
            online: response.data.characters.length,
            last_updated: last_updated,
        });
        response.data.characters.forEach(function (character, index) {
            let last_updated = h.now();
            let ref = admin.database().ref(`/characters/${ character.charname }`);
            ref.once('value')
                .then(function (snapshot) {
                    let charData = {
                        id: character.charid,
                        name: character.charname,
                        last_updated: last_updated,
                    };
                    if (!snapshot.exists()) {
                        charData = _.merge(charData, {
                            'last_read': last_updated,
                            'needs_read': true
                        });
                        ref.set(charData);
                    } else {
                        if ( ! snapshot.val().hasOwnProperty('needs_read') ) {
                            charData = _.merge(charData, {
                                'last_read': last_updated,
                                'needs_read': true
                            });
                        }
                        ref.update(charData);
                    }
                });
        });
    })
    .then(function () {
        console.log('success');
        res.status(200).send(`done : ${ h.now() }`);
    })
    .catch(function (error) {
        console.log(error);
        res.status(500);
    });
});

/**
 * Run the "collectOnlineCharacters" https function on a schedule.
 * Run every 15 minutes.
 * @type {CloudFunction<unknown>}
 */
exports.collectOnlineCharactersScheduled = functions.pubsub.schedule('*/15 * * * *')
    .onRun((context) => {
        console.log('Invoking "collectOnlineCharacters" https function...');
        axios.get('https://us-central1-edenxicensus.cloudfunctions.net/collectOnlineCharacters')
        .then(function (response) {
            console.log('success');
        })
        .catch(function (error) {
            console.log(error);
        });
        return null;
    });

/* Collect Character Profiles
=======================================================================================================================*/

/**
 * Collect and store character profiles gathered from the remote resource.
 * @type {HttpsFunction}
 */
exports.collectCharacterProfiles = functions.https.onRequest(async (req, res) => {
    console.log('Collecting character profiles...');
    let ref = admin.database().ref('/characters');
    ref.orderByChild('needs_read')
        .equalTo(true)
        .limitToLast(50)
        .once('value')
        .then(function (snapshot) {
            let characters = snapshot.val();
            let charsTotal = _.keys(characters).length;
            if (charsTotal === 50) {
                console.log(`processing ${charsTotal} characters`);
                _.values(characters).forEach(function (character, index) {
                    setTimeout(async () => {
                        axios.get(`https://edenxi.com/ajax/character?id=${ character.id }`)
                        .then(function (response) {
                            let ref = admin.database().ref(`/profiles/${ character.id }`);
                            ref.set(_.merge(response.data, {'last_updated': h.now()}));
                        })
                        .then(function () {
                            let ref = admin.database().ref(`/characters/${ character.name }`);
                            ref.update({
                                'last_read': h.now(),
                                'needs_read': false
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                            if (error.response.status === 400) {
                                console.log('Removing Character...');
                                let ref = admin.database().ref(`/characters/${ character.name }`);
                                ref.remove()
                                    .then(function () {
                                        let ref = admin.database().ref('/data/characters/removed');
                                        ref.once('value')
                                            .then(function(snapshot) {
                                                ref.set(snapshot.val() + 1);
                                            });
                                    });
                                console.log('Removing Profile...');
                                ref = admin.database().ref(`/profiles/${ character.id }`);
                                ref.remove()
                                    .then(function () {
                                        let ref = admin.database().ref('/data/profiles/removed');
                                        ref.once('value')
                                            .then(function(snapshot) {
                                                ref.set(snapshot.val() + 1);
                                            });
                                    })
                            }
                        })
                    }, 100);
                });
            } else {
                console.log('Not enough characters to process.')
            }
        })
        .then(function () {
            console.log('success');
            res.status(200).send(`done : ${ h.now() }`);
        })
        .catch(function (error) {
            console.log(error);
            res.status(500);
        });
});

/**
 * Run the "collectCharacterProfiles" https function on a schedule.
 * Run every 15 minutes.
 * @type {CloudFunction<unknown>}
 */
exports.collectCharacterProfilesScheduled = functions.pubsub.schedule('*/15 * * * *')
    .onRun((context) => {
        console.log('Invoking "collectCharacterProfiles" https function...');
        axios.get('https://us-central1-edenxicensus.cloudfunctions.net/collectCharacterProfiles')
        .then(function (response) {
            console.log('success');
        })
        .catch(function (error) {
            console.log(error);
        });
        return null;
    });

/* Update Collected Resource Totals
=======================================================================================================================*/

/**
 * Update character totals on a schedule.
 * Run every hour.
 * @type {CloudFunction<unknown>}
 */
exports.updateCharacterTotalsScheduled = functions.pubsub.schedule('0 * * * *')
    .onRun((context) => {
        console.log('Updating character totals...');
        let last_updated = h.now();
        let characters = {};

        let ref = admin.database().ref('/characters');
        ref.once('value')
            .then(function (snapshot) {
                characters = snapshot.val();
            })
            .then(function () {
                let ref = admin.database().ref(
                    `/data/characters/averages/total/${ h.now('Y-M-D') }/${ last_updated }`
                );
                ref.set({
                    total: _.keys(characters).length,
                    last_updated: last_updated
                });
            })
            .then(function () {
                console.log('success');
            });

        return null;
    });

/**
 * Update profile totals on a schedule.
 * Run every hour.
 * @type {HttpsFunction}
 */
exports.updateProfileTotalsScheduled = functions.pubsub.schedule('0 * * * *')
    .onRun((context) => {
        console.log('Updating profile totals...');
        let last_updated = h.now();
        let profiles = {};

        let ref = admin.database().ref('/profiles');
        ref.once('value')
            .then(function (snapshot) {
                profiles = snapshot.val();
            })
            .then(function () {
                let ref = admin.database().ref(
                    `/data/profiles/averages/total/${ h.now('Y-M-D') }/${ last_updated }`
                );
                ref.set({
                    total: _.keys(profiles).length,
                    last_updated: last_updated
                });
            })
            .then(function () {
                console.log('success');
            });

        return null;
    });

/* Calculate Collected Resource Averages
=======================================================================================================================*/

exports.calculateCharactersOnlineAverages = functions.database.ref('/data/characters/averages/online/{date}')
    .onCreate((snapshot, context) => {
        console.log('Calculating characters online averages...');
        let prevDate = h.now(false).subtract(1, "days");
        let avgs = {};
        let ref = admin.database().ref(`/data/characters/averages/online/${ prevDate.format('Y-M-D') }`);
        ref.once('value')
            .then(function (snapshot) {
                if (_.keys(snapshot.val()).length > 1) {
                    let onlineData = _.map(snapshot.val(), 'online');
                    let uniqueData = _.map(snapshot.val(), 'unique');
                    avgs['online'] = h.avg(onlineData).toFixed(2);
                    avgs['online-min'] = Math.min(...onlineData);
                    avgs['online-max'] = Math.max(...onlineData);
                    avgs['unique'] = h.avg(uniqueData).toFixed(2);
                    avgs['unique-min'] = Math.min(...uniqueData);
                    avgs['unique-max'] = Math.max(...uniqueData);
                    ref.remove()
                        .then(function () {
                            let ref = admin.database().ref(
                                `/data/characters/averages/online/${ prevDate.format('Y-M-D') }/calculated`
                            );
                            ref.set(_.merge(avgs, {'last_updated': h.now()}))
                            .then(function () {
                                console.log('success')
                            })
                        });
                } else {
                    console.log('success');
                }
            });

        return null;
    });

exports.calculateCharactersTotalAverages = functions.database.ref('/data/characters/averages/total/{date}')
    .onCreate((snapshot, context) => {
        console.log('Calculating characters total averages...');
        let prevDate = h.now(false).subtract(1, "days");
        let avgs = {};
        let ref = admin.database().ref(`/data/characters/averages/total/${ prevDate.format('Y-M-D') }`);
        ref.once('value')
            .then(function (snapshot) {
                if (_.keys(snapshot.val()).length > 1) {
                    let totalData = _.map(snapshot.val(), 'total');
                    avgs['total'] = h.avg(totalData).toFixed(2);
                    avgs['total-min'] = Math.min(...totalData);
                    avgs['total-max'] = Math.max(...totalData);
                    ref.remove()
                        .then(function () {
                            let ref = admin.database().ref(
                                `/data/characters/averages/total/${ prevDate.format('Y-M-D') }/calculated`
                            );
                            ref.set(_.merge(avgs, {'last_updated': h.now()}))
                            .then(function () {
                                console.log('success')
                            })
                        });
                } else {
                    console.log('success');
                }
            });

        return null;
    });

exports.calculateProfilesTotalAverages = functions.database.ref('/data/profiles/averages/total/{date}')
    .onCreate((snapshot, context) => {
        console.log('Calculating profiles total averages...');
        let prevDate = h.now(false).subtract(1, "days");
        let avgs = {};
        let ref = admin.database().ref(`/data/profiles/averages/total/${ prevDate.format('Y-M-D') }`);
        ref.once('value')
            .then(function (snapshot) {
                if (_.keys(snapshot.val()).length > 1) {
                    let totalData = _.map(snapshot.val(), 'total');
                    avgs['total'] = h.avg(totalData).toFixed(2);
                    avgs['total-min'] = Math.min(...totalData);
                    avgs['total-max'] = Math.max(...totalData);
                    ref.remove()
                        .then(function () {
                            let ref = admin.database().ref(
                                `/data/profiles/averages/total/${ prevDate.format('Y-M-D') }/calculated`
                            );
                            ref.set(ref.set(_.merge(avgs, {'last_updated': h.now()})));
                        });
                }
            })
            .then(function () {
                console.log('Flipping profile collection flags...');
                let ref = admin.database().ref('/characters');
                ref.once('value').then(function(snapshot) {
                    let updates = _.mapValues(snapshot.val(), function(char) {
                        return _.merge(char, {'needs_read': true})
                    });
                    ref.update(updates);
                });
            })
            .then(function () {
                console.log('success');
            });

        return null;
    });

/* Generate and Store Census Data
=======================================================================================================================*/

exports.generateCensusSnapshot = functions.runWith({
    memory: '1GB'
}).https.onRequest(async(req, res) => {
    console.log('Generating census snapshot');
    let ref = admin.database().ref('/profiles');
    ref.once('value')
        .then(function (snapshot) {
            let profiles = snapshot.val();
            _.values(profiles).forEach(function(profile) {
                craftsTransformer(profile, censusModel);
                facesTransformer(profile, censusModel);
                jobsTransformer(profile, censusModel);
                nationsTransformer(profile, censusModel);
                racesTransformer(profile, censusModel);
                gendersTransformer(profile, censusModel);
                sizesTransformer(profile, censusModel);
                raceSizesTransformer(profile, censusModel);
                namesTransformer(profile, censusModel);
                mentorsTransformer(profile, censusModel);
                raceGendersTransformer(profile, censusModel);
                titlesTransformer(profile, censusModel);
            });
        })
        .then(function () {
            let ref = admin.database().ref(`/data/snapshots/${ h.now('Y-M') }/${ h.now('Y-M-D') }`);
            ref.set(censusModel)
                .then(function() {
                    console.log('success');
                    res.status(200).send(`done : ${ h.now() }`);
                });
        })
});

/**
 * Run the "collectOnlineCharacters" https function on a schedule.
 * Run every 12 hours.
 * @type {CloudFunction<unknown>}
 */
exports.generateCensusSnapshotScheduled = functions.pubsub.schedule('0 */12 * * *')
    .onRun((context) => {
        console.log('Invoking "generateCensusSnapshot" https function...');
        axios.get('https://us-central1-edenxicensus.cloudfunctions.net/generateCensusSnapshot')
            .then(function (response) {
                console.log('success');
            })
            .catch(function (error) {
                console.log(error);
            });
        return null;
    });

/* Utils
=======================================================================================================================*/

exports.updateOnlineCharacters = functions.https.onRequest(async(req, res) => {
    let ref = admin.database().ref('/characters');
    let total = 0;
    ref.once('value')
        .then(function(snapshot) {
            let updates = _.mapValues(snapshot.val(), function(char) {
                if ( ! char.hasOwnProperty('last_read') || ! char.hasOwnProperty('needs_read') ) {
                    total += 1;
                    return _.merge(char, {'needs_read': true} )
                }
                return char;
            });
            ref.update(updates);
        })
        .then(function () {
            if (total) {
                console.log(`updating ${ total } characters`);
            } else {
                console.log('no characters updated');
            }
        })
        .then(function () {
            res.status(200).send(`done : ${ h.now() }`);
        });
});

exports.removeUnlinkedProfiles = functions.runWith({
    memory: '1GB'
}).https.onRequest(async(req, res) => {
    console.log('Removing unlinked profiles...');
    let ref = admin.database().ref('/profiles');
    ref.once('value')
        .then(function(snapshot) {
            _.values(snapshot.val()).forEach(function(profile, index) {
                let ref = admin.database().ref(`/characters/${ profile.charname }`);
                ref.once('value')
                    .then(function(snapshot) {
                        if ( ! snapshot.exists() ) {
                            console.log("Removing profile...");
                            ref = admin.database().ref(`/profiles/${ profile.charid }`);
                            ref.remove();
                            ref = admin.database().ref('/data/profiles/removed');
                            ref.once('value')
                                .then(function (snapshot) {
                                    ref.set(snapshot.val() + 1)
                                })
                        }
                    })
            });

        })
        .then(function() {
            res.status(200).send(`done : ${ h.now() }`);
        });
});