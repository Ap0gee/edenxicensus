'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');

const now = function() { return moment().format("Y-M-D h:m:ss"); };

exports.collectOnlineCharacters = functions.https.onRequest(async (req, res) => {
    axios.get('https://cors-anywhere.herokuapp.com/https://www.edenxi.com/ajax/onlinecharacters', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(function (response) {
            response.data.characters.forEach(function(character, index) {
                let ref = admin.database().ref('/characters/' + character.charname);
                ref.once('value').then(function(snapshot) {
                    let charData = {
                        id: character.charid,
                        name: character.charname,
                        last_updated: now(),
                    };
                    if (snapshot.exists()) {
                        if (!snapshot.val().hasOwnProperty('last_read') || !snapshot.val().hasOwnProperty('needs_read')) {
                            charData = _.merge(charData, {'last_read': now(), 'needs_read': true});
                        }
                        ref.update(charData);
                    } else {
                        ref.set(charData);
                    }
                });
            });
        })
        .then(function() {
            res.status(200).send('done ' + now());
        })
        .catch(function (error) {
            console.log(error);
            res.status(500);
        });
});

exports.updateOnlineCharacters = functions.https.onRequest(async(req, res)=> {
    let ref = admin.database().ref('/characters');
    ref.once('value').then(function(snapshot) {
        let updates = _.mapValues(snapshot.val(), function(char) {
            if ( ! char.hasOwnProperty('last_read') || ! char.hasOwnProperty('needs_read') ) {
                return _.merge(char, {'needs_read': true} )
            }
            return char;
        });
        ref.update(updates);
    }).then(function () {
        res.status(200).send('done ' + now());
    });
});

exports.collectCharacterProfiles = functions.https.onRequest(async (req, res) => {
    let ref = admin.database().ref('/characters');
    ref.orderByChild('needs_read').equalTo(true).limitToFirst(60).once('value').then(function(snapshot) {
        if (_.keys(snapshot.val()).length) {
            console.log('has items, process.')
            //collect profile for each char, flip needs_read and set last_read.
        } else {
            console.log('no items left, reset db')
            //flip needs_read for every character.
        }
    }).then(function() {
        res.status(200).send('done ' + now());
    });
});