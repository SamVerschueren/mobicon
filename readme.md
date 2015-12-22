# mobicon [![Build Status](https://travis-ci.org/SamVerschueren/mobicon.svg?branch=master)](https://travis-ci.org/SamVerschueren/mobicon)

> Mobile icon generator


## Install

```
$ npm install --save mobicon
```

> Note: This library depends on [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/), so be sure to install one of those.


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


## Related

- [mobicon-cli](https://github.com/SamVerschueren/mobicon-cli) - The CLI for this module


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)
