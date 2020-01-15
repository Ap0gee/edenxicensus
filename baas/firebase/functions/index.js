'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const axios = require('axios');
const moment = require('moment');

exports.collectOnlineCharacters = functions.https.onRequest(async (req, res) => {
    axios.get('https://cors-anywhere.herokuapp.com/https://www.edenxi.com/ajax/onlinecharacters', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(function (response) {
            response.data.characters.forEach(function(character, index) {
                admin.database().ref('/characters/' + character.charname).set({
                    id: character.charid,
                    name: character.charname,
                    last_updated: moment().format("Y-M-D h:m:ss")
                });
            });
            res.status(200).send('done ' + moment().format("Y-M-D h:m:ss"));
        })
        .catch(function (error) {
            console.log(error);
            res.status(500);
        });
});

exports.collectCharacterProfiles = functions.https.onRequest(async (req, res) => {
    admin.database().ref("/characters").get()
        .then(function (snapshot) {
            snapshot.forEach(function (doc) {
                console.log(doc.id, doc.data());
            })
        });
});