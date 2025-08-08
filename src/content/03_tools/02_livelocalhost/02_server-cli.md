---
title: LiveLocalhost CLI usage
menu: CLI usage
description: The configuration options available to LiveLocalhost when used in a terminal.
date: 2025-06-17
modified: 2025-08-08
priority: 0.8
tags: LiveLocalhost
---

The switches `-?` or `--help` show CLI help:

{{ terminal }}
```bash
npx livelocalhost --help
```

It supports the following CLI switches:

| CLI | description |
|-|-|
| `-v`, `--version` | show application version |
| `-?`, `--help` | show CLI help |
| `-E`, `--helpenv` | show .env/environment variable help |
| `-A`, `--helpapi` | show Node.js API help |
| `-e`, `--env <file>` | load defaults from an .env file |
| `-p`, `--serveport <port>` | HTTP port (default `8000`) |
| `-d`, `--servedir <dir>` | directory to serve (`./`) |
| `-r`, `--reloadservice <path>` | path to [reload service](#hot-reloading) (`/livelocalhost.service`) |
| `-j`, `--hotloadJS` | enable JavaScript hot reloading (`false`) |
| `-w`, `--watchDebounce <ms>` | [debounce time](#watch-debouncing) for file changes (default `600`) |
| `-l`, `--accessLog` | show a server access log (`false`) |


## Examples

Serve files from `./build/` at `http://localhost:8080` and show the access log:

{{ terminal }}
```bash
npx livelocalhost --serveport 8080 --servedir ./build/ --accessLog
```

The first two non-dashed parameters are presumed to be the port and directory. A simpler version of the same command:

{{ terminal }}
```bash
npx livelocalhost 8080 ./build/ -l
```

Stop the server with <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd>.


## Hot reloading

Browser hot reloading is available when:

  1. the application has permission to watch OS files, and
  2. `--reloadservice` is a valid URL path starting `/`.

The default Server Sent Events service path for hot reloading is `/livelocalhost.service`. A client-side script at `/livelocalhost.service.js` is injected into all HTML files which automatically refreshes the browser:

* CSS changes are hot reloaded without a full page refresh
* HTML changes trigger a full page refresh
* JavaScript changes trigger a full page refresh when `--hotloadJS` is enabled (off by default).

You need only change `--reloadservice` when the default path is in use or you want to disable hot reloading (set any value that does not start with `/`).


## Watch debouncing

When a file changes, LiveLocalhost waits 600ms. A hot reload is then triggered if no other files change within that time.

You can change the delay time using `--watchDebounce`. Note that very low settings can make reloading slower.
