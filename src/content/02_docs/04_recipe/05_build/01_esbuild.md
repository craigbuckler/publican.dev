---
title: Integrate esbuild into your Publican build process
menu: esbuild
description: How to use esbuild to bundle CSS and JavaScript files, launch a development server, and live reload when styles change.
date: 2025-01-21
priority: 0.9
tags: esbuild, development build, production build, watch mode
---

Publican primarily constructs HTML files and static assets. It can [copy CSS and JavaScript files](--ROOT--docs/setup/pass-through-files/), but a dedicated bundler offers more sophisticated options such as source maps, tree-shaking, and platform-targeting.

The following sections describe how to use [esbuild](https://esbuild.github.io/) to:

* bundle CSS
* bundle JavaScript, and
* run a development web server with live CSS reloading.

esbuild is optional and not necessary for Publican projects. You can use any build system or [local development server](--ROOT--docs/quickstart/build/#local-web-server).


## Bundled files

The following files will be bundled:

* CSS files contained in `src/css/`. `main.css` is the entry file which loads others. The bundled file is built to `build/css/main.css`.

* JavaScript files contained in `src/js/`. `main.js` is the entry file which loads others. The bundled file is built to `build/js/main.js`.

During a development build, files are not minified, retain `console` and `debugger` statements, and provide linked source maps. esbuild can watch for changes and automatically rebundle.


## esbuild options

esbuild is configured using JavaScript so you can add instructions to your Publican [`publican.config.js` configuration file](--ROOT--docs/setup/configuration/). You can use environment variables or [`.env` files](--ROOT--docs/setup/configuration/#using-env-files) to define:

* `BUILD_DIR` - the build directory, as used by Publican (`./build/`)
* `CSS_DIR` - the CSS entry file (`./src/css/main.css`)
* `JS_DIR` - the JavaScript entry file (`./src/js/main.js`)
* `BROWSER_TARGET` - a list of minimum browser targets (`chrome125,firefox125,safari17`)

These are imported into `publican.config.js` -- possibly after your call to `await publican.build()`:

{{ `publican.config.js` excerpt }}
```js
// may already be defined
const isDev = (process.env.NODE_ENV === 'development');

// esbuild constants
const
  target = (process.env.BROWSER_TARGET || '').split(','),
  logLevel = isDev ? 'info' : 'error',
  minify = !isDev,
  sourcemap = isDev && 'linked';
```


## CSS context

The esbuild CSS build context is defined as follows:

{{ `publican.config.js` excerpt }}
```js
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
```

Note:

* The `external` array is a list of locations excluded from the build. For example, if your CSS contained a reference to an image in the `build/images/` directory:

   ```css
   .bg { background-image: url(/images/pic.png); }
   ```

   esbuild will not attempt to locate, copy, or base64-encode that file.

* The `loader` object defines how imports are handled. CSS references to font `.woff2` and image `.png` and `.jpg` files (not in `/images/`) are copied to the `build/css/` directory. `.svg` images are encoded directly into the CSS file as data URIs.


## JavaScript context

The esbuild JavaScript build context is defined as follows:

{{ `publican.config.js` excerpt }}
```js
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
```

The `define` string `__ISDEV__` is replaced with `true` or `false` in the bundle. This makes it possible to add JavaScript which is only present in development mode:

```js
if (__ISDEV__) {
  console.log('Site is running in development mode');
}
```

This is used for [live reloading](#live-reloading).


## Watch mode

esbuild launches a development server, watches for file changes, and re-bundles when Publican's [watch mode](--ROOT--docs/reference/publican-options/#watch-mode) is enabled:

{{ `publican.config.js` excerpt }}
```js
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
```


### Live reloading

esbuild can live reload changed styles but you must add this functionality yourself to your `main.js` entry script:

{{ `src/js/main.js` excerpt }}
```js
// development live CSS reload
import './dev/css-reload.js';
```

The `src/js/dev/css-reload.js` file listens for server-sent events from esbuild then re-imports changed CSS files. Note that `if (__ISDEV__) { ... }`{language=js} removes the whole block from the JavaScript when bundling in production mode.

{{ `src/js/dev/css-reload.js` }}
```js
// live reload CSS in development mode
if (__ISDEV__) {

  // esbuild server-sent event
  new EventSource('/esbuild').addEventListener('change', e => {

    const { added, removed, updated } = JSON.parse(e.data);

    // reload when CSS files are added or removed
    if (added.length || removed.length) {
      location.reload();
      return;
    }

    // replace updated CSS files
    Array.from(document.getElementsByTagName('link')).forEach(link => {

      const url = new URL(link.href), path = url.pathname;

      if (updated.includes(path) && url.host === location.host) {

        const css = link.cloneNode();
        css.onload = () => link.remove();
        css.href = `${ path }?${ +new Date() }`;
        link.after(css);

      }

    });

  });

}
```


## Static build

esbuild bundles CSS and JavaScript once when watch mode is not enabled:

{{ `publican.config.js` excerpt }}
```js
else {

  // single build
  await buildCSS.rebuild();
  buildCSS.dispose();

  await buildJS.rebuild();
  buildJS.dispose();

}
```
