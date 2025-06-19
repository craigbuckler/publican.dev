---
title: Does Publican make your site fast?
menu: false
description: How Publican.dev implements performance and security features you can use on your website.
author: Craig Buckler
tags: SSG, performance, HTML, PHP, SEO
priority: 1.0
pinned: 0.8
modified: 2025-02-11
hero: images/fast.avif
heroWidth: 1200
heroHeight: 600
heroAlt: performance
heroCaption: Image courtesy of <a href="https://unsplash.com/@marcsm">Marc Sendra Martorell</a>
---

Publican can build a site however you want. It primarily creates HTML pages (or [mostly static templates](--ROOT--docs/setup/jstacs#runtime-expressions)), but you can add PHP code, frameworks, CSS, JavaScript, and any other assets you require.

This site -- [Publican.dev](--ROOT--) -- is built using Publican. It implements web standards and best practice techniques to ensure the site remains fast, usable, and secure. The techniques can be adapted for your sites.


## Pre-built server rendered HTML

In previous years, there was a move toward Single Page Applications (SPAs). An HTML page -- *typically with no content* -- loaded JavaScript which took over responsibility for routing and content updates. This can have benefits for complex applications, but it often goes too far:

* A JavaScript or connectivity error can result in a blank screen.
* Developers must re-implement standard browser features that SPAs break -- such as URLs, the back button, refresh, etc. They rarely worked as expected.
* SPAs can be slower than server-rendered and streamed HTML content, especially on the first page visit.
* Search engines find it more difficult to index the content.

Few content sites need to be an SPA. Some complex apps can benefit from a simpler multi-page approach when users navigate to different sections.

I prefer a progressive enhancement approach to web development:

1. Use semantic HTML to build a base experience.
1. Add a layer of CSS to enhance that where possible.
1. Add a layer of JavaScript to make further enhancements when necessary.

A site works on modern devices but will continue to work **when** something fails in old -- *or future* -- browsers. And something will fail for someone, somewhere, at some point. **Progressive enhancement provides resilience.**


## HTML-first performance

Web performance is generally woeful. The average page:

* [downloads more than 2.5Mb of assets](https://httparchive.org/reports/page-weight?start=2024_12_01&end=latest&view=list#bytesTotal)
* [makes more than 70 requests](https://httparchive.org/reports/page-weight?start=2024_12_01&end=latest&view=list#reqTotal)
* [uses 600Kb of JavaScript](https://httparchive.org/reports/page-weight?start=2024_12_01&end=latest&view=list#bytesJs), and
* [takes up to 6 seconds to appear](https://httparchive.org/reports/loading-speed?start=2024_12_01&end=latest&view=list#speedIndex).

JavaScript is usually the main culprit for poor page performance. It may need to be downloaded, parsed, and executed before con tent appears. Developers often attempt to solve it by adding *more* JavaScript which compounds the problem.

It need not be that way. A typical page on Publican.dev:

* appears in one third of a second on an average connection
* downloads less than 50Kb of compressed assets (typically less than 150Kb when decompressed)
* requires less than 10KB of CSS and 2KB of JavaScript
* uses available OS fonts rather than downloading web fonts
* has very few images -- most are SVGs and highly compressed AVIF files.
* implements [speculation rules](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) to make the next page load even faster.

Chrome's Lighthouse tool and [PageSpeed Insights](https://pagespeed.web.dev/) give [Publican.dev a 100% score](https://pagespeed.web.dev/analysis/https-publican-dev/2tklfc6ggs) for performance, accessibility, best practices, and search engine optimization on most pages.

<video autoplay muted playsinline loop width="487" height="141" preload="auto">
  <source src="--ROOT--videos/lighthouse.webm" type="video/webm" />
</video>

Not all sites will have such low requirements. Publican won't magically create a fast site, but you have full control over the assets you add.


## User friendly

Publican.dev strives to be accessible:

* The theme defaults to your OS's preferred light/dark mode or you can select the option you prefer.
* URLs are readable. Every page and content section is linkable.
* Navigation is provided across menus, in sections, in pages, with back/next buttons, and related post links.
* Pages can be shared on social media, messaging apps, and notebooks using lightweight non-trackable links that continue to work without JavaScript.


## Device friendly

Publican.dev works on most mobile, tablet, and desktop devices. The experience, text size, and layout may change, but content remains readable.


## Printer friendly

It's unlikely you'll print pages from Publican.dev, but press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>P</kbd> and examine the preview or save a PDF. Content is optimized for printing and will use considerably less ink and fewer pages.

You can usually [make web pages printable](https://blog.craigbuckler.com/printer-friendly-web-pages-with-css) with a few hours development. *Few sites do?*


## Search engine friendly

Publican.dev provides [clean URLs](--ROOT--docs/setup/content#directory-structure), meta tags, [structured data](https://schema.org/), [tagged content](--ROOT--docs/setup/tag-indexes/), `robots.txt`, [sitemaps](--ROOT--docs/recipe/feeds/xml-sitemap/), [RSS feeds](--ROOT--docs/recipe/feeds/rss-feed/), and social media sharing. [Good performance](#htmlfirst-performance) also influences search engine rankings.

A Publican-built static site won't wondrously jump to #1 in Google, but there are no factors that could stop it happening.


## Environmentally friendly

The average web page [emits 0.8g of CO<sup>2</sup> **per view**](https://www.websitecarbon.com/). Many are considerably higher. Every year, that equates to an electric car driving 900 miles and requires five trees to absorb the carbon.

[Publican scores A+ on the Website Carbon Calculator](https://www.websitecarbon.com/website/publican-dev/). It's in the top 1% of sites, and emits 80x less than average with just 0.01g of CO<sup>2</sup> per page view. The whole site requires one tree to absorb the carbon. *My garden's enough!*


## Security aware

Publican.dev does not store session data or track users. It [scores A+ on Mozilla's HTTP Observatory tool](https://developer.mozilla.org/en-US/observatory/analyze?host=publican.dev) which analyzes web security compliance.

The site is difficult to hack:

1. It's static HTML. There's no server-side language, framework, <abbr title="Content Management System">CMS</abbr>, or database.
1. It's served by [Cloudflare Pages](https://pages.cloudflare.com/) which provides a fast, secure, and scalable network.

The main risk is someone gaining administrative access to my Github or Cloudflare accounts. Even then, the site could be re-built and served from elsewhere in minutes.


## Cost effective

Hosting costs are -- *or certainly should be* -- minimal for static sites. You just require a server that can host files with enough bandwidth to cope with traffic.

You can still use a <abbr title="Content Management System">CMS</abbr> and database, but that could be hosted on an intranet, your own PC, or even a Raspberry Pi without external access. The results of the build can be pushed anywhere.


## Summary

Web technologies have radically improved over the past decade. Sites need less code and fewer images than ever, but web page weight continued to increase. I don't believe the average website has become more sophisticated -- *we're just adding more unnecessary bloat*.

We're finally seeing a backlash against poor website performance. Static site generators such as Publican are key tools that could help.


## Get started

The [Publican documentation](--ROOT--docs/) provides a [quick start guide](--ROOT--docs/quickstart/concepts/), a [detailed set-up guide](--ROOT--docs/setup/content/), [API references](--ROOT--docs/reference/publican-options/), and [common recipes](--ROOT--docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="--ROOT--docs/quickstart/concepts/" class="button">Get started</a></li>
  <li><a href="--ROOT--about/donate/" class="button">Donate</a></li>
</ul>
