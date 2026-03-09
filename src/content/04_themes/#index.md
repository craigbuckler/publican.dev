---
title: Publican themes
menu: Themes
description: A selection of pre-built Publican themes you can use and adapt for your own website.
priority: 0.8
---

The following pre-built Publican themes can be used and adapted for your own website.


## Basic theme

The basic theme is fast, standards based, uses best practise techniques, and is an ideal starting point for a personal blog. It features pages, blog posts, tag indexes, desktop/mobile responsive layout, light/dark switcher (shown below), RSS feed, sitemaps, security, and a 100% Lighthouse performance score.

<img src="--ROOT--images/publican-theme-basic.avif" alt="Publican basic theme" width="1060" height="950" />

The theme can quicky be configured by [editing an `.env` file](https://publican-theme-basic.pages.dev/blog/basic-configuration/) and changing colors using [CSS custom properties](https://publican-theme-basic.pages.dev/blog/updating-css/#corevariablescss).

* **Demonstration site**

  [https://publican-theme-basic.pages.dev/](https://publican-theme-basic.pages.dev/)

* **Github repository**

  [github.com/craigbuckler/publican.theme.basic](https://github.com/craigbuckler/publican.theme.basic)


## Documentation theme

This theme is an ideal starting point for web-based documentation. It features main menus, page menus, [StaticSearch](--ROOT--tools/staticsearch/), easy theming, a responsive layout, a light/dark switcher, sitemaps, security, and a 100% Lighthouse performance score.

<img src="--ROOT--images/publican-theme-doc.avif" alt="Publican documentation theme" width="1590" height="1425" />

* **Demonstration site**

  [https://publican-theme-doc.pages.dev/](https://publican-theme-doc.pages.dev/)

* **Github repository**

  [github.com/craigbuckler/publican.theme.doc](https://github.com/craigbuckler/publican.theme.doc)

A single hue value (`0` to `360`) set in the `.env.dev` file can provide complimentary light and dark mode color schemes:

{{ `.env.dev` }}
```bash
# default blue
SITE_THEMEHUE=270
```

If necessary, you can override this and specify your own CSS colors. The theme uses [esbuild](https://esbuild.github.io/) to bundle and minify client-side CSS and JavaScript files.


## Publican.dev website

The code for [the Publican.dev website](--ROOT--) is publicly available. It's not an ideal starter theme, but you may find code snippets you want to use and adapt.

* **Github repository**

  [github.com/craigbuckler/publican.dev](https://github.com/craigbuckler/publican.dev)
