var fs   = require('fs'),
    path = require('path'),
    _    = require('underscore');
var __parentDir = path.dirname(module.parent.filename);

var configr = function () {
    var configName = '/config.json',
        data, x;
    
    try {
        data = require(__parentDir + configName);
    } catch (e) {
        data = {};
    }
    for (x in data) {
        if (data.hasOwnProperty(x)) {
            this[x] = data[x];
        }
    }
};

configr.prototype.load = function (name) {
    this[name] = {};
    var configName = '/' + name + '.json',
        data, x;
    try {
        data = require(__parentDir + configName);
    } catch (e) {
        data = {};
    }
    for (x in data) {
        if (data.hasOwnProperty(x)) {
            this[name][x] = data[x];
        }
    }
    return this;
};

configr.prototype.where = function (condition) {
    return _.where(this, condition);
};

module.exports = new configr;