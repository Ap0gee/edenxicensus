const moment = require('moment');

module.exports = {
    now: function(format="Y-M-D H:M:S") {
        let now = moment();
        return format ? now.format(format) : now;
    },
    avg: function(arr) {
        return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
    }
};
