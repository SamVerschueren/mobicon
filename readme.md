# mobicon [![Build Status](https://travis-ci.org/SamVerschueren/mobicon.svg?branch=master)](https://travis-ci.org/SamVerschueren/mobicon)

> Mobile app icon generator


## Install

```
$ npm install --save mobicon
```

### GraphicsMagick

This library depends on [GraphicsMagick](http://www.graphicsmagick.org/), so be sure to install this library as well.

#### Mac OSX

```
$ brew install graphicsmagick
```

#### Linux

```
$ sudo apt-get install graphicsmagick
```

#### Windows

[Manual](http://www.graphicsmagick.org/INSTALL-windows.html) installation or via [chocolatey](https://chocolatey.org/).

```
$ choco install graphicsmagick
```


## Usage

```js
const mobicon = require('mobicon');

mobicon('icon.png', {platform: 'android'}).then(() => {
    // icons generated
});

mobicon('icon.svg', {platform: 'ios', background: '#ff0000', contentRatio: 1}).then(() => {
    // icons generated
});
```


## API

### mobicon(file, options)

#### file

Type: `string`

Source file of the icon.

#### options

##### platform

*Required*<br>
Type: `string`<br>
Values: `pwa` `android` `ios` `blackberry10`

Platform to generate the icons for.

##### background

Type: `string`<br>
Default: `white`

[Color](http://www.graphicsmagick.org/GraphicsMagick.html#details-fill) of the icon background if the icon is transparant.

##### contentRatio

Type: `number`<br>
Default: `1`

Logo-icon ratio. `1` means the logo will fill up the entire width (or height) of the icon, `0.5` means it will only fill up half of the icon.

##### roundedCorners

Type: `boolean`<br>
Default: `true` (only for `Android` and `PWA`)

Boolean indicating if the generated icons should have rounded corners. This is `true` by default for the `Android` and `PWA` platform, `false` otherwise.

##### borderRadius

Type: `number`<br>
Default: `0.0909`

The corner radius percentage of the generated icon. The default value is `9.09%`. See the [material design styleguide](https://material.io/design/platform-guidance/android-icons.html#keyline-shapes) for more information.

##### dest

Type: `string`<br>
Default: `process.cwd()`

Directory to save the generated icons.


## Platforms

The supported platforms are `PWA`, `Android`, `iOS` and `BlackBerry 10`. Every platform generates a different set of icons.

### PWA

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### Android

- `mipmap-ldpi/icon.png`
- `mipmap-mdpi/icon.png`
- `mipmap-hdpi/icon.png`
- `mipmap-xhdpi/icon.png`
- `mipmap-xxhdpi/icon.png`
- `mipmap-xxxhdpi/icon.png`

### iOS

- `icon.png`
- `icon@2x.png`
- `icon-small.png`
- `icon-small@2x.png`
- `icon-small@3x.png`
- `icon-20.png`
- `icon-40.png`
- `icon-40@2x.png`
- `icon-40@3x.png`
- `icon-50.png`
- `icon-50@2x.png`
- `icon-60.png`
- `icon-60@2x.png`
- `icon-60@3x.png`
- `icon-72.png`
- `icon-72@2x.png`
- `icon-76.png`
- `icon-76@2x.png`
- `icon-83.5@2x.png`

### BlackBerry 10

- `icon-90.png`
- `icon-96.png`
- `icon-110.png`
- `icon-144.png`


## Related

- [mobicon-cli](https://github.com/SamVerschueren/mobicon-cli) - The CLI for this module
- [mobisplash](https://github.com/SamVerschueren/mobisplash) - Mobile app splash screen generator


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)
