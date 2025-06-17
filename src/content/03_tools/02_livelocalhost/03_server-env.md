---
title: LiveLocalhost environment variables
menu: Environment variables
description: LiveLocalhost can be configured with environment variables.
date: 2025-06-17
priority: 1.0
tags: LiveLocalhost
---

The LiveLocalhost server can be configured with environment variables. The switches `-E` or `--helpenv` show variable help from the CLI:

{{ terminal }}
```bash
npx livelocalhost --helpenv
```

The following environment variables are supported:

| env variable | description |
|-|-|
| `SERVE_PORT=<port>` | HTTP port (default `8000`) |
| `BUILD_DIR=<dir>` | directory to serve (`./`) |
| `RELOAD_SERVICE=<path>` | path to [reload service](--ROOT--tools/livelocalhost/server-cli/#hot-reloading) (`/livelocalhost.service`) |
| `HOTLOAD_JS=<true\|false>` | enable JavaScript hot reloading (`false`) |
| `WATCH_DEBOUNCE=<num>` | [debounce time](--ROOT--tools/livelocalhost/server-cli/#watch-debouncing) for file changes (default `600`) |
| `ACCESS_LOG=<true\|false>` | show server access log (`false`) |

Note that CLI arguments take precedence over environment variables.


## Examples

You can define variables on Linux or Mac OS:

{{ terminal }}
```bash
export SERVE_PORT=8080
export BUILD_DIR=./build/
export ACCESS_LOG=true
```

the Windows Command Prompt:

{{ terminal }}
```bash
set SERVE_PORT=8080
set BUILD_DIR=./build/
set ACCESS_LOG=true
```

or Windows Powershell:

{{ terminal }}
```bash
$env:SERVE_PORT="8080"
$env:BUILD_DIR="./build/"
$env:ACCESS_LOG="true"
```

Then launch LiveLocalhost:

{{ terminal }}
```bash
npx livelocalhost
```

Stop the server with <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd>.


## Using .env files

It is generally more practical to define variables in a file, e.g.

```ini
# example .env file
SERVE_PORT=8080
BUILD_DIR=./build/
ACCESS_LOG=true
```

then load them using:

```bash
npx livelocalhost --env .env
```

Stop the server with <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd>.
