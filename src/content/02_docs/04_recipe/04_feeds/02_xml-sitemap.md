---
title: Create an XML sitemap
menu: XML sitemap
description: How to create an XML file which outputs a list of all page links for search engines.
date: 2025-01-23
modified: 2025-03-19
priority: 0.9
tags: content, sitemap, SEO
---

You can help search engines indexing your site by creating a sitemap. An XML sitemap provides more information than a [text sitemap](--ROOT--docs/recipe/feeds/txt-sitemap/):

* the date of the last update
* how often a search engine should check for updates
* the relative importance of the page from 1 (highest) to 0 (lowest)

{{ built `sitemap.xml` }}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mysite.com/</loc>
    <lastmod>Tue, 21 Jan 2025 11:58:53 GMT</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://mysite.com/post/</loc>
    <lastmod>Tue, 21 Jan 2025 11:58:53 GMT</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://mysite.com/post/one/</loc>
    <lastmod>Thu, 16 Jan 2025 12:32:00 GMT</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```


## Define a domain

Like text sitemaps, you must [define a domain as a global `tacs` property](--ROOT--docs/recipe/feeds/txt-sitemap/#define-a-domain) in your `publican.config.js` configuration file.


## Create a `dateISO()` function

Last modified dates must be output in `YYYY-MM-DD` format. The time can also be appended, although it is unlikely to be critical on most sites.

[Add the following functions to `lib/format.js`](--ROOT--docs/recipe/templates/function-library/) if not already defined:

* A private `cDate()`{language=js} function converts any value to a date.
* A public `dateISO()`{language=js} function to output a date in `YYYY-MM-DD` format.

{{ `lib/format.js` }}
```js
// create a date
function cDate(d) {
  d = new Date(d);
  return +d && !isNaN(d) && d instanceof Date ? d : new Date();
}

// ISO date format, e.g. "2025-01-01"
export function dateISO( d ) {
  return cDate(d).toISOString().slice(0, 10);
}
```

The [library has already been imported](--ROOT--docs/recipe/templates/function-library/#import-the-library) into the `publican.config.js` configuration file and appended to the `tacs.fn.format` object so no additional code is required.


## Create `sitemap.xml`

A `src/content/sitemap.xml` file can now be defined. It does not require a template and outputs [all pages](--ROOT--docs/reference/global-properties/#tacsall) where the front matter [`index` value](--ROOT--docs/reference/content-properties/#dataindex) is not `false`:

{{ `src/content/sitemap.xml` }}
```xml
---
index: false
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ ( toArray(tacs.all) ).filter(p => p.index !== false).map(p => `
<url>
  <loc>${ tacs.config.domain }${ p.link }</loc>
  <lastmod>${ tacs.fn.format.dateISO( p.modified || p.date ) }</lastmod>
  <changefreq>${ p.index || 'monthly' }</changefreq>
  <priority>${ p.priority }</priority>
</url>
`)
}
</urlset>
```

Note that `<lastmod>`{language=xml} allows you to set a custom `modified: YYYY-MM-DD` value in [front matter](--ROOT--docs/reference/front-matter/#custom-front-matter) if you want to specify a post's last update date instead of the original publication date.


## Create `robots.txt`

[Add your XML sitemap URL to a `robots.txt` file](--ROOT--docs/recipe/feeds/txt-sitemap/#create-robotstxt) so search engines can locate it.
