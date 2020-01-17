const moment = require('moment');

module.exports = {
    now: function(format="Y-M-D h:m:ss") {
        let now = moment();
        return format ? now.format(format) : now;
    }
};
