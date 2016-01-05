import test from 'ava';
import path from 'path';
import pathExists from 'path-exists';
import tempfile from 'tempfile';
import gm from 'gm';
import pify from 'pify';
import fn from './';

global.Promise = Promise;

test.beforeEach(t => {
	t.context.tmp = tempfile();
});

test('android', async t => {
	await fn('fixtures/icon.png', {platform: 'android', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-ldpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-mdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-hdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-xhdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-xxhdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-xxxhdpi/icon.png')));
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
