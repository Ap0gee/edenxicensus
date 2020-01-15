/**
 *  Create symbolic a link to root node_modules folder for firebase functions.
 */

const path = require('path');
const fs = require('fs');
const path_firebase_functions = path.resolve('baas/firebase/functions');

let path_src =  path.resolve('node_modules');
let path_dest = path.resolve(path_firebase_functions + '/node_modules');

try {
    if ( ! fs.existsSync(path_dest) ) {
        fs.symlink(
            path_src, path_dest, function (err) {
                console.log(err || "Symbolic link created @ " + path_dest);
            }
        );
    } else {
        console.log("Symbolic link exists @ " + path_dest);
    }

} catch(err) {
    console.error(err)
}

