---
title: The Publican configuration file
menu: Configuration file
description: How to create and launch a Publican configuration file using options for development and production.
date: 2025-01-23
priority: 0.9
tags: configure, production build, development build, npm, root path
---

To build a site, you must create a configuration file in the project root named `publican.config.js` (any name can be used). The simplest script creates a `Publican` object and executes its `.build()`{language=js} method to create a site in the `build/` directory by slotting all [content](--ROOT--docs/setup/content/) into [templates](--ROOT--docs/setup/templates/):

{{ `publican.config.js` }}
```js
// import Publican
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();

// build site
await publican.build();
```

Most projects will set additional configuration options before `.build()`{language=js} is called (it should normally be on the last line).


## Clean the build folder

It's often necessary to wipe the `build/` directory prior to building your site so old and unnecessary files are removed. Publican provides a cross-platform [`.clean()` method](--ROOT--docs/reference/publican-methods/#clean) that can be called before running `.build()`:

{{ `publican.config.js` excerpt }}
```js
// clear build directory
await publican.clean();

// build site
await publican.build();
```


## Build a site

The Publican script is executed from the project directory with:

```bash
node ./publican.config.js
```


### Production mode

By default, Publican builds a final production site for live deployment. It omits all pages where a front matter:

1. `date`{language=js} value set to a future time, or
1. `pubish`{language=js} value is set to `false`{language=js}, `draft`{language=js}, or a future time.


### Development mode

You will want to build and view draft pages during development. This can be achieved by setting the `NODE_ENV` environment variable to `development` before running Publican:

{{ Linux / Mac OS / Windows WSL terminal }}
```bash
NODE_ENV=development
node ./publican.config.js
```

{{ Windows `cmd` }}
```bash
set NODE_ENV=development
node ./publican.config.js
```

{{ Windows Powershell }}
```bash
$env:NODE_ENV="development"
node ./publican.config.js
```

You can examine `NODE_ENV` in your `publican.config.js` configuration to control options such as minification:

{{ `publican.config.js` }}
```js
// import Publican
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();
const isDev = (process.env.NODE_ENV === 'development');

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// minify in production mode only
publican.config.minify.enabled = !isDev;

// build site
await publican.build();
```


## Using `.env` files

It's impractical to keep setting `NODE_ENV` and there may be other values you want to configure. Optionally, you can create an `.env.dev` file in the project root which defines development build constants:

{{ `.env.dev` example }}
```bash
# build mode
NODE_ENV=development

# content files
CONTENT_DIR=./src/content/

# template files
TEMPLATE_DIR=./src/template/

# build directory
BUILD_DIR=./build/
BUILD_ROOT=/
```

The values can be imported into `publican.config.js`. This makes it possible to use the same configuration file across multiple projects with slightly different set-ups:

{{ `publican.config.js` excerpt }}
```js
const isDev = (process.env.NODE_ENV === 'development');

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// Publican defaults
publican.config.dir.content = process.env.CONTENT_DIR;
publican.config.dir.template = process.env.TEMPLATE_DIR;
publican.config.dir.build = process.env.BUILD_DIR;
publican.config.root = process.env.BUILD_ROOT;
```

Node.js version 20 and above has built-in support for `.env` files. Run a development build with:

```bash
node --env-file=.env.dev ./publican.config.js
```

An `.env.prod` file could override development settings for production builds. In most cases, it's just a matter of changing `NODE_ENV`:

{{ `.prod.dev` example }}
```bash
# build mode
NODE_ENV=production
```

Run a production build with:

```bash
node --env-file=.env.dev --env-file=.env.prod ./publican.config.js
```


## Using npm scripts

The `node` launch commands are a little long, so it's practical to add scripts to your project's `package.json` file:

{{ `package.json` example }}
```json
{
  "name": "My Site",
  "version": "1.0.0",
  "description": "A site built with Publican",
  "type": "module",
  "main": "publican.config.js",
  "scripts": {
    "build": "node --env-file=.env.dev --env-file=.env.prod ./publican.config.js",
    "start": "node --env-file=.env.dev ./publican.config.js"
  },
  "dependencies": {
    "publican": "1.0.0"
  }
}
```

You can then build a development site with:

```bash
npm start
```

and a production site with:

```bash
npm run build
```
