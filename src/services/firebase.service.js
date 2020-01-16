const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

export default class FirebaseService {
    constructor(config) {
        this.config = config;
        this.app = firebase.initializeApp(this.config);
        this.firestore = this.app.firestore();
        this.database = this.app.database();
    }
}

