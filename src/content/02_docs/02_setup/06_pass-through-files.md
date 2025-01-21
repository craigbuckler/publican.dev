---
title: Pass through files
menu: Pass through files
description: How to copy static files that do not require processing to the build directory.
date: 2025-01-17
priority: 0.9
tags: configure, pass through
---

It's sometimes necessary to copy files to the build directory that require no further processing by Publican, e.g. CSS, JavaScript, fonts, images, videos, etc. This can be implemented in your `publican.config.js` configuration file by adding an object to the `publican.config.passThrough` [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set) with `.from` and `.to` properties:

```js
publican.config.passThrough.add({ from: <src>, to: <dest> });
```

where:

* `<src>` is a source directory relative to the project root, and
* `<dest>` is a destination directory relative to the build directory

Publican recursively copies all files and sub-directories of the source to the destination.

{{ `publican.config.js` example }}
```js
// copy ./src/media/favicons/**/* to ./build/
publican.config.passThrough.add({ from: './src/media/favicons', to: './' });

// copy ./src/media/images/**/* to ./build/images/
publican.config.passThrough.add({ from: './src/media/images', to: './images/' });

// copy ./src/css/**/* to ./build/css/
publican.config.passThrough.add({ from: './src/css', to: './css/' });

// copy ./src/js/**/* to ./build/js/
publican.config.passThrough.add({ from: './src/js', to: './js/' });
```

{aside}
## Watch mode

Publican copies pass-though files on the first build and does not monitor them in [watch mode](--ROOT--docs/setup/watch-mode/). You must stop and restart Publican to copy new or updated files.
{/aside}
