'use strict';
const fs = require('fs');
const tempy = require('tempy');
const pify = require('pify');
const gm = require('gm');

/**
 * Generate an SVG mask image.
 *
 * @param borderRadius - Radius of the corners.
 */
const generateSVGMask = borderRadius => {
	const tempfile = tempy.file({
		extension: 'svg'
	});

	const size = 2048;
	const radius = Math.round(2048 * borderRadius);

	fs.writeFileSync(tempfile, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
		<svg width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<title>Mobicon</title>
			<defs>Mask</defs>
			<rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" style="fill:rgb(0,0,0)" />
		</svg>
	`);

	return tempfile;
};

/**
 * Generate the mask image for rounded corners.
 *
 * @param dimension - Dimension of the icon.
 * @param borderRadius - Radius of the corners.
 */
module.exports = (dimension, borderRadius) => {
	const svgMask = generateSVGMask(borderRadius);

	const pngMask = tempy.file({
		extension: 'png'
	});

	const maskImage = gm(svgMask)
		.resize(dimension, dimension)
		.background('transparent');

	return pify(maskImage.write.bind(maskImage))(pngMask)
		.then(() => pngMask);
};
