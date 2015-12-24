import test from 'ava';
import path from 'path';
import pathExists from 'path-exists';
import tempfile from 'tempfile';
import fn from './';

test('android', async t => {
	const dest = tempfile();

	await fn('./fixtures/icon.png', {platform: 'android', dest: dest});

	t.true(pathExists.sync(path.join(dest, 'drawable/icon.png')));
	t.true(pathExists.sync(path.join(dest, 'drawable-ldpi/icon.png')));
	t.true(pathExists.sync(path.join(dest, 'drawable-mdpi/icon.png')));
	t.true(pathExists.sync(path.join(dest, 'drawable-hdpi/icon.png')));
	t.true(pathExists.sync(path.join(dest, 'drawable-xhdpi/icon.png')));
	t.true(pathExists.sync(path.join(dest, 'drawable-xxhdpi/icon.png')));
	t.true(pathExists.sync(path.join(dest, 'drawable-xxxhdpi/icon.png')));
});

test('ios', async t => {
	const dest = tempfile();

	await fn('./fixtures/icon.png', {platform: 'ios', dest: dest});

	t.true(pathExists.sync(path.join(dest, 'icon.png')));
});

test('bb10', async t => {
	const dest = tempfile();

	await fn('./fixtures/icon.png', {platform: 'blackberry10', dest: dest});

	t.true(pathExists.sync(path.join(dest, 'icon-90.png')));
	t.true(pathExists.sync(path.join(dest, 'icon-96.png')));
	t.true(pathExists.sync(path.join(dest, 'icon-110.png')));
	t.true(pathExists.sync(path.join(dest, 'icon-144.png')));
});
