import path from 'path';
import fs from 'fs';
import test from 'ava';
import pathExists from 'path-exists';
import tempfile from 'tempfile';
import gm from 'gm';
import pify from 'pify';
import parsePNG from 'parse-png';
import fn from '.';

test.beforeEach(t => {
	t.context.tmp = tempfile();
});

test('pwa', async t => {
	await fn('fixtures/icon.png', {platform: 'pwa', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-72x72.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-96x96.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-128x128.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-144x144.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-152x152.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-192x192.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-384x384.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-512x512.png')));
});

test('android', async t => {
	await fn('fixtures/icon.png', {platform: 'android', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'mipmap-ldpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'mipmap-mdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'mipmap-hdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'mipmap-xhdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'mipmap-xxhdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'mipmap-xxxhdpi/icon.png')));
});

test('ios', async t => {
	await fn('fixtures/icon.png', {platform: 'ios', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'icon.png')));
});

test('bb10', async t => {
	await fn('fixtures/icon.png', {platform: 'blackberry10', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-90.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-96.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-110.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-144.png')));
});

test('output size png', async t => {
	await fn('fixtures/icon.png', {platform: 'ios', dest: t.context.tmp});

	const image = gm(path.join(t.context.tmp, 'icon-40.png'));
	const {width, height} = await pify(image.size.bind(image))();

	t.is(width, 40);
	t.is(height, 40);
});

test('output size svg', async t => {
	await fn('fixtures/icon.svg', {platform: 'ios', dest: t.context.tmp});

	const image = gm(path.join(t.context.tmp, 'icon-40.png'));
	const {width, height} = await pify(image.size.bind(image))();

	t.is(width, 40);
	t.is(height, 40);
});

test('transparent corners', async t => {
	await fn('fixtures/icon.svg', {platform: 'pwa', dest: t.context.tmp, roundedCorners: true});

	const {data} = await parsePNG(fs.readFileSync(path.join(t.context.tmp, 'icon-72x72.png')));

	// Check the first pixel
	t.is(data[0], 0); // R
	t.is(data[1], 0); // G
	t.is(data[2], 0); // B
	t.is(data[3], 0); // A
});
