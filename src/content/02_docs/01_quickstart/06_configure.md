---
title: Configure the Publican build process
menu: Configure Publican
description: How to configure Publican for your first static site build.
date: 2025-01-23
priority: 0.9
tags: configure
---

Create a basic Publican configuration script in the root of your project. This uses all default options and builds the site once (Publican will not continue to run or watch for file changes).

{{ `publican.config.js` }}
```js
// imports
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();

// build site
await publican.build();
```
