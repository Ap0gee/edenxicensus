'use strict';
const axios = require('axios');
const _ = require('lodash');
const h = require('./helpers');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/* Collect Online Characters
=======================================================================================================================*/

/**
 * Collect and store all online characters gathered from the remote resource.
 * @type {HttpsFunction}
 */
exports.collectOnlineCharacters = functions.https.onRequest(async (req, res) => {
    console.log('Collecting online characters...');
    axios.get('https://cors-anywhere.herokuapp.com/https://www.edenxi.com/ajax/onlinecharacters', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(function (response) {
            let last_updated = h.now();
            let ref = admin.database().ref(`/data/characters/averages/online/${ h.now('Y-M-D') }/${ last_updated }`);
            ref.set({
                unique: response.data.unique,
                online: response.data.characters.length,
                last_updated: last_updated,
            });
            response.data.characters.forEach(function(character, index) {
                let last_updated = h.now();
                let ref = admin.database().ref(`/characters/${ character.charname }`);
                ref.once('value').then(function(snapshot) {
                    let charData = {
                        id: character.charid,
                        name: character.charname,
                        last_updated: last_updated,
                    };
                    if ( ! snapshot.exists() ) {
                        charData = _.merge(charData, {'last_read': last_updated, 'needs_read': true});
                        ref.set(charData);
                    } else {
                        if ( ! snapshot.val().hasOwnProperty('last_read') || ! snapshot.val().hasOwnProperty('needs_read')) {
                            charData = _.merge(charData, {'last_read': last_updated, 'needs_read': true});
                        }
                        ref.update(charData);
                    }
                });
            });
        })
        .then(function() {
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
exports.collectOnlineCharactersScheduled = functions.pubsub.schedule('*/15 * * * *').onRun((context) => {
    console.log('Invoking "collectOnlineCharacters" https function...');
    axios.get('https://us-central1-edenxicensus.cloudfunctions.net/collectOnlineCharacters', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
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
    ref.orderByChild('needs_read').equalTo(true).limitToLast(50).once('value')
        .then(function(snapshot) {
            let characters = snapshot.val();
            if (_.keys(characters).length) {
                _.values(characters).forEach(function (character, index) {
                    setTimeout(async () => {
                        axios.get(`https://edenxi.com/ajax/character?id=${ character.id }`, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
                            .then(function(response) {
                                let ref = admin.database().ref(`/profiles/${ character.id }`);
                                ref.set(_.merge(response.data, {'last_updated': h.now()}));
                            })
                            .then(function() {
                                let ref = admin.database().ref(`/characters/${ character.name }`);
                                ref.update({
                                    'last_read': h.now(),
                                    'needs_read': false
                                });
                            })
                            .catch(function(error) {
                                console.log(error);
                            })
                    }, 100);
                });
            }
        })
        .then(function() {
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
 * Run every 3 minutes.
 * @type {CloudFunction<unknown>}
 */
exports.collectCharacterProfilesScheduled = functions.pubsub.schedule('*/3 * * * *').onRun((context) => {
    console.log('Invoking "collectCharacterProfiles" https function...');
    axios.get('https://us-central1-edenxicensus.cloudfunctions.net/collectCharacterProfiles', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(function (response) {
            console.log('success');
        })
        .catch(function (error) {
            console.log(error);
        });
    return null;
});

/* Update Character Data
=======================================================================================================================*/

/**
 * Gather and update totals of collected resources.
 * @type {HttpsFunction}
 */
exports.updateCollectionTotals = functions.https.onRequest(async (req, res) => {
    console.log('Updating totals...');
    let last_updated = h.now();

    let characters = {};
    let profiles = {};

    let ref = admin.database().ref('/characters');
    ref.once('value')
        .then(function(snapshot) {
            characters = snapshot.val();
        })
        .then(function () {
            let ref = admin.database().ref(`/data/characters/averages/total/${h.now('Y-M-D')}/${last_updated}`);
            ref.set({
                total: _.keys(characters).length,
                last_updated: last_updated
            });
        });

    ref = admin.database().ref('/profiles');
    ref.once('value')
        .then(function(snapshot) {
            profiles = snapshot.val();
        })
        .then(function () {
            let ref = admin.database().ref(`/data/profiles/averages/total/${h.now('Y-M-D')}/${last_updated}`);
            ref.set({
                total: _.keys(profiles).length,
                last_updated: last_updated
            });
        });

    console.log('success');
    res.status(200).send(`done : ${h.now()}`);
});

/**
 * Run the "updateCharacterData" https function on a schedule.
 * Run every 15 minutes.
 * @type {CloudFunction<unknown>}
 */
exports.updateCollectionTotalsScheduled = functions.pubsub.schedule('*/15 * * * *').onRun((context) => {
    console.log('Invoking "updateCollectionTotals" https function...');
    axios.get('https://us-central1-edenxicensus.cloudfunctions.net/updateCollectionTotals', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(function (response) {
            console.log('success');
        })
        .catch(function (error) {
            console.log(error);
        });
    return null;
});

/* Calculate Averages
=======================================================================================================================*/

/**
 * Calculate and update character averages.
 * Run every 15 minutes.
 * @type {HttpsFunction}
 */
exports.updateCharacterAverages = functions.https.onRequest(async (req, res) => {
    let last_updated = h.now();
    let ref = admin.database().ref('/characters');
    ref.once('value')
        .then(function(snapshot) {
            //TODO
        });
});