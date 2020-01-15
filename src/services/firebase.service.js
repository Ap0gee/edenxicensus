import { firebase } from "@firebase/app";
import "@firebase/firestore";


import * as admin from 'firebase-admin';

export default class FirebaseService {
    constructor(config) {
        this.config = config;
        this.app = firebase.initializeApp(this.config);
        this.firestore =  this.app.firestore();
    }
}

