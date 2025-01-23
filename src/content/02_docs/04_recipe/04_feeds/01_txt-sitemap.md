---
title: Create a text sitemap
menu: Text sitemap
description: How to create a txt file which outputs a list of all page links for search engines.
date: 2025-01-23
priority: 0.9
tags: content, sitemap
---

You can help search engines indexing your site by creating a sitemap. The simplest is a text file containing all page links:

{{ built `sitemap.txt` }}
```
https://mysite.com/
https://mysite.com/post/
https://mysite.com/post/one/
https://mysite.com/post/two/
https://mysite.com/post/three/
https://mysite.com/about/
```


## Define a domain

Sitemaps normally show fully qualified URLs including the domain. Publican does not require a domain, but you can add it as a global property in your `publican.config.js` [configuration file](--ROOT--docs/setup/configuration/).

The following code sets a local or real domain depending on whether the site is running locally in development or for production. Note you should not append a `/` slash to the domain since the [root path](--ROOT--docs/reference/publican-options/#root-server-path) is set by Publican.

{{ `publican.config.js` excerpt }}
```js
const isDev = (process.env.NODE_ENV === 'development');

// jsTACs globals
tacs.config = tacs.config || {};
tacs.config.domain = isDev ? 'http://localhost:8000' : 'https://mysite.com';
```


## Create `sitemap.txt`

A `src/content/sitemap.txt` file can now be defined. It does not require a template and outputs [all pages](--ROOT--docs/reference/global-properties/#tacsall) where the front matter [`index` value](--ROOT--docs/reference/content-properties/#dataindex) is not `false`:

{{ `sitemap.txt` }}
```js
---
index: false
---
${
  (toArray( tacs.all ))
    .map(p => p.index !== false ?
      `${ tacs.config.domain }${ p.link }\n` :
      ''
    )
}
```


## Create `robots.txt`

You can inform search engines that sitemaps are available by creating a `src/content/sitemap.txt` file with the following content. Note that both text and [XML sitemaps](--ROOT--docs/recipe/feeds/xml-sitemap/) are specified:


{{ robots.txt }}
```js
---
index: false
---
User-agent: *
Sitemap: ${ tacs.config.domain }${ tacs.root }sitemap.xml
Sitemap: ${ tacs.config.domain }${ tacs.root }sitemap.txt
```
