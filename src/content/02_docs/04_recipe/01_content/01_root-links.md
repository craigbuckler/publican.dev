---
title: Root links
menu: Root links
description: How to manage your server root path in templates and markdown.
date: 2025-01-23
priority: 0.9
tags: root path, string replacement
---

By default, Publican assumes the build directory is the root path of your website. The page rendered to `build/index.html` is therefore the home page of the site.

{{ `publican.config.js` excerpt }}
```js
// root path
publican.config.root = '/';
```

However, you may want to build files to a sub-directory of your site, e.g. `/blog/`. Each post's [`data.link`](--ROOT--docs/reference/content-properties/#datalink) would then be incorrect.

The site's root path can be set by changing the `config.root` value:

{{ `publican.config.js` excerpt }}
```js
// root path
publican.config.root = '/blog/';
```

Links to the root page would then become `/blog/` rather than `/` in [next links](--ROOT--docs/reference/content-properties/#datapostnext), [back links](--ROOT--docs/reference/content-properties/#datapostback), [pagination](--ROOT--docs/reference/content-properties/#datapaginatation), [tag lists](--ROOT--docs/reference/global-properties/#tacstaglist), [navigation menus](--ROOT--docs/reference/global-properties/#tacsnav), etc.

If you want to link to a specific page in content or templates, you can use a [`${ tacs.root }` expression](--ROOT--docs/reference/global-properties/#tacsroot) to get the root path:

```html
<a href="${ tacs.root }post/article-one/">link to Article one</a>
```

Unfortunately, `${ tacs.root }`{language=js} **cannot** be used in markdown because it confuses the HTML converter:

```md
<!-- this will fail in markdown! -->
[link to Article one](${ tacs.root }post/article-one/)
```

To fix this problem, you could add a [string replacement option](--ROOT--docs/reference/publican-options/#string-replacement) to your [configuration file](--ROOT--docs/setup/configuration/) which replaces all references to `−−ROOT−−` with the server's root path:

{{ `publican.config.js` excerpt }}
```js
// root path
publican.config.root = '/blog/';

publican.config.replace.set(
  '−−ROOT−−',
  publican.config.root
);
```

This allows you to create links in markdown that use the root path, e.g.

```md
* [Home](−−ROOT−−)
* [About us](−−ROOT−−about/)
* [Contact us](−−ROOT−−about/contact/)
```
