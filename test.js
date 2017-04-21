import path from 'path';
import test from 'ava';
import pathExists from 'path-exists';
import tempfile from 'tempfile';
import gm from 'gm';
import pify from 'pify';
import fn from './';

test.beforeEach(t => {
	t.context.tmp = tempfile();
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
