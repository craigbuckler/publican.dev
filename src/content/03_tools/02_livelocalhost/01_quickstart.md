---
title: LiveLocalhost quickstart
menu: Quickstart
description: How to use LiveLocalhost to start a local web development server.
date: 2025-06-17
modified: 2025-08-08
priority: 0.8
tags: LiveLocalhost
---

To use LiveLocalhost, you should have a directory of static site files containing HTML and assets such as CSS, JavaScript, images, video, etc. LiveLocalhost starts a local web server so you can navigate the site in a web browser.


## Start a web server

You can run LiveLocalhost without installation using `npx`. Assuming you're in the site's root directory, enter:

{{ terminal }}
```bash
npx livelocalhost
```

then open http://localhost:8000/ in your browser.

Press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> in the terminal to stop the server.


## Use a different port and directory

To use a different HTTP port and directory path:

```bash
npx livelocalhost --serveport 8888 --servedir ./path/
```


## LiveLocalhost help

For help, enter:

{{ terminal }}
```bash
npx livelocalhost --help
```


## Install LiveLocalhost globally

You can also install LiveLocalhost globally and use identical CLI options:

{{ terminal }}
```bash
npm install livelocalhost -g
```

then run it using:

{{ terminal }}
```bash
livelocalhost
```

or

{{ terminal }}
```bash
llh
```
