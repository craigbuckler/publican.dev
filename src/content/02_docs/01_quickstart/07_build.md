---
title: Build your first static site with Publican
menu: Build static site
description: How to run Publican in production and development modes.
date: 2025-01-23
modified: 2025-06-12
priority: 0.9
tags: development build, production build, LiveLocalhost, esbuild
---

Build your site to the project's `build/` directory with the command:

{{ terminal }}
```bash
node ./publican.config.js
```


## Production mode

By default, Publican builds a final production site for live deployment. It omits all pages where the front matter has:

1. a `date`{language=js} set in the future, or
1. a `pubish`{language=js} value set to `false`{language=js}, `draft`{language=js}, or a future time.


## Development mode

You will want to build and view draft pages during development. This can be achieved by setting the `NODE_ENV` environment variable to `development` before running Publican:

{{ Linux / Mac OS / Windows WSL terminal }}
```bash
export NODE_ENV=development
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

Publican does **not** provide a development web server to test your built site. You can launch a server such as [LiveLocalhost](https://www.npmjs.com/package/livelocalhost) immediately after a successful build:

{{ terminal }}
```bash
node ./publican.config.js
npx livelocalhost -d ./build/
```

and test your site by opening `localhost:8000` in your browser.


### Other server options

Other server options include:

1. **Use a file server module**

   Node.js packages such as [LiveLocalhost](https://www.npmjs.com/package/livelocalhost) (shown above) and [Browsersync](https://browsersync.io/) can serve files from any directory.

   [This site](https://github.com/craigbuckler/publican.dev) uses LiveLocalhost as part of its configuration.

1. **Install an editor server plugin**

   Plugins such as [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) can launch a development server.

1. **Install a dedicated development server**

   Software such as [Caddy](https://caddyserver.com/) can launch development sites with custom `localhost` domains and HTTPS certificates.

1. **Use your existing development server**

   You can add your project's `build` directory as a web root to a development server running on your device, such as [NGINX](https://nginx.org/) or [Apache](https://httpd.apache.org/).

1. **Add [esbuild](https://esbuild.github.io/) to your configuration**

   [esbuild bundles CSS and JavaScript](--ROOT--docs/recipe/build/esbuild/) but also includes a local server that can hot reload CSS files.
