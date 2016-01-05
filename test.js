import test from 'ava';
import path from 'path';
import pathExists from 'path-exists';
import tempfile from 'tempfile';
import fn from './';

test.beforeEach(t => {
	t.context.tmp = tempfile();
});

test('android', async t => {
	await fn('./fixtures/icon.png', {platform: 'android', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-ldpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-mdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-hdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-xhdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-xxhdpi/icon.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'drawable-xxxhdpi/icon.png')));
});

test('ios', async t => {
	await fn('./fixtures/icon.png', {platform: 'ios', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'icon.png')));
});

test('bb10', async t => {
	await fn('./fixtures/icon.png', {platform: 'blackberry10', dest: t.context.tmp});

	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-90.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-96.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-110.png')));
	t.true(pathExists.sync(path.join(t.context.tmp, 'icon-144.png')));
});
