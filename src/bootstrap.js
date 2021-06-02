window._ = require('lodash');

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.timeout = 30000;

window.moment = require('moment');

window.promise = require('promise');

window.h = require('./utils/helpers');