# object-translate

![Node](https://img.shields.io/node/v/object-translate.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/object-translate.svg?style=flat-square)](https://www.npmjs.com/package/object-translate)
[![Travis](https://img.shields.io/travis/danielo515/object-translate/master.svg?style=flat-square)](https://travis-ci.org/danielo515/object-translate)
[![David](https://img.shields.io/david/danielo515/object-translate.svg?style=flat-square)](https://david-dm.org/danielo515/object-translate)
[![Coverage Status](https://img.shields.io/coveralls/danielo515/object-translate.svg?style=flat-square)](https://coveralls.io/github/danielo515/object-translate)
[![npm](https://img.shields.io/npm/dt/object-translate.svg?style=flat-square)](https://www.npmjs.com/package/object-translate)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)


> Easily turn objects into other objects.

Object-translate is a small utility to reshape objects intuitively.

You just have to describe the shape that you want to obtain with a simple (or complex mapping) object and create a converter.
A converter is a function that will take any object as input and will try to generate another object that matches your description.
The converter is created once and can be used it as many times as you want, pass it around as parammeter,
use it on functional programming and so on.


## Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add object-translate (--dev)

or npm

	npm install object-translate (--save-dev)


## Usage

### Instantiation

You could pass two configuration objects when instantiating a converter (➕ required, ➖ optional, ✏️ default) .

```js
import ObjectTranslate from 'object-translate';

const converter = ObjectTranslate( mappings, defaults );
```

➕  **mappings** ( Object )
<br/> 📝 Description: The map describing the transformation
<br/> 💡 Example: `{userName: 'user.name', surname: 'user.surname' }`

➖ **defaults** ( Object ) ` ✏️ {} `
<br/> 📝 Description: An object containing default values for the missing properties
<br/> ❗️ Warning: The default values should be on the same path as they would be on the object being transformed
<br/> ℹ️ Info: Defaults to an empty object
<br/> 💡 Example: `{user: { surname:'not provided'}}`

### Mappings

Mappings are objects describing the final shape you want to obtain from an object when the converter is applied to it.
The values on a map description can be of three types:

 - Annstring describing from where do you want to pick that property
 - An object with an array of alternative paths to look into
 - An object with a function which should process the extracted value.

#### #String path

This is the most basic mapping method. It is just a string in dot notation describing the path were you expect
the value to be located at.

```js
{ username: 'response.data.user.name' }
```

#### #Alternatives

When you are not sure of the path that you should use ( was it address or just addr? was it camelCase or snake-case? )
you can provide an array of alternative paths.
Alternatives should be inside an object with a property called alternatives.

```js
{ username: { alternatives: ['response.data.user.name','response.user.name', 'response.data.user.Name'] } }
```

#### #Function processor

If the value that you want to extract requires a special treatement (for example, convert it to lower case),
you can specify a function to process such value. This function is called a processor
The processor is executed with the original value as the first parammeter and the full object
being converted as the second argument.

```js
{ username: { path: 'response.data.user.name'}, processor: (name) => name.toLowerCase()}
```

### Examples

This is a very basic example

```js
const ObjectTranslate = require(`object-translate`);

/** This describes the sape you want to get as result */
const mappings = {
  username: `response.data.user.name`,
  information: {
    zipCode: {alternatives: [`response.data.user.addr.zip`, `response.data.user.address.zip`]}
  }
};

const converter = ObjectTranslate(mappings);

console.log( converter(serverResponse) );
```

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/danielo515/object-translate) example.

### Builds

If you don't use a package manager, you can [access `object-translate` via unpkg (CDN)](https://unpkg.com/object-translate/), download the source, or point your package manager to the url.

`object-translate` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `object-translate` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/object-translate/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/object-translate) on your page. The UMD builds make `object-translate` available as a `window.objectTranslate` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
