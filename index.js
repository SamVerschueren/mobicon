'use strict';
var path = require('path');
var pathExists = require('path-exists');
var Promise = require('pinkie-promise');
var pify = require('pify');
var objectAssign = require('object-assign');
var gm = require('gm');
var mkdir = require('mkdirp');
var platforms = require('./platforms.json');
var mkdirp = pify(mkdir, Promise);

function calculateDimension(imgSize, iconSize, opts, resizeFn) {
	var width;
	var height;

	if (imgSize.width > imgSize.height) {
		width = iconSize * opts.contentRatio;
		height = imgSize.height / imgSize.width * width;
	} else {
		height = iconSize * opts.contentRatio;
		width = imgSize.width / imgSize.height * height;
	}

	if (resizeFn === 'density') {
		// calculate the dpi (= 72 * targetSize / srcSize)
		width = 72 * width / imgSize.width;
		height = 72 * height / imgSize.height;
	}

	return {width: width, height: height};
}

module.exports = function (file, opts) {
	if (typeof file !== 'string' || !pathExists.sync(file)) {
		return Promise.reject(new TypeError('Expected a file.'));
	}

	opts = objectAssign({
		platform: '',
		dest: process.cwd(),
		background: 'white',
		contentRatio: 1
	}, opts);

	if (opts.platform === '') {
		return Promise.reject(new Error('Please provide a platform'));
	} else if (Object.keys(platforms).indexOf(opts.platform.toLowerCase()) === -1) {
		return Promise.reject(new Error('Platform ' + opts.platform + ' is not supported.'));
	}

	var platform = platforms[opts.platform.toLowerCase()];
	var resizeFn = path.extname(file) === '.svg' ? 'density' : 'resize';

	var img = gm(file);

	return pify(img.identify.bind(img), Promise)()
		.then(function (identity) {
			var size = identity.size;

			return Promise.all(platform.icons.map(function (icon) {
				var dest = path.join(opts.dest, icon.file);
				var dimension = calculateDimension(size, icon.dimension, opts, resizeFn);

				var image = gm(file)[resizeFn](dimension.width, dimension.height)
					.gravity('Center')
					.background(opts.background)
					.extent(icon.dimension, icon.dimension);

				return mkdirp(path.dirname(dest))
					.then(function () {
						return pify(image.write.bind(image), Promise)(dest);
					});
			}));
		});
};
