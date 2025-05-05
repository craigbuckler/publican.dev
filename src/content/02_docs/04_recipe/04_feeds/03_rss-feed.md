---
title: Create an RSS feed
menu: RSS feed
description: How create an RSS feed of your latest posts.
date: 2025-01-23
modified: 2025-01-23
priority: 0.9
tags: content, RSS, SEO
---

A [Really Simple Syndication (RSS) feed](https://en.wikipedia.org/wiki/RSS) is a list of recent articles defined in an XML file. RSS readers or news aggregators allow users to subscribe to an RSS feed so they can be alerted when new content appears. Depending on the feed, they can either navigate to your site or read the post in the application.


## RSS feed example

This site provides an [RSS feed at feed.xml](--ROOT--feed.xml). It's formatted using XSL, but you can view the source to see the XML code.


## Define a domain

Like sitemaps, you must [define a domain as a global `tacs` property](--ROOT--docs/recipe/feeds/txt-sitemap/#define-a-domain) in your `publican.config.js` configuration file.


## Create a `dateUTC()` function

RSS dates must be output in UTC format such as <code>${{ tacs.fn.format.dateUTC() }}</code>

[Add the following functions to `lib/format.js`](--ROOT--docs/recipe/templates/function-library/) if not already defined:

* A private `cDate()`{language=js} function converts any value to a date.
* A public `dateUTC()`{language=js} function to output a date in UTC format.

{{ `lib/format.js` }}
```js
// create a date
function cDate(d) {
  d = new Date(d);
  return +d && !isNaN(d) && d instanceof Date ? d : new Date();
}

// UTC date format, e.g. "Wed, 1 Jan 2025 07:30:00 GMT"
export function dateUTC( d ) {
  return cDate(d).toUTCString();
}
```

The [library has already been imported](--ROOT--docs/recipe/templates/function-library/#import-the-library) into the `publican.config.js` configuration file and appended to the `tacs.fn.format` object so no additional code is required.


## Convert relative URLs

[Publican](https://www.npmjs.com/package/publican) and most other static site generators use relative URLs for links and assets such as images:

```html
<img src="/images/banner.jpg" alt="example">
<p><a href="/about/">About this site</a></p>
```

instead of absolute references that include the domain:

```html
<img src="https://mysite.com/images/banner.jpg" alt="example">
<p><a href="https://mysite.com/about/">About this site</a></p>
```

Relative URLs make the rendered site more portable. It should work anywhere irrespective of the domain, security certificates, server configuration, etc.

RSS specifications do not mention relative links. It's possible to set an `xml:base`{language=xml} attribute on the `<content>`{language=xml} element, but not all RSS readers will understand this:

```xml
<content type="html" xml:base="https://mysite.com">
  <p><a href="/post/one/">internal link</a></p>
</content>
```

In addition, the [W3C Feed Validation Service](https://validator.w3.org/feed/) reports that content *should not contain relative URL references*.

It's therefore necessary to locate and change relative to fully-qualified URLs in RSS content. Add the following `import` and `rss()` function [to the `lib/format.js` library](--ROOT--docs/recipe/templates/function-library/) if not already defined:


{{ `lib/format.js` }}
```js
import { tacs } from 'publican';

// RSS feed
export function rss( str, domain ) {

  domain = domain || tacs?.config?.domain || '';

  const
    absRegEx = new RegExp(`(\\s(action|cite|data|href|ping|poster|src|srcset)="{0,1})${ tacs.root }`, 'gi'),
    replace = `$1${ domain }${ tacs.root }`;

  return str.trim()
    .replaceAll(/\s*tabindex="*.*?"*>/gi, '>')              // remove tabindexes
    .replaceAll(/\s*<a.*?class="*headlink"*>#<\/a>/gi, '')  // remove headlinks
    .replaceAll(absRegEx, replace);                         // use absolute URLs

}
```

The [library has already been imported](--ROOT--docs/recipe/templates/function-library/#import-the-library) into the `publican.config.js` configuration file and appended to the `tacs.fn.format` object so no additional code is required.


## Create `feed.xml`

A `src/content/sitemap.xml` file can now be defined. It does not require a template and outputs the ten most recent [pages in the `news/` content directory](--ROOT--docs/reference/global-properties/#tacsdir) where the front matter [`index` value](--ROOT--docs/reference/content-properties/#dataindex) is not `false`:

{{ `src/content/feed.xml` }}
```xml
<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet href="${ tacs.root }feed.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
<channel>
<title>${ tacs.config.title }</title>
<link>${ tacs.config.domain }${ tacs.root }</link>
<atom:link href="${ tacs.config.domain }${ tacs.root }feed.xml" rel="self" type="application/rss+xml" />
<language>${ tacs.config.language }</language>
<description>${ tacs.config.description }</description>
<lastBuildDate>${ tacs.fn.format.dateUTC( tacs.config.buildDate ) }</lastBuildDate>
<sy:updatePeriod>daily</sy:updatePeriod>
<sy:updateFrequency>1</sy:updateFrequency>
${ tacs.dir.get('news')
    .filter(p => p.index !== false)
    .sort((a,b) => b.date-a.date)
    .slice(0,10).map(p => `
  <item>
    <title>${ p.title }</title>
    <link>${ tacs.config.domain }${ p.link }</link>
    <guid isPermaLink="true">${ tacs.config.domain }${ p.link }</guid>
    <pubDate>${ tacs.fn.format.dateUTC( p.date ) }</pubDate>
    <dc:creator>${ p.author || tacs.config.author }</dc:creator>
    <description>${ p.description }</description>
    <content:encoded><![CDATA[
    ${ tacs.fn.format.rss( p.contentRendered ) }
    ]]></content:encoded>
  </item>
`)
}
</channel>
</rss>
```

This creates a feed which is compatible with both RSS and Atom formats.

::: aside
### `.contentRendered`{language=js}

This property provides the fully-rendered page content. Templates using it -- such as feeds -- are rendered last to ensure the final content is available.
::: /aside


## Feed links

RSS readers or news aggregators can locate your RSS/Atom feed if you add the following `<link>`{language=html} tags to your HTML `<head>`{language=html}:

```html
<link rel="alternate" type="application/rss+xml" title="My site"
  href="${ tacs.config.domain }${ tacs.root }feed.xml">
<link rel="alternate" type="application/atom+xml" title="My Site"
  href="${ tacs.config.domain }${ tacs.root }feed.xml">
```
