---
title: Create Publican content
menu: Create content
description: How to add content to your Publican site.
date: 2025-01-23
priority: 0.9
tags: content
---

Create a `src/content/` directory in your project:

{{ `terminal` }}
```bash
mkdir src
cd src
mkdir content
```

Create home page content in an `index.md` file using markdown code such as:

{{ `src/content/index.md` }}
```md
---
title: My first Publican site
---

Welcome to my new static site built using [Publican](https://publican.dev/)!

*Under construction!*
```
