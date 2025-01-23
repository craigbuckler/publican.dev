---
title: Build your first static site with Publican
menu: Build static site
description: How to run Publican in production and development modes.
date: 2025-01-16
priority: 0.9
tags: development build, production build
---

Build your site to the project's `build/` directory with the command:

{{ terminal }}
```bash
node ./publican.config.js
```


## Production mode

By default, Publican builds a final production site for live deployment. It omits all pages where the front matter:

1. `date`{language=js} value set to a future time, or
1. `pubish`{language=js} value is set to `false`{language=js}, `draft`{language=js}, or a future time.


## Development mode

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

Refer to the [Configuration file](--ROOT--docs/setup/configuration/) for better ways of managing development and production builds.


## Local web server

Publican does **not** provide a development web server to test your built site. The following command installs a small Node.js file server package globally:

{{ terminal }}
```bash
npm i small-static-server -g
```

You can launch a server immediately after a successful build:

{{ terminal }}
```bash
node ./publican.config.js
smallserver 8000 ./build/
```

and test your site by opening `localhost:8000` in your browser.


### Other server options

Other server options include:

1. **Install a file server package**

   Node.js packages such as [small-static-server](https://www.npmjs.com/package/small-static-server) (shown above) and [Browsersync](https://browsersync.io/) can serve files from any directory.

1. **Install an editor server plugin**

   Plugins such as [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) can launch a development server.

1. **Install a dedicated development server**

   Software such as [Caddy](https://caddyserver.com/) can launch development sites with custom `localhost` domains and HTTPS certificates.

1. **Use your existing development server**

   You can add your project's `build` directory as a web root to a development server running on your device, such as [NGINX](https://nginx.org/) or [Apache](https://httpd.apache.org/).

1. **Add [esbuild](https://esbuild.github.io/) to your configuration**

   [This site](https://github.com/craigbuckler/publican.dev) uses Publican to create web pages and [esbuild to bundle CSS and JavaScript](--ROOT--docs/recipe/build/esbuild/). esbuild includes a local server that can live reload when CSS files are modified.
