'use strict';
const path = require('path');
const pathExists = require('path-exists');
const pify = require('pify');
const gm = require('gm');
const mkdir = require('mkdirp');
const androidIcons = require('android-icon-list');
const bb10Icons = require('bb10-icon-list');
const iosIcons = require('ios-icon-list');

const mkdirp = pify(mkdir);

const platformIcons = {
	android: androidIcons(),
	ios: iosIcons(),
	blackberry10: bb10Icons()
};

const calculateDimension = (imgSize, iconSize, opts, resizeFn) => {
	let width;
	let height;

	if (imgSize.width > imgSize.height) {
		width = iconSize * opts.contentRatio;
		height = imgSize.height / imgSize.width * width;
	} else {
		height = iconSize * opts.contentRatio;
		width = imgSize.width / imgSize.height * height;
	}

	if (resizeFn === 'density') {
		// Calculate the dpi (= 72 * targetSize / srcSize)
		width = 72 * width / imgSize.width;
		height = 72 * height / imgSize.height;
	}

	return {width, height};
};

module.exports = (file, opts) => {
	if (typeof file !== 'string' || !pathExists.sync(file)) {
		return Promise.reject(new TypeError('Expected a file.'));
	}

	opts = Object.assign({
		platform: '',
		dest: process.cwd(),
		background: 'white',
		contentRatio: 1
	}, opts);

	if (opts.platform === '') {
		return Promise.reject(new Error('Please provide a platform'));
	}

	if (Object.keys(platformIcons).indexOf(opts.platform.toLowerCase()) === -1) {
		return Promise.reject(new Error(`Platform ${opts.platform} is not supported.`));
	}

	const icons = platformIcons[opts.platform.toLowerCase()];
	const resizeFn = path.extname(file) === '.svg' ? 'density' : 'resize';

	const img = gm(file);

	return pify(img.identify.bind(img))()
		.then(identity => {
			const {size} = identity;

			return Promise.all(icons.map(icon => {
				const dest = path.join(opts.dest, icon.file);
				const dimension = calculateDimension(size, icon.dimension, opts, resizeFn);

				const image = gm(file)[resizeFn](dimension.width, dimension.height)
					.gravity('Center')
					.background(opts.background)
					.extent(icon.dimension, icon.dimension);

				return mkdirp(path.dirname(dest)).then(() => pify(image.write.bind(image))(dest));
			}));
		});
};
