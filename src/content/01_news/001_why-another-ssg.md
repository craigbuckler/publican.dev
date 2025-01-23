---
title: Why create another static site generator?
menu: false
pinned: 0.9
description: Why does Publican exist when there are so many great SSGs for all systems and languages?
author: Craig Buckler
tags: SSG
priority: 1.0
date: 2025-01-22
hero: images/code.avif
heroWidth: 1200
heroHeight: 600
heroAlt: code
heroCaption: Image courtesy of <a href="https://unsplash.com/@altumcode">AltumCode</a>
---

There are plenty of great [Static Site Generators (SSGs)](https://jamstack.org/generators/) for various language. I've used several over the past decade including [Jekyll](https://jekyllrb.com/), [Metalsmith](http://www.metalsmith.io/), and [Eleventy](https://11ty.dev/). *Why build another?*

The main reason: *personal preference*. All SSGs have features that I need, features I don't need, and features that aren't supported. Sure, I can code around problems, but I'd rather not have to.

Publican is an opinionated SSG. I hope you like it, but you may not agree with all my opinions! The primary features I wanted in Publican&hellip;


## HTML first rendering

SSGs build content. Content is HTML -- *ideally server-rendered*. Viewing the site should not be dependent on JavaScript. JavaScript can be used as a progressive enhancement, but *most* pages should continue to work without it.

Publican primarily renders HTML, but supports any text-based output such as XML and SVG.


## An ECMAScript solution

For future-proofing and compatibility, Publican uses ES modules throughout rather than CommonJS.


## Product stability

How often have you returned to a Node.js project after a few months to find it won't install or build? Publican has very few dependencies -- primarily the [jsTACS templating system](https://www.npmjs.com/package/jstacs), a markdown converter, and an HTML minifier. There's less code to break. *In theory*.


## Virtual content and templates

Sites can be created with markdown, HTML, or other files but it's sometimes necessary to dynamically create content from a CMS.


## A simpler templating system

Templating systems can be complicated:

* You need to learn and remember a specific syntax.
* Few templating systems are compatible with others.
* Implementing advanced functionality can be tricky.

Publican uses [jsTACS](https://www.npmjs.com/package/jstacs) which natively parses JavaScript `${ expressions }`{language=js}. Those expressions can include your own functions. *You're just using JavaScript*: there's nothing new to learn and it's faster than custom template compilers.


## Partial template rendering

Publican can partially build templates for [Express.js](https://expressjs.com/) or similar server frameworks. You can render most of the page at build time but retain islands of runtime functionality.

* `${ expression }`{language=js} statically renders content once at build time.
* `!{ expression }`{language=js} identifies expressions to dynamically render at runtime (which are converted to `${ expression }`{language=js} at the end of the build). These can be processed using [jsTACS](https://www.npmjs.com/package/jstacs) as an Express.js rendering engine.


## Built-in menus, tags, and feeds

Publican provides objects so you can create menus, tags, and feeds based on the site's content structure.


## Built-in pagination

Few SSGs provide good pagination options, especially for tag lists. Publican handles pagination for you.


## Built-in syntax highlighting

Publican is primarily aimed at documentation and technical blogs so syntax highlighting is a must. You can ignore or disable it.


## Fast enough

Publican is written in JavaScript. It won't be as fast as Rust or Go SSGs, but it's fast enough to be practical.
