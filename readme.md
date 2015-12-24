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
```


## API

### mobicon(file, options)

#### file

Type: `string`

The source file of the icon.

#### options

##### platform

*Required*  
Type: `string`  
Values: `android` `ios` `blackberry10`

The platform to generate the icons for.

##### dest

Type: `string`  
Default: `process.cwd()`

The directory to save the generated icons.


## Platforms

The supported platforms are `Android`, `iOS` and `BlackBerry 10`. Every platform generates a different set of icons.

### Android

- `drawable/icon.png`
- `drawable-ldpi/icon.png`
- `drawable-mdpi/icon.png`
- `drawable-hdpi/icon.png`
- `drawable-xhdpi/icon.png`
- `drawable-xxhdpi/icon.png`
- `drawable-xxxhdpi/icon.png`

### iOS

- `icon.png`
- `icon@2x.png`
- `icon-small.png`
- `icon-small@2x.png`
- `icon-small@3x.png`
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

### BlackBerry 10

- `icon-90.png`
- `icon-96.png`
- `icon-110.png`
- `icon-144.png`


## Related

- [mobicon-cli](https://github.com/SamVerschueren/mobicon-cli) - The CLI for this module


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)
