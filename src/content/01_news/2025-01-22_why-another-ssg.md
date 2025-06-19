---
title: Why create another static site generator?
menu: false
description: Why does Publican exist when there are so many great SSGs for all systems and languages?
author: Craig Buckler
tags: SSG
priority: 1.0
pinned: 1.0
modified: 2025-02-11
hero: images/code.avif
heroWidth: 1200
heroHeight: 600
heroAlt: code
heroCaption: Image courtesy of <a href="https://unsplash.com/@altumcode">AltumCode</a>
---

There are plenty of great [Static Site Generators (SSGs)](https://jamstack.org/generators/) for various languages. I've used several over the past decade including [Jekyll](https://jekyllrb.com/), [Metalsmith](http://www.metalsmith.io/), and [Eleventy](https://11ty.dev/). *Why build another?*

The main reason: *personal preference*. All SSGs have features that I need, features I don't need, and features that aren't supported. Sure, I can code around problems, but I'd rather not have to.

Publican is an opinionated SSG. It implements just enough of what I want with the flexibility to configure a site in native JavaScript. I hope you like it, but you may not agree with all my opinions! Publican's primary features include&hellip;


## HTML first rendering

SSGs build content. Content is HTML -- *ideally server-rendered*. Viewing the site should not be dependent on JavaScript. JavaScript can be used as a progressive enhancement, but *most* pages should continue to work without it.

Publican primarily renders HTML, but supports any text-based output such as TXT, XML, and SVG.


## An ECMAScript solution

For future-proofing and compatibility, Publican uses ES modules throughout rather than CommonJS.


## Product stability

How often have you returned to a Node.js project after a few months to find it won't install or build? Publican has very few dependencies -- primarily the [jsTACS templating system](--ROOT--docs/setup/jstacs/), a markdown converter, and an HTML minifier. There's less code to break. *In theory*.


## Virtual content and templates

Sites can be created with markdown, HTML, or other files but it's sometimes necessary to dynamically create content from a <abbr title="Content Management System">CMS</abbr>.


## A simpler templating system

Templating systems can be complicated:

* You need to learn and remember a specific syntax.
* Few templating systems are compatible with others.
* Implementing advanced functionality can be tricky.

Publican uses [jsTACS](--ROOT--docs/setup/jstacs/) which parses native JavaScript template literal `${ expressions }`{language=js}. Those expressions can include your own functions. *You're just using JavaScript*: there's nothing new to learn and it's faster than template systems with custom syntaxes.


## Partial template rendering

Publican can partially build templates for [Express.js](https://expressjs.com/) or similar server frameworks. You can render most of the page at build time but retain islands of runtime functionality.

* `${ expression }`{language=js} statically renders content once at build time.
* `!{ expression }`{language=js} identifies expressions to dynamically render at runtime -- they are converted to `${ expression }`{language=js} at the end of the build. These can be processed using [jsTACS as an Express.js rendering engine](--ROOT--docs/setup/jstacs/#runtime-expressions).


## Built-in menus, tags, and feeds

Publican provides objects so you can create menus, tags, and feeds based on the site's content structure.


## Built-in pagination

Few SSGs provide good pagination options, especially for tag lists. Publican handles pagination for you.


## Built-in syntax highlighting

Publican is primarily aimed at documentation and technical blogs so syntax highlighting is a must. You can ignore or disable it.


## Fast enough

Publican is written in JavaScript. It won't be as fast as Rust or Go SSGs, but it's fast enough to be practical.


## Why name it Publican?

I didn't think about it too long, but:

* it's a play on the words *publish* and *publication*
* it's short and memorable
* the `publican.dev` domain was available, and
* it reminds me of beer. Nice.


## Get started

The [Publican documentation](--ROOT--docs/) provides a [quick start guide](--ROOT--docs/quickstart/concepts/), a [detailed set-up guide](--ROOT--docs/setup/content/), [API references](--ROOT--docs/reference/publican-options/), and [common recipes](--ROOT--docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="--ROOT--docs/quickstart/concepts/" class="button">Get started</a></li>
  <li><a href="--ROOT--about/donate/" class="button">Donate</a></li>
</ul>
