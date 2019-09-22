'use strict';
var Map = require('hashmap');
var logger = require('./logger');
var cache = require('memory-cache');

/**
 * 读取数据并缓存
 */
function getData(name) {
    var data = cache.get(name);
    if (data) return data;
    var data = require('../app_data/' + name.toLowerCase() + '.json');
    cache.put(name, data);
    return data;
}

/**
 * 同步读取文件内容并缓存
 */
function getFileData(name) {
    var data = null;
    try {
        data = cache.get(name);
        if (data) return data;
        var rf = require('fs');
        var data = rf.readFileSync(tools.util.format("./app_data/%s", name.toLowerCase()), 'utf-8');
        if (!tools.isNullOrEmpty(data)) {
            cache.put(name, data);
        }
    } catch (ex) {
        logger.error(tools.util.format('read file error:%s', name), ex);
    }
    return data;
}


exports.getMonitorUrls = function () {
    var data = getData('monitor');
    return data;
}

/**
 * 启动时加载到缓存
 */
exports.init = function () {
    exports.getMonitorUrls();
    logger.info('基础数据加载完毕');
}