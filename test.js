import test from 'ava';
import pathExists from 'path-exists';
import del from 'del';
import fn from './';

test.after(async () => {
	await del(['android', 'ios', 'bb10']);
});

test('android', async t => {
	await fn('./fixtures/icon.png', {platform: 'android', dest: 'android'});

	t.true(pathExists.sync('android/res/drawable/icon.png'));
	t.true(pathExists.sync('android/res/drawable-ldpi/icon.png'));
	t.true(pathExists.sync('android/res/drawable-mdpi/icon.png'));
	t.true(pathExists.sync('android/res/drawable-hdpi/icon.png'));
	t.true(pathExists.sync('android/res/drawable-xhdpi/icon.png'));
	t.true(pathExists.sync('android/res/drawable-xxhdpi/icon.png'));
});

test('ios', async t => {
	await fn('./fixtures/icon.png', {platform: 'ios', dest: 'ios'});

	t.true(pathExists.sync('ios/icons/icon.png'));
});

test('bb10', async t => {
	await fn('./fixtures/icon.png', {platform: 'blackberry10', dest: 'bb10'});

	t.true(pathExists.sync('bb10/icon-86.png'));
	t.true(pathExists.sync('bb10/icon-150.png'));
});
