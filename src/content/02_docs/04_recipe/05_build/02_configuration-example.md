---
title: Example configuration
menu: Example configuration
description: An example configuration with .env configuration, development mode, production mode, and esbuild integration.
date: 2025-01-23
modified: 2025-06-10
priority: 0.9
tags: configure, esbuild
---

The following files provide an example configuration you can use as the basis for your own Publican static site builds.


## `package.json` scripts

Add the following scripts to your Node.js project's `package.json` file to run the build in development and production modes:

{{ `package.json` excerpt }}
```json
  "scripts": {
    "build": "node --no-warnings --env-file=.env.dev --env-file=.env.prod ./publican.config.js",
    "start": "node --no-warnings --env-file=.env.dev ./publican.config.js"
  },
```


## `.env.dev` defaults

The `.env.dev` file defines development mode defaults:

{{ `.env.dev` }}
```bash
# build mode
NODE_ENV=development

# development server port
SERVE_PORT=8222

# content files
CONTENT_DIR=./src/content/

# template files
TEMPLATE_DIR=./src/template/
TEMPLATE_DEFAULT=default.html
TEMPLATE_LIST=list.html
TEMPLATE_TAG=tag.html

# CSS entry
CSS_DIR="./src/css/main.css"

# JS entry
JS_DIR="./src/js/main.js"

# CSS and JS browser target
BROWSER_TARGET="chrome125,firefox125,safari17"

# build directory
BUILD_DIR=./build/
BUILD_ROOT=/

# site title
SITE_LANGUAGE="en-US"
SITE_DOMAIN="https://mysite.com"
SITE_VERSION="1.0.0"
SITE_TITLE="My Site"
SITE_DESCRIPTION="A description of my site"
SITE_AUTHOR="Author name"
```


## `.env.prod` defaults

The `.env.prod` file defines production mode defaults which override [`.env.dev` settings](#envdev-defaults):

{{ `.env.dev` }}
```bash
# Overrides .env.dev defaults

# build mode
NODE_ENV=production
```


## `publican.config.js`

The `publican.config.js` configuration file reads defaults from the `.env` files above to defines build option for [Publican](--ROOT--docs/reference/publican-options/), [template globals](--ROOT--docs/reference/template-globals/#defining-global-properties) and [esbuild](--ROOT--docs/recipe/build/esbuild/).

{{ `publican.config.js` }}
```js
// ___________________________________________________________
// Publican configuration
import { Publican, tacs } from 'publican';
import esbuild from 'esbuild';

const
  publican = new Publican(),
  isDev = (process.env.NODE_ENV === 'development');

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// Publican defaults
publican.config.dir.content = process.env.CONTENT_DIR;
publican.config.dir.template = process.env.TEMPLATE_DIR;
publican.config.dir.build = process.env.BUILD_DIR;
publican.config.root = process.env.BUILD_ROOT;

// default HTML templates
publican.config.defaultHTMLTemplate = process.env.TEMPLATE_DEFAULT;
publican.config.dirPages.template = process.env.TEMPLATE_LIST;
publican.config.tagPages.template = process.env.TEMPLATE_TAG;

// slug replacement strings - removes NN_ from slug
publican.config.slugReplace.set(/\d+_/g, '');

// default syntax language
publican.config.markdownOptions.prism.defaultLanguage = 'bash';

// sorting and pagination
publican.config.dirPages.size = 6;
publican.config.dirPages.sortBy = 'filename';
publican.config.dirPages.sortOrder = 1;

// sort news directory by date (newest first)
publican.config.dirPages.dir.news = {
  sortBy: 'date',
  sortOrder: -1
};
publican.config.tagPages.size = 12;

// pass-through files
publican.config.passThrough.add({ from: './src/media/favicons', to: './' });
publican.config.passThrough.add({ from: './src/media/images', to: './images/' });

// jsTACs rendering defaults
tacs.config = tacs.config || {};
tacs.config.isDev = isDev;
tacs.config.language = process.env.SITE_LANGUAGE;
tacs.config.domain = isDev ? `http://localhost:${ process.env.SERVE_PORT || '8000' }` : process.env.SITE_DOMAIN;
tacs.config.title = process.env.SITE_TITLE;
tacs.config.description = process.env.SITE_DESCRIPTION;
tacs.config.author = process.env.SITE_AUTHOR;
tacs.config.buildDate = new Date();

// replacement strings
publican.config.replace = new Map([
  [ '−−ROOT−−', publican.config.root ]
]);

// utils
publican.config.minify.enabled = !isDev;  // minify in production mode
publican.config.watch = isDev;            // watch in development mode
publican.config.logLevel = 2;             // output verbosity

// clear build directory
await publican.clean();

// build site
await publican.build();


// ___________________________________________________________
// esbuild configuration for CSS, JavaScript, and local server
const
  target = (process.env.BROWSER_TARGET || '').split(','),
  logLevel = isDev ? 'info' : 'error',
  minify = !isDev,
  sourcemap = isDev && 'linked';

// bundle CSS
const buildCSS = await esbuild.context({

  entryPoints: [ process.env.CSS_DIR ],
  bundle: true,
  target,
  external: ['/images/*'],
  loader: {
    '.woff2': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'dataurl'
  },
  logLevel,
  minify,
  sourcemap,
  outdir: `${ process.env.BUILD_DIR }css/`

});

// bundle JS
const buildJS = await esbuild.context({

  entryPoints: [ process.env.JS_DIR ],
  format: 'esm',
  bundle: true,
  target,
  external: [],
  define: {
    __ISDEV__: JSON.stringify(isDev)
  },
  drop: isDev ? [] : ['debugger', 'console'],
  logLevel,
  minify,
  sourcemap,
  outdir: `${ process.env.BUILD_DIR }js/`

});

if (publican.config.watch) {

  // watch for file changes
  await buildCSS.watch();
  await buildJS.watch();

  // development server
  await buildCSS.serve({
    servedir: process.env.BUILD_DIR,
    port: parseInt(process.env.SERVE_PORT) || 8000
  });

}
else {

  // single build
  await buildCSS.rebuild();
  buildCSS.dispose();

  await buildJS.rebuild();
  buildJS.dispose();

}
```


## Start a build

Build a development site with watch mode and hot reloading using:

{{ terminal }}
```
npm start
```

Build a production site with minified assets using:

{{ terminal }}
```
npm run build
```
