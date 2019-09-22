'use strict';

var logger = require('./utils/logger');
var stopwatch = require('./utils/stopwatch');
var appData = require('./utils/appdata');
var tools = require('./utils/tools');
var cache = require('memory-cache');

exports.debug = function (input) {
    console.log(input);
}
exports.logger = logger;
exports.stopwatch = stopwatch;
exports.appData = appData;
exports.tools = tools;
exports.cache = cache;