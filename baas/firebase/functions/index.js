'use strict';
const axios = require('axios');
const _ = require('lodash');
const h = require('./helpers');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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
            ref.once('value').then(function(snapshot) {
                ref.set({
                    unique: response.data.unique,
                    online: response.data.characters.length,
                    last_updated: last_updated,
                });
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
                    if (snapshot.exists()) {
                        if ( ! snapshot.val().hasOwnProperty('last_read') || ! snapshot.val().hasOwnProperty('needs_read')) {
                            charData = _.merge(charData, {'last_read': last_updated, 'needs_read': true});
                        }
                        ref.update(charData);
                    } else {
                        ref.set(charData);
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
 * Run the "collectOnlineCharacters" HTTP function on a schedule.
 * Run every 15 minutes.
 * @type {CloudFunction<unknown>}
 */
exports.collectOnlineCharactersScheduled = functions.pubsub.schedule('15 * * * *').onRun((context) => {
    console.log('Invoking "collectOnlineCharacters" HTTP function...');
    axios.get('https://us-central1-edenxicensus.cloudfunctions.net/collectOnlineCharacters', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(function (response) {
            console.log('success');
        })
        .catch(function (error) {
            console.log(error);
        });
    return null;
});

/**
 * Collect and store character profiles gathered from the remote resource.
 * @type {HttpsFunction}
 */
exports.collectCharacterProfiles = functions.https.onRequest(async (req, res) => {
    let ref = admin.database().ref('/characters');
    ref.orderByChild('needs_read').equalTo(true).limitToFirst(60).once('value')
        .then(function(snapshot) {
            if (_.keys(snapshot.val()).length) {
                console.log('has items, process.')
                //collect profile for each char, flip needs_read and set last_read.
            } else {
                console.log('no items left, reset db')
                //flip needs_read for every character.
            }
        })
        .then(function() {
            res.status(200).send(`done : ${ h.now() }`);
        });
});

/**
 * Gather and update character statistics.
 * @type {HttpsFunction}
 */
exports.updateCharacterData = functions.https.onRequest(async (req, res) => {
    console.log('Updating character data...');
    let last_updated = h.now();
    let characters = {};
    let ref = admin.database().ref('/characters');

    ref.once('value')
        .then(function(snapshot) {
            characters = snapshot.val();
        })
        .then(function () {
            let ref = admin.database().ref(`/data/characters/averages/total/${h.now('Y-M-D')}/${last_updated}`);
            ref.once('value')
                .then(function (snapshot) {
                    ref.set({
                        total: _.keys(characters).length,
                        last_updated: last_updated
                    });
                })
        })
        .then(function () {
            console.log('success');
            res.status(200).send(`done : ${h.now()}`);
        });
});

/**
 * Run the "updateCharacterData" HTTP function on a schedule.
 * Run every 15 minutes.
 * @type {CloudFunction<unknown>}
 */
exports.updateCharacterDataScheduled = functions.pubsub.schedule('15 * * * *').onRun((context) => {
    console.log('Invoking "updateCharacterData" HTTP function...');
    axios.get('https://us-central1-edenxicensus.cloudfunctions.net/updateCharacterData', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(function (response) {
            console.log('success');
        })
        .catch(function (error) {
            console.log(error);
        });
    return null;
});

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