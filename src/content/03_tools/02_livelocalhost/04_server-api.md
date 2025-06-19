---
title: LiveLocalhost Node.js API
menu: Node.js API
description: LiveLocalhost can be installed, configured, and run from any Node.js application.
date: 2025-06-17
priority: 0.8
tags: LiveLocalhost, API
---

LiveLocalhost can be added to a Node.js application and configured using its API. The switches `-A` or `--helpapi` show API help from the CLI:

{{ terminal }}
```bash
npx livelocalhost --helpapi
```


## Install LiveLocalhost

Install LiveLocalhost in your project:

{{ terminal }}
```bash
npm install livelocalhost --save-dev
```

*(`--save-dev` ensures it's only available as a development dependency.)*


## Import the module

Import the LiveLocalhost module into any JavaScript file (such as `index.js`):

```js
import { livelocalhost } from 'livelocalhost';
```


## Set configuration options

The following `livelocalhost` configuration properties are supported:

|env variable|description|
|-|-|
| `.serveport=<port>` | HTTP port (default `8000`) |
| `.servedir=<dir>` | directory to serve (`./`) |
| `.reloadservice=<path>` | path to [reload service](--ROOT--tools/livelocalhost/server-cli/#hot-reloading) (`/livelocalhost.service`) |
| `.hotloadJS=<true\|false>` | enable JavaScript hot reloading (`false`) |
| `.watchDebounce=<num>` | [debounce time](--ROOT--tools/livelocalhost/server-cli/#watch-debouncing) for file changes (default `600`) |
| `.accessLog=<true\|false>` | show server access log (`false`) |


```js
// example configuration
livelocalhost.serveport     = 8080;       // HTTP port
livelocalhost.servedir      = './build/'; // directory to serve
livelocalhost.reloadservice = '/reload';  // path to reload service
livelocalhost.hotloadJS     = true;       // hot reload JS
livelocalhost.watchDebounce = 2000;       // debounce time
livelocalhost.accessLog     = true;       // show server logs
```

*(If not set, options fall back to environment variables then defaults.)*


## Start the server

Execute the `.start()` method to start the server:

```js
livelocalhost.start();
```

Launch your application as normal (`node index.js`) and open the web server URL in your browser.

Stop your application and the server with <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd>.
