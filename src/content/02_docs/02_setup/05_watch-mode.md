---
title: Automatically rebuild a site when files change
menu: Watch mode
description: How to configure Publican watch files and automatically rebuild when changes occur.
date: 2025-01-23
priority: 0.9
tags: configure, development build, watch mode
---

Setting `publican.config.watch`{language=js} to `true` (or any truthy value) keeps Publican running. It watches content and template files and automatically rebuilds the site when changes occur.

Watch mode would normally be used when building a development site (the `NODE_ENV` environment variable is set to `development`):

{{ `publican.config.js` excerpt }}
```js
// watch in development mode only
const isDev = (process.env.NODE_ENV === 'development');
publican.config.watch = isDev;
```

By default, Publican waits at least 300 milliseconds to ensure no further files are saved. This can be changed:

{{ `publican.config.js` excerpt }}
```js
// debounce watch for 1 second
publican.config.watchDebounce = 1000;
```

Shorter `watchDebounce` can negatively affect performance because multiple rebuilds are triggered when changing two or more files in a short period of time.

{aside}
## Monitored files

Publican only monitors content and template files. Changing the [configuration file](--ROOT--docs/setup/configuration/), imported modules, or [pass-through files](--ROOT--docs/setup/pass-through-files/) will not trigger a rebuild. In that situation, you must manually stop and restart Publican.
{/aside}


## Stop watch mode

To stop Publican, press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> in your terminal.
