/**
 * Merge firebase functions dependencies into root package.json for single installation.
**/

const path = require('path');
const fs = require('fs');
const path_firebase_functions = path.resolve('baas/firebase/functions');
const _ = require('lodash');

let path_dst = path.resolve('package.json');
let package_dst = require(path_dst);

let path_src = path.resolve(path_firebase_functions + '/package.json');
let package_src = require(path_src);

package_dst = _.merge(package_dst, {"dependencies":package_src['dependencies'], "devDependencies":package_src['devDependencies']});

let result = JSON.stringify(package_dst, null, 2);

fs.writeFile(path_dst, result, function () {
    console.log('Module dependencies merged!');
});
