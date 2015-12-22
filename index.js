'use strict';
var path = require('path');
var pathExists = require('path-exists');
var Promise = require('pinkie-promise');
var pify = require('pify');
var objectAssign = require('object-assign');
var gm = require('gm');
var mkdirp = require('mkdirp');
var platforms = require('./platforms.json');
module.exports = function (file, opts) {
	if (typeof file !== 'string' || !pathExists.sync(file)) {
		return Promise.reject(new TypeError('Expected a file.'));
	}

	opts = objectAssign({platform: '', dest: process.cwd()}, opts);

	if (opts.platform === '') {
		return Promise.reject(new Error('Please provide a platform'));
	} else if (Object.keys(platforms).indexOf(opts.platform.toLowerCase()) === -1) {
		return Promise.reject(new Error('Platform ' + opts.platform + ' is not supported.'));
	}

	var platform = platforms[opts.platform.toLowerCase()];
	var fn = path.extname(file) === '.svg' ? 'density' : 'resize';

	return Promise.all(platform.icons.map(function (icon) {
		var dest = path.join(opts.dest, platform.dest, icon.file);
		var image = gm(file)[fn](icon.dimension, icon.dimension);

		mkdirp.sync(path.dirname(dest));

		return pify(image.write.bind(image), Promise)(dest);
	}));
};
