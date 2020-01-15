export default {
    data: function () {
        return {
            firebase: {
                firestore: undefined
            },
            collection: []
        }
    },
    firestore() {
        return {
            collection: this.Firestore
        }
    },
    beforeMount() {
        if (this.Firestore === undefined) {
            throw 'Invalid Firestore property value. Set Firestore at or before the created() lifecycle hook.';
        }
    },
    computed: {
        Firestore: {
            get: function () {
                return this.firebase.firestore;
            },
            set: function (val) {
                this.firebase.firestore = val;
            }
        } 
    }
}