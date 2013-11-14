var fs   = require('fs'),
    path = require('path'),
    _    = require('underscore');
var __parentDir = path.dirname(module.parent.filename);

var configr = function () {
	this.$path = '';
	this.prefix('config');
	this.path('');
};

configr.prototype.init = function () {
	this.data = {};
	var configName = '/' + this.$prefix +'.json',
        data, _path, x;
    if (this.$path !== '') {
		_path = path.resolve(__parentDir, this.$path);
    } else {
		_path = __parentDir;
    }
      
    try {
        data = require(_path + configName);
    } catch (e) {
        data = {};
    }
    for (x in data) {
        if (data.hasOwnProperty(x)) {
            this.data[x] = data[x];
        }
    }
};

configr.prototype.load = function (name) {
	var n, _path;
	name = name.split(',');
	if (this.$path !== '') {
		_path = path.resolve(__parentDir, this.$path);
    } else {
		_path = __parentDir;
    }
	for (n in name) {
		if (name.hasOwnProperty(n)) {
			var _name = name[n].replace(/^\s+|\s+$/g, '');
			this.data[_name] = {};
			var configName = '/' + this.$prefix + '.' + _name + '.json',
				data, x;
			try {
				data = require(_path + configName);
			} catch (e) {
				data = {};
				delete this.data[_name];
			}

			for (x in data) {
				if (data.hasOwnProperty(x)) {
					this.data[_name][x] = data[x];
				}
			}
		}
	}
	return this;
};

configr.prototype.get = function (name) {
	if (typeof name === 'undefined') {
		return this.data;
	} else {
		var n, select, parent;
		name = name.split('.');
		for (n in name) {
			if (name.hasOwnProperty(n)) {
				var _name = name[n];
				if (typeof select === 'undefined') {
					select = this.data[_name];
				} else {
					select = select[_name];
				}
			}
		}
		
		select.length = _.size(select);
		return select;
	}
};

configr.prototype.path = function (_path) {
	this.$path = _path;
	this.init();
	return this;
};

configr.prototype.prefix = function (prefix) {
	this.$prefix = prefix;
	this.init();
	return this;
};

configr.prototype.where = function (condition) {
    return _.findWhere(this, condition);
};

module.exports = new configr;